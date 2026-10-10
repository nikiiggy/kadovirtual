const screens = [...document.querySelectorAll(".screen")];
let current = 0;
const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const disc = document.getElementById("disc");

// Fungsi Navigasi Halaman
function show(i) {
  current = Math.max(0, Math.min(i, screens.length - 1));
  screens.forEach((s, n) => s.classList.toggle("active", n === current));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function next() {
  show(current + 1);
}

// Event Listener Tombol Navigasi Umum (.next)
document.querySelectorAll(".next").forEach((b) => b.addEventListener("click", next));

// Halaman 1: Tombol Buka Kado + Putar Musik
document.getElementById("startBtn").addEventListener("click", () => {
  if (audio) {
    audio.play().then(() => {
      if (playBtn) playBtn.textContent = "❚❚";
      if (disc) disc.classList.add("playing");
    }).catch((err) => {
      console.log("Autoplay ditolak browser:", err);
    });
  }
  burst();
  show(1);
});

// Control Player Musik Manual
if (playBtn && audio) {
  playBtn.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
      playBtn.textContent = "❚❚";
      if (disc) disc.classList.add("playing");
    } else {
      audio.pause();
      playBtn.textContent = "▶";
      if (disc) disc.classList.remove("playing");
    }
  });
}

// Halaman 4: Animasi Tombol Alasan
document.querySelectorAll(".reason").forEach((b) => b.addEventListener("click", () => {
  b.animate(
    [{ transform: "scale(1)" }, { transform: "scale(.97)" }, { transform: "scale(1)" }],
    { duration: 220 }
  );
}));

// Halaman 5: Mini Game
document.querySelectorAll(".answer").forEach((b) => b.addEventListener("click", () => {
  const result = document.getElementById("gameResult");
  if (result) result.textContent = "Salah semua. Jawabannya: nggak bisa dihitung. ❤️";
  burst();
}));

// Halaman 6: Tiup Lilin -> Otomatis Pindah ke Halaman 7 (Indeks 6)
document.getElementById("wishBtn").addEventListener("click", () => {
  const flame = document.getElementById("flame");
  const wishText = document.getElementById("wishText");

  if (flame) flame.textContent = "✨";
  if (wishText) wishText.textContent = "Semoga semua doa baikmu menemukan jalannya. ❤️";

  burst(55);

  // Otomatis pindah ke Halaman 7 setelah 1.2 detik
  setTimeout(() => {
    show(6);
  }, 1200);
});

// Halaman 7: Buka Surat + Tampilkan Tombol Lanjut ke Halaman 8
const envelope = document.getElementById("envelope");
const openLetterBtn = document.getElementById("openLetter");
const letterNextBtn = document.getElementById("letterNextBtn");

if (openLetterBtn && envelope) {
  openLetterBtn.addEventListener("click", () => {
    envelope.classList.toggle("open");
    const isOpen = envelope.classList.contains("open");

    openLetterBtn.textContent = isOpen ? "Tutup Surat 💌" : "Buka Surat 💌";

    if (letterNextBtn) {
      if (isOpen) {
        letterNextBtn.style.display = "inline-block";
        burst(30);
      } else {
        letterNextBtn.style.display = "none";
      }
    }
  });
}

// Halaman 8: Rahasia Rahasia / Heart Click
let secretCount = 0;
const secretHeart = document.getElementById("secretHeart");

if (secretHeart) {
  secretHeart.addEventListener("click", () => {
    secretCount++;
    const text = document.getElementById("secretText");
    if (secretCount < 5) {
      if (text) text.textContent = `Hmm... ${secretCount}/5 👀`;
    } else {
      if (text) text.textContent = "SECRET UNLOCKED: Kamu adalah salah satu alasan aku banyak tersenyum. ❤️";
      burst(80);
    }
  });
}

// Halaman 8 ke 9 & Reset
const finalBtn = document.getElementById("finalBtn");
if (finalBtn) {
  finalBtn.addEventListener("click", () => {
    show(screens.length - 1);
    burst(100);
  });
}

const restartBtn = document.getElementById("restartBtn");
if (restartBtn) {
  restartBtn.addEventListener("click", () => show(0));
}

// Efek Confetti
function burst(count = 30) {
  const layer = document.getElementById("confetti");
  if (!layer) return;

  for (let i = 0; i < count; i++) {
    const el = document.createElement("i");
    el.className = "conf";
    el.style.left = Math.random() * 100 + "vw";
    el.style.top = -10 - Math.random() * 20 + "vh";
    el.style.transform = `rotate(${Math.random() * 180}deg)`;
    el.style.animationDelay = Math.random() * 0.5 + "s";
    el.style.background = `hsl(${Math.random() * 360} 80% 70%)`;
    layer.appendChild(el);
    setTimeout(() => el.remove(), 3200);
  }
}

// Efek Floating Hearts
setInterval(() => {
  const heartsLayer = document.getElementById("hearts");
  if (!document.hidden && heartsLayer) {
    const h = document.createElement("span");
    h.className = "floating-heart";
    h.textContent = Math.random() > 0.5 ? "♥" : "♡";
    h.style.left = Math.random() * 100 + "vw";
    h.style.bottom = "-20px";
    h.style.fontSize = 10 + Math.random() * 18 + "px";
    heartsLayer.appendChild(h);
    setTimeout(() => h.remove(), 4200);
  }
}, 900);

// Modal Gallery Lightbox Logic
const modal = document.getElementById("imageModal");
const modalImgContainer = document.getElementById("modalImageContainer");
const modalCaption = document.getElementById("modalCaption");
const modalClose = document.querySelector(".modal-close");

document.querySelectorAll(".photo-card").forEach((card) => {
  card.addEventListener("click", () => {
    const imgSrc = card.getAttribute("data-src");
    const captionText = card.getAttribute("data-caption") || card.querySelector("figcaption")?.textContent;

    // Jika ada gambar (src), tampilkan img. Jika belum, tampilkan placeholder.
    if (imgSrc) {
      modalImgContainer.innerHTML = `<img src="${imgSrc}" alt="Gallery Image">`;
    } else {
      const placeholderContent = card.querySelector(".photo-placeholder")?.outerHTML || "FOTO";
      modalImgContainer.innerHTML = `<div style="width:100%; height:250px; display:grid; place-items:center;">${placeholderContent}</div>`;
    }

    modalCaption.textContent = captionText;
    modal.classList.add("show");
  });
});

// Tutup Modal saat tombol X atau area luar modal diklik
if (modalClose) {
  modalClose.addEventListener("click", () => modal.classList.remove("show"));
}

if (modal) {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("show");
  });
}
// === MUSIC + BUTTON ===
document.addEventListener("DOMContentLoaded", () => {
  const foto = document.getElementById('fotomuter');
  const tombol = document.getElementById('playPauseBtn');
  const musik = document.getElementById('music');
  const icon = document.getElementById('icon');
  const playlist = [
    "music/lagu1.mp3",
    "music/lagu2.mp3",
    "music/lagu3.mp3",
    "music/lagu4.mp3"
  ];
  let current = 0;
  musik.src = playlist[current];

  // Sinkron animasi foto dengan status audio
  function updateFotoAnimation() {
    if (musik.paused) {
      foto.style.animationPlayState = 'paused';
      icon.src = "images/play.png";
      icon.alt = "Play";
    } else {
      foto.style.animationPlayState = 'running';
      icon.src = "images/pause.png";
      icon.alt = "Pause";
    }
  }

  function toggleAudio(e) {
    e.preventDefault();
    if (musik.paused) {
      musik.play().catch(()=>{}); // play langsung
    } else {
      musik.pause();
    }
    updateFotoAnimation();
  }

  tombol.addEventListener('click', toggleAudio);
  tombol.addEventListener('touchend', toggleAudio);

  // Auto lanjut lagu berikut
  musik.addEventListener('ended', () => {
    current = (current + 1) % playlist.length;
    musik.src = playlist[current];
    musik.play().catch(()=>{});
    updateFotoAnimation();
  });
});

// === PROGRESS BAR + FIREWORK ===
window.addEventListener("load", () => {
  document.querySelectorAll('.progress-bar').forEach(bar => {
    const percent = bar.getAttribute('data-percent');
    setTimeout(() => {
      bar.style.width = percent + "%";
      setTimeout(() => {
        createFirework(bar);
      }, 2000);
    }, 500);
  });

  function createFirework(container) {
    const colors = ['#fff', '#fff', '#fff', '#fff', '#fff'];
    for (let i = 0; i < 10; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      particle.style.background = colors[Math.floor(Math.random() * colors.length)];

      const x = (Math.random() - 0.5) * 60 + 'px';
      const y = (Math.random() - 0.5) * 60 + 'px';
      particle.style.setProperty('--x', x);
      particle.style.setProperty('--y', y);
      particle.style.left = '100%';
      particle.style.top = '50%';
      particle.style.transform = 'translate(-50%, -50%)';

      container.appendChild(particle);

      setTimeout(() => {
        particle.remove();
      }, 800);
    }
  }
});

// === JAM & TANGGAL ===
function updateDateTime() {
  const now = new Date();
  const options = {
    weekday: 'long', year: 'numeric', month: 'long',
    day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'
  };
  const datetimeEl = document.getElementById('datetime');
  if (datetimeEl) {
    datetimeEl.textContent = now.toLocaleString('id-ID', options);
  }
}
setInterval(updateDateTime, 1000);
updateDateTime();

// === DROPDOWN MENU ===
document.addEventListener("DOMContentLoaded", () => {
  let isOpen = false;
  const menu = document.getElementById("dropdownMenu");
  const bg = document.getElementById("dropdownBg");
  const toggleBtn = document.getElementById("toggleBtn");
  const iconOpen = document.getElementById("iconOpen");
  const iconClose = document.getElementById("iconClose");
  const labelClick = document.getElementById("labelTrigger");

  function toggleMenu() {
    if (isOpen) {
      menu.classList.remove("show");
      menu.classList.add("hide");
      bg.classList.remove("active");
      iconOpen.classList.remove("hide");
      iconClose.classList.add("hide");
    } else {
      menu.classList.remove("hide");
      menu.classList.add("show");
      bg.classList.add("active");
      iconOpen.classList.add("hide");
      iconClose.classList.remove("hide");
    }
    isOpen = !isOpen;
  }

  toggleBtn.addEventListener("click", toggleMenu);
  labelClick.addEventListener("click", toggleMenu); // penting iki

  document.addEventListener("click", function (event) {
    const isClickInsideMenu = menu.contains(event.target);
    const isClickOnButton = toggleBtn.contains(event.target);
    const isClickOnLabel = labelClick.contains(event.target);
    if (isOpen && !isClickInsideMenu && !isClickOnButton && !isClickOnLabel) {
      toggleMenu();
    }
  });
});

// === TAHUN COPYRIGHT ===
document.addEventListener("DOMContentLoaded", () => {
  const tahun = new Date().getFullYear();
  document.getElementById("tahun").textContent = tahun;
});

// === DROPDOWN MENU TOMBOL ANIMASI===
document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("labelTrigger");

  button.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    ripple.classList.add("ripple");
    const rect = this.getBoundingClientRect();
    ripple.style.left = `${e.clientX - rect.left}px`;
    ripple.style.top = `${e.clientY - rect.top}px`;
    this.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600); // hapus setelah animasi
  });
});

// === MOUSE MOVE===
document.addEventListener("DOMContentLoaded", () => {
  const cursor = document.createElement("div");
  cursor.classList.add("custom-cursor");
  document.body.appendChild(cursor);

  // Awal disembunyikan
  cursor.style.opacity = "0";

  // Gerakan pointer
  document.addEventListener("pointermove", (e) => {
    if (e.pointerType === "mouse") { // cuma jalan kalau mouse
      cursor.style.top = `${e.clientY}px`;
      cursor.style.left = `${e.clientX}px`;
      cursor.style.opacity = "1";
    } else {
      cursor.style.opacity = "0"; // kalau touch, sembunyikan
    }
  });

  document.addEventListener("mouseleave", () => {
    cursor.style.opacity = "0";
  });

  document.addEventListener("mouseenter", (e) => {
    if (e.pointerType === "mouse") {
      cursor.style.opacity = "1";
    }
  });
});

// === VIEW PAGER===
document.addEventListener("DOMContentLoaded", () => {
  const pager = document.getElementById('pager');
  const buttons = document.querySelectorAll('.tab-bar button');

  function goToPage(index) {
    pager.scrollTo({
      left: index * pager.offsetWidth,
      behavior: 'smooth'
    });
  }

  buttons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      goToPage(index);
    });
  });

  pager.addEventListener('scroll', () => {
    const index = Math.round(pager.scrollLeft / pager.offsetWidth);
    buttons.forEach((btn, i) => {
      btn.classList.toggle('active', i === index);
    });
  });
});

// ===ANIMASI TULISAN TOMBOL VIEW PAGER===
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".tab-bar button");

  buttons.forEach((btn) => {
    const text = btn.textContent;
    btn.textContent = ""; // kosongin dulu
    [...text].forEach((ch, i) => {
      const span = document.createElement("span");
      span.textContent = ch;
      span.style.setProperty("--i", i); // index buat delay
      btn.appendChild(span);
    });
  });
});

// === SPLASH SCREEN===
  window.addEventListener("load", () => {
    const introLogo = document.getElementById("introLogo");
    const fotomuter = document.getElementById("fotomuter");
    const intro = document.getElementById("intro");

    // Tampil logo besar di tengah
    introLogo.style.width = "250px";
    introLogo.style.height = "250px";
    introLogo.style.left = "50%";
    introLogo.style.top = "50%";
    introLogo.style.transform = "translate(-50%, -50%)";

    // Ambil posisi logo di header
    const targetRect = fotomuter.getBoundingClientRect();

    // Langsung munculkan konten web
    document.body.classList.add("loaded");

    // Jalankan animasi: pindah ke header + mengecil
    setTimeout(() => {
      introLogo.style.width = "50px";
      introLogo.style.height = "50px";
      introLogo.style.left = `${targetRect.left}px`;
      introLogo.style.top = `${targetRect.top}px`;
      introLogo.style.transform = "translate(0, 0)";
    }, 400);

    // Setelah animasi pindah selesai (1.5s), sembunyikan intro-wrapper
    setTimeout(() => {
      intro.classList.add("hide");
    }, 1500);
  });

// ================== UMUR COUNTER ==================
    let timer;
    let lastValues = [0, 0, 0, 0, 0, 0];
    let birthDate = null; // global tanggal lahir

    function generate() {
      const d = +document.getElementById('day').value;
      const m = +document.getElementById('month').value - 1;
      const y = +document.getElementById('year').value;
      const h = +document.getElementById('hour').value || 0;
      const min = +document.getElementById('minute').value || 0;
      const inputDate = new Date(y, m, d, h, min);

      if (!d || document.getElementById('month').value === "" || !y || isNaN(inputDate.getTime())) {
        alert("WAJIB ISI KOLOM YANG BERTANDA (*) DENGAN BENAR, KECUALI WAKTU (OPSIONAL).");
        return;
      }

      birthDate = inputDate; // simpan buat progresbar

      const btn = document.getElementById("animateBtn");
      if (!btn.dataset.original) {
        btn.dataset.original = btn.innerHTML;
      }
      // animasi tulisan tombol
      const teksGanti = "Menghitung...";
      let gantiHTML = "";
      for (let i = 0; i < teksGanti.length; i++) {
        const char = teksGanti[i] === " " ? "spc" : "";
        gantiHTML += `<span class="${char}">${teksGanti[i]}</span>`;
      }
      btn.innerHTML = gantiHTML;
      const spans = btn.querySelectorAll("span");
      spans.forEach((span, i) => {
        if (!span.classList.contains("spc")) {
          span.style.animation = `zoomText 5s ease-in-out infinite`;
          span.style.animationDelay = `${i * 0.1}s`;
          span.style.display = "inline-block";
          span.style.opacity = 0;
          span.style.transform = "scale(0)";
        }
      });
      document.getElementById("result").classList.remove("show");

      setTimeout(() => {
        btn.innerHTML = btn.dataset.original;
        document.getElementById("result").classList.add("show");
        clearInterval(timer);
        updateAge(inputDate);
        timer = setInterval(() => updateAge(inputDate), 1000);
      }, 3000);
    }

    function updateAge(fromDate) {
      const now = new Date();
      let years = now.getFullYear() - fromDate.getFullYear();
      let months = now.getMonth() - fromDate.getMonth();
      let days = now.getDate() - fromDate.getDate();
      let hours = now.getHours() - fromDate.getHours();
      let minutes = now.getMinutes() - fromDate.getMinutes();
      let seconds = now.getSeconds() - fromDate.getSeconds();

      if (seconds < 0) { seconds += 60; minutes--; }
      if (minutes < 0) { minutes += 60; hours--; }
      if (hours < 0) { hours += 24; days--; }
      if (days < 0) {
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
        months--;
      }
      if (months < 0) { months += 12; years--; }

      const values = [years, months, days, hours, minutes, seconds];
      const ids = ['year', 'month', 'day', 'hour', 'minute', 'second'];
      values.forEach((val, i) => {
        const el = document.getElementById('val-' + ids[i]);
        if (val !== lastValues[i]) {
          el.textContent = val;
          el.parentElement.classList.add("flip");
          setTimeout(() => el.parentElement.classList.remove("flip"), 400);
          lastValues[i] = val;
        }
      });
    }

    // ================== PROGRESBAR OMBak ==================
    const canvas = document.getElementById("progress");
    const ctx = canvas.getContext("2d");
    
    const w = 300, h = 300;
    const scale = window.devicePixelRatio || 3;
    
    canvas.width = w * scale;
    canvas.height = h * scale;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    
    ctx.scale(scale, scale);
    
    const radius = w / 2;
    
    // offset gelombang
    let waveOffset1 = 0, waveOffset2 = 0, waveOffset3 = 0;
    
    // amplitudo dasar
    let amp1 = 10, amp2 = 6, amp3 = 4;
    
    // target amplitudo (bisa berubah pas klik)
    let targetAmp1 = 10, targetAmp2 = 6, targetAmp3 = 4;
    
    function hitungPersentase() {
      if (!birthDate) return 0;
      const now = new Date();
      let nextBirthday = new Date(now.getFullYear(), birthDate.getMonth(), birthDate.getDate());
      if (nextBirthday < now) nextBirthday = new Date(now.getFullYear()+1, birthDate.getMonth(), birthDate.getDate());
      const lastBirthday = new Date(nextBirthday.getFullYear()-1, birthDate.getMonth(), birthDate.getDate());
      const total = nextBirthday - lastBirthday;
      const elapsed = now - lastBirthday;
      return (elapsed / total) * 100;
    }
    
    function drawWave() {
      ctx.clearRect(0, 0, w, h);
      let percent = hitungPersentase();
    
      // lingkaran luar
      ctx.beginPath();
      ctx.arc(radius, radius, radius, 0, 2*Math.PI);
      ctx.strokeStyle = "white";
      ctx.lineWidth = 10;
      ctx.stroke();
    
      // clip area
      ctx.save();
      ctx.beginPath();
      ctx.arc(radius, radius, radius-10, 0, 2*Math.PI);
      ctx.clip();
    
      const level = h - (percent/100)*h;
    
      // ombak 1
      ctx.beginPath();
      for (let x = 0; x <= w; x++) {
        let y = amp1 * Math.sin((x/30) + waveOffset1) + level;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      ctx.fillStyle = "rgba(243, 156, 18, 0.8)";
      ctx.fill();
    
      // ombak 2
      ctx.beginPath();
      for (let x = 0; x <= w; x++) {
        let y = amp2 * Math.sin((x/25) + waveOffset2) + level;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      ctx.fillStyle = "rgba(243, 156, 18, 0.6)";
      ctx.fill();
    
      // ombak 3
      ctx.beginPath();
      for (let x = 0; x <= w; x++) {
        let y = amp3 * Math.sin((x/20) + waveOffset3) + level;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      ctx.fillStyle = "rgba(243, 156, 18, 0.5)";
      ctx.fill();
    
      ctx.restore();
    
      // persentase teks
      ctx.fillStyle = "white";
      ctx.font = "bold 25px 'Times New Roman', serif";
      ctx.textAlign = "center";
      ctx.fillText(Math.round(percent) + "%", radius, radius);
    
      // animasi offset (gerakan ombak)
      waveOffset1 += 0.05;
      waveOffset2 += 0.08;
      waveOffset3 += 0.1;
    
      // animasi transisi amplitudo biar halus
      amp1 += (targetAmp1 - amp1) * 0.05;
      amp2 += (targetAmp2 - amp2) * 0.05;
      amp3 += (targetAmp3 - amp3) * 0.05;
    
      requestAnimationFrame(drawWave);
    }
    
    drawWave();

// pas canvas di-klik, ombak dadi gede
canvas.addEventListener("click", () => {
  targetAmp1 = 25; // ombak 1 jadi gede
  targetAmp2 = 15; // ombak 2 agak gede
  targetAmp3 = 10; // ombak 3 kecil
  // balekno meneh sakwise 1 detik
  setTimeout(() => {
    targetAmp1 = 10;
    targetAmp2 = 6;
    targetAmp3 = 4;
  }, 1000);
});

// === ANIMASI ALERT ? ===
document.addEventListener('DOMContentLoaded', () => {
  const helpBtn = document.getElementById('helpBtn');
  const overlayBg = document.getElementById('overlayBg'); // opsional overlay
  const pager = document.getElementById('pager'); // pager horizontal scroll container

  if (!helpBtn || !pager) return; // jika elemen ga ada, stop

  // Sembunyikan tombol di awal
  helpBtn.style.display = 'none';

  // Fungsi untuk reset tombol dan overlay (tutup)
  function closeHelp() {
    helpBtn.classList.remove('open');
    if (overlayBg) overlayBg.classList.remove('show');
  }

  // Toggle tombol open/close saat klik tombol
  helpBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    helpBtn.classList.toggle('open');
    if (overlayBg) {
      overlayBg.classList.toggle('show', helpBtn.classList.contains('open'));
    }
  });

  // Tutup tombol saat klik di luar, hanya jika tombol dalam keadaan open
  document.addEventListener('click', (e) => {
    if (helpBtn.classList.contains('open') && !helpBtn.contains(e.target)) {
      closeHelp();
    }
  });

  // Listener scroll pager untuk kontrol tampil/tidak tombol
  pager.addEventListener('scroll', () => {
    const index = Math.round(pager.scrollLeft / pager.offsetWidth);

    if (index === 1) { // Halaman ke-2
      helpBtn.style.display = 'block';
    } else {
      helpBtn.style.display = 'none';
      closeHelp();
    }
  });

  // Inisialisasi cek posisi awal pager
  const initialIndex = Math.round(pager.scrollLeft / pager.offsetWidth);
  if (initialIndex === 1) {
    helpBtn.style.display = 'block';
  } else {
    helpBtn.style.display = 'none';
  }
});

// === ANIMASI FOOTER ===
    const texts = document.querySelectorAll(".zoom-text");
    let index = 0;

    setInterval(() => {
      const current = texts[index];
      current.classList.remove("active");
      current.classList.add("exit");

      index = (index + 1) % texts.length;
      const next = texts[index];

      // Delay agar animasi keluar kelihatan dulu
      setTimeout(() => {
        current.classList.remove("exit");
        next.classList.add("active");
      }, 700);
    }, 10000);

// === CARD STACK PORTOFOLIO ===
document.querySelectorAll(".card-body").forEach((card) => {
  card.addEventListener("click", function (e) {
    const overlay = this.querySelector(".overlay-portofolio");
    const active = document.querySelector(".overlay-portofolio.active");
    if (active && active !== overlay) {
      active.classList.remove("active");
    }
    overlay.classList.toggle("active");
    e.stopPropagation();
  });
});

// Tutup overlay saat klik di luar
document.addEventListener("click", function (e) {
  const active = document.querySelector(".overlay-portofolio.active");
  if (
    active &&
    !e.target.closest(".card-body") // klik di luar frame
  ) {
    active.classList.remove("active");
  }
});

// === aplikasi===
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
  navigator.serviceWorker.register('service-worker.js')
  .then(reg => console.log('✅ Service Worker registered!', reg))
  .catch(err => console.log('❌ Service Worker registration failed:', err));
  });
}

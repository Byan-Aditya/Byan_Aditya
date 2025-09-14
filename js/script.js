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

  // flag password
  let sudahLogin = false;
  const passwordBenar = "adit123";

  // sinkron animasi foto
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

  // toggle musik
  function toggleAudio(e) {
    e.preventDefault();

    // kalau belum login, munculkan SweetAlert
    if (!sudahLogin) {
      Swal.fire({
        imageUrl: 'images/music-password.gif',
        imageWidth: 150,
        imageHeight: 150,
        title: 'Hanya Untuk Developer',
        text: 'User ID : Byan Aditya',
        input: 'password',
        inputPlaceholder: 'Password musik...',
        showCancelButton: true,
        confirmButtonText: 'Lanjut',
        cancelButtonText: 'Batal'
      }).then((result) => {
        if (result.isConfirmed) {
          if (result.value === passwordBenar) {
            sudahLogin = true; // password valid
            Swal.fire({
              imageUrl: 'images/complate-alert.gif',
              imageWidth: 150,
              imageHeight: 150,
              title: 'Berhasil!',
              text: 'Selamat datang Byan, musik dimainkan 🎶'
            }).then(() => {
              musik.play().catch(()=>{});
              updateFotoAnimation();
            });
          } else {
            Swal.fire({
              imageUrl: 'images/download-failed.gif',
              imageWidth: 150,
              imageHeight: 150,
              title: 'Salah Bro!',
              text: 'Password yang anda masukkan salah.'
            });
          }
        }
      });
      return;
    }

    // kalau sudah login → normal toggle
    if (musik.paused) {
      musik.play().catch(()=>{});
    } else {
      musik.pause();
    }
    updateFotoAnimation();
  }

  tombol.addEventListener('click', toggleAudio);
  tombol.addEventListener('touchend', toggleAudio);

  // auto lanjut lagu
  musik.addEventListener('ended', () => {
    current = (current + 1) % playlist.length;
    musik.src = playlist[current];
    musik.play().catch(()=>{});
    updateFotoAnimation();
  });
});

// === BYAN TULISAN GOYANG ===
document.querySelectorAll(".creepster-regular").forEach(el => {
  let text = el.innerText;
  el.innerHTML = ""; // kosongin dulu
  [...text].forEach(char => {
    let span = document.createElement("span");
    span.textContent = char;
    if (char === " ") span.style.width = "0.2em"; // biar spasi tetep keliatan
    el.appendChild(span);
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

  cursor.style.opacity = "0";

  const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
  if (isTouch) {
    cursor.style.display = "none";
    return;
  }

  // ===== MOUSE LOGIC =====
  document.addEventListener("pointermove", (e) => {
    if (e.pointerType === "mouse") {
      cursor.style.top = `${e.clientY}px`;
      cursor.style.left = `${e.clientX}px`;
      cursor.style.opacity = "1"; // mouse always shows cursor
    }
  });

  document.addEventListener("mouseleave", () => {
    cursor.style.opacity = "0";
  });

  document.addEventListener("mouseenter", (e) => {
    if (e.pointerType === "mouse") cursor.style.opacity = "1";
  });

  let pressTime = 0;
  let holdTimer;

  document.addEventListener("mousedown", () => {
    pressTime = Date.now();
    holdTimer = setTimeout(() => {
      cursor.classList.add("hold");
    }, 200);
  });

  document.addEventListener("mouseup", () => {
    const held = Date.now() - pressTime;
    clearTimeout(holdTimer);

    cursor.classList.remove("hold");

    if (held < 200) {
      cursor.classList.remove("click"); 
      void cursor.offsetWidth;          
      cursor.classList.add("click");
    }
  });

  // ===== TOUCH/HYBRID FIX =====
  // touch gesture cuma sembunyikan cursor sementara
  const hideCursorTemporarily = () => cursor.style.opacity = "0";

  document.addEventListener("pointerdown", (e) => {
    if (e.pointerType === "touch") hideCursorTemporarily();
  });

  document.addEventListener("pointerup", (e) => {
    if (e.pointerType === "touch") hideCursorTemporarily();
  });

  document.addEventListener("pointercancel", () => {
    hideCursorTemporarily();
  });

  // ===== SCROLL FIX =====
  let scrollTimeout;
  window.addEventListener("scroll", () => {
    cursor.style.opacity = "0";
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      // cursor muncul otomatis saat mouse bergerak
    }, 300);
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
  const splashText = document.querySelector(".splash-screen-text");

  // Kumpulin gambar wae (audio/video skip ben ora macet iPhone)
  const assets = [...document.images];
  let loadedCount = 0;
  const totalAssets = assets.length;

  function updateProgress(asset) {
    if (asset.dataset.done) return;
    asset.dataset.done = true;

    loadedCount++;
    let percent = Math.min(100, Math.round((loadedCount / totalAssets) * 100));
    splashText.textContent = `Loading ${percent}%`;

    if (loadedCount >= totalAssets) {
      startAnimation();
    }
  }

  if (totalAssets === 0) {
    startAnimation();
  } else {
    assets.forEach(asset => {
      if (asset.complete) {
        updateProgress(asset);
      } else {
        asset.addEventListener("load", () => updateProgress(asset));
        asset.addEventListener("error", () => updateProgress(asset));
      }
    });
  }

  // Fallback anti-stuck (misal 5 detik langsung jalan)
  setTimeout(() => {
    if (loadedCount < totalAssets) {
      startAnimation();
    }
  }, 5000);

  function startAnimation() {
    // Logo besar di tengah
    introLogo.style.width = "250px";
    introLogo.style.height = "250px";
    introLogo.style.left = "50%";
    introLogo.style.top = "50%";
    introLogo.style.transform = "translate(-50%, -50%)";

    // Posisi target logo di header
    const targetRect = fotomuter.getBoundingClientRect();

    // Munculkan konten web
    document.body.classList.add("loaded");

    // Jalankan animasi: teks ilang + logo pindah
    setTimeout(() => {
      splashText.classList.add("hide"); // ✨ teks ilang
      introLogo.style.width = "50px";
      introLogo.style.height = "50px";
      introLogo.style.left = `${targetRect.left}px`;
      introLogo.style.top = `${targetRect.top + window.scrollY}px`;
      introLogo.style.transform = "translate(0, 0)";
    }, 400);

    // Setelah animasi selesai, splash screen ilang
    setTimeout(() => {
      intro.classList.add("hide");
    }, 1500);
  }
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

// === CLEAR BUTTON ===
const btn = document.getElementById("clearBtn");
const iconCancel = document.getElementById("iconCancel");
const iconDone = document.getElementById("iconDone");

btn.addEventListener("click", () => {
  // zoom klik
  btn.classList.add("clicked");
  setTimeout(() => btn.classList.remove("clicked"), 200);

  // silang hilang → centang muncul
  btn.classList.add("success");
  iconCancel.classList.remove("show");
  iconCancel.classList.add("hidden");
  iconDone.classList.remove("hidden");
  iconDone.classList.add("show");

  // balik silang setelah 2 detik
  setTimeout(() => {
    btn.classList.remove("success");
    iconDone.classList.remove("show");
    iconDone.classList.add("hidden");
    iconCancel.classList.remove("hidden");
    iconCancel.classList.add("show");
  }, 2000);

  // clear input
  ["day","month","year","hour","minute"].forEach(id => {
    document.getElementById(id).value = "";
  });

  // reset hasil umur
  clearInterval(timer);
  lastValues = [0,0,0,0,0,0];
  ['year','month','day','hour','minute','second'].forEach(id => {
    document.getElementById('val-'+id).textContent = "0";
  });

  // sembunyikan hasil
  document.getElementById("result").classList.remove("show");
  birthDate = null;
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

// === LOCK PDF DOWNLOAD BUTTON ===
document.addEventListener('DOMContentLoaded', () => {
  const downloadBtn = document.querySelector('.download-btn'); // tombol download
  const pager = document.getElementById('pager'); // container scroll horizontal

  if (!downloadBtn || !pager) return;

  // default: sembunyikan
  downloadBtn.style.display = 'none';

  // fungsi cek halaman aktif
  function checkPage() {
    const index = Math.round(pager.scrollLeft / pager.offsetWidth);

    if (index === 0) { // Halaman ke-1
      downloadBtn.style.display = 'flex'; // flex biar posisi center icon tetap
    } else {
      downloadBtn.style.display = 'none';
    }
  }

  // pas scroll pager
  pager.addEventListener('scroll', checkPage);

  // pas load awal
  checkPage();
});

// === ANIMASI POPUP DOWNLOAD ===
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("downloadBtn");

  if (!btn) return;

  btn.addEventListener("click", (e) => {
    e.preventDefault();

    Swal.fire({
      imageUrl: 'images/password.gif',
      imageWidth: 150,
      imageHeight: 150,
      title: 'Masukkan Password',
      input: 'password',
      inputPlaceholder: 'Password download...',
      showCancelButton: true,
      confirmButtonText: 'Lanjut',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        const password = result.value;

        if (password === "adit123") {
          Swal.fire({
            title: 'Download CV?',
            text: 'Yakin mau mendownload CV Byan Aditya?',
            imageUrl: 'images/download-alert.gif',
            imageWidth: 150,
            imageHeight: 150,
            showCancelButton: true,
            confirmButtonColor: '#00c6ff',
            cancelButtonColor: '#ff4e50',
            confirmButtonText: 'Ya, download!',
            cancelButtonText: 'Batal'
          }).then((res) => {
            if (res.isConfirmed) {
              window.location.href = btn.getAttribute("href");
              Swal.fire({
                imageUrl: 'images/complate-alert.gif',
                imageWidth: 150,
                imageHeight: 150,
                title: 'Berhasil!',
                text: 'File CV Byan Aditya telah diunduh.'
              });
            }
          });
        } else {
          Swal.fire({
            imageUrl: 'images/download-failed.gif',
            imageWidth: 150,
            imageHeight: 150,
            title: 'Salah Bro!',
            text: 'Password yang anda masukkan salah.'
          });
        }
      }
    });
  });
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
    }, 20000);

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

// === INDIKATOR UMUR PROFILE===
const indikatorBirthDate = new Date(1997, 11, 18) // 18 Desember 1997

function hitungIndikatorUmur() {
  const today = new Date();
  let umur = today.getFullYear() - indikatorBirthDate.getFullYear();
  const bulan = today.getMonth();
  const tanggal = today.getDate();

  // cek apakah ulang tahun tahun ini sudah lewat
  if (
    bulan < indikatorBirthDate.getMonth() ||
    (bulan === indikatorBirthDate.getMonth() && tanggal < indikatorBirthDate.getDate())
  ) {
    umur--; // kalau belum ultah tahun ini
  }

  return umur;
}

// tunggu DOM siap dulu
document.addEventListener("DOMContentLoaded", () => {
  const el = document.getElementById("umur");
  if (el) {
    el.textContent = hitungIndikatorUmur();
  }
});

// === SAFETY COPY & PASTE + SAFETY CTRL ===
  // Mateni klik kanan global
  document.addEventListener("contextmenu", e => e.preventDefault());

  // Fungsi cek shortcut terlarang
  function blockKeys(e) {
    const k = e.key.toLowerCase();

    if (
      (e.ctrlKey && ["c","x","v","u","s","a","p"].includes(k)) || // Ctrl+...
      (e.ctrlKey && e.shiftKey && ["i","j"].includes(k)) ||       // Ctrl+Shift+...
      (e.key && e.key.startsWith("F"))                            // F1-F12
    ) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }

  // Pasang ke semua event keyboard
  document.addEventListener("keydown", blockKeys, true);
  document.addEventListener("keyup", blockKeys, true);
  document.addEventListener("keypress", blockKeys, true);

  // Mateni event copy/paste drag-drop
  document.addEventListener("copy", e => e.preventDefault());
  document.addEventListener("cut", e => e.preventDefault());
  document.addEventListener("paste", e => e.preventDefault());
  document.addEventListener("dragstart", e => e.preventDefault());
  document.addEventListener("drop", e => e.preventDefault());

// === aplikasi===
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
  navigator.serviceWorker.register('service-worker.js')
  .then(reg => console.log('✅ Service Worker registered!', reg))
  .catch(err => console.log('❌ Service Worker registration failed:', err));
  });
}

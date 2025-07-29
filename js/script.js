// === MUSIC + BUTTON ===
document.addEventListener("DOMContentLoaded", () => {
  const foto = document.getElementById('fotomuter');
  const tombol = document.getElementById('playPauseBtn');
  const musik = document.getElementById('music');
  const icon = document.getElementById('icon');
  const playlist = [
    "music/lagu1.flac",
    "music/lagu2.mp3",
    "music/lagu3.mp3",
    "music/lagu4.mp3"
  ];
  let current = 0;
  musik.src = playlist[current]; // mulai lagu pertama

  tombol.addEventListener('click', () => {
    if (musik.paused) {
      musik.play();
      foto.style.animationPlayState = 'running';
      icon.src = "images/pause.png";
      icon.alt = "Pause";
    } else {
      musik.pause();
      foto.style.animationPlayState = 'paused';
      icon.src = "images/play.png";
      icon.alt = "Play";
    }
  });

  musik.addEventListener('ended', () => {
    current = (current + 1) % playlist.length;
    musik.src = playlist[current];
    musik.play();
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

// === FADE-IN + TAHUN ===
document.addEventListener("DOMContentLoaded", () => {
  const tahunEl = document.getElementById('tahun');
  if (tahunEl) {
    tahunEl.textContent = new Date().getFullYear();
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      } else {
        entry.target.classList.remove('fade-in');
      }
    });
  }, {
    threshold: 0.2
  });

  document.querySelectorAll('.fade-paragraph').forEach(p => {
    observer.observe(p);
  });
});

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

  document.addEventListener("mousemove", (e) => {
    cursor.style.top = `${e.clientY}px`;
    cursor.style.left = `${e.clientX}px`;
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

// === UMUR===
    let timer;
    let lastValues = [0, 0, 0, 0, 0, 0];
    function generate() {
      const d = +document.getElementById('day').value;
      const m = +document.getElementById('month').value - 1;
      const y = +document.getElementById('year').value;
      const h = +document.getElementById('hour').value || 0;
      const min = +document.getElementById('minute').value || 0;
      const inputDate = new Date(y, m, d, h, min);
      if (!d || !m || !y || isNaN(inputDate.getTime())) {
        alert("WAJIB ISI KOLOM YANG BERTANDA (*) DENGAN BENAR, KECUALI WAKTU (OPSIONAL).");
        return;
      }
      const btn = document.getElementById("animateBtn");
      if (!btn.dataset.original) {
        btn.dataset.original = btn.innerHTML;
      }
      // Ganti tulisan tombol sementara nganggo animasi span per huruf
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
      // Sembunyikan hasil dulu (jika sebelumnya sudah muncul)
      document.getElementById("result").classList.remove("show");
      // Delay 3 detik → baru tampilkan hasil & mulai hitung umur
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
      if (seconds < 0) {
        seconds += 60;
        minutes--;
      }
      if (minutes < 0) {
        minutes += 60;
        hours--;
      }
      if (hours < 0) {
        hours += 24;
        days--;
      }
      if (days < 0) {
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
        months--;
      }
      if (months < 0) {
        months += 12;
        years--;
      }
      const values = [years, months, days, hours, minutes, seconds];
      const ids = ['year', 'month', 'day', 'hour', 'minute', 'second'];
      values.forEach((val, i) => {
        const el = document.getElementById('val-' + ids[i]);
        if (val !== lastValues[i]) {
          el.textContent = val;
          el.parentElement.classList.add("flip");
          setTimeout(() => {
            el.parentElement.classList.remove("flip");
          }, 400);
          lastValues[i] = val;
        }
      });
    }

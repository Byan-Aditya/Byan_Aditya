// === MUSIC + BUTTON ===
document.addEventListener("DOMContentLoaded", () => {
  const foto = document.getElementById('fotomuter');
  const tombol = document.getElementById('playPauseBtn');
  const musik = document.getElementById('music');
  const icon = document.getElementById('icon');
  const playlist = [
    "music/lagu1.mp3",
    "music/lagu2.mp3",
    "music/lagu3.mp3"
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


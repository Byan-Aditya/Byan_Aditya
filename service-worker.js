self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("byan-cache").then(cache => {
      return cache.addAll([
        "/",
        "/index.html",

        "/js/catur.js",
        "/js/script.js",

        "/css/autobiografi.css",
        "/css/catur.css",
        "/css/drop_down_menu.css",
        "/css/mouse.css",
        "/css/profile.css",
        "/css/splash_screen.css",
        "/css/style.css",
        "/css/umur.css",
        "/css/view_pager.css",

        "/files/CV-Byan-Aditya.pdf",

        "/aplikasi/android-chrome-192x192.png",
        "/aplikasi/android-chrome-512x512.png",
        "/aplikasi/apple-touch-icon.png",
        "/aplikasi/favicon.ico",
        "/aplikasi/favicon-16x16.png",
        "/aplikasi/favicon-32x32.png",
        "/aplikasi/icon-192.png",
        "/aplikasi/icon-512.png",

        "/images/alamat.png",
        "/images/back_menu.gif",
        "/images/bahasa.png",
        "/images/bg1.jpg",
        "/images/bg2.jpg",
        "/images/bg3.jpg",
        "/images/bg4.jpg",
        "/images/bg5.jpg",
        "/images/biodata.png",
        "/images/cancel.gif",
        "/images/cancel-completed.gif",
        "/images/complate-alert.gif",
        "/images/dark.png",
        "/images/download-alert.gif",
        "/images/download-failed.gif",
        "/images/emergency.gif",
        "/images/facebook.png",
        "/images/formal.png",
        "/images/gear.png",
        "/images/gmail.png",
        "/images/handlebar.png",
        "/images/informal.png",
        "/images/instagram.png",
        "/images/kontak.png",
        "/images/lainnya.png",
        "/images/light.png",
        "/images/linkedin.png",
        "/images/logo.png",
        "/images/menu.gif",
        "/images/music-password.gif",
        "/images/password.gif",
        "/images/pause.png",
        "/images/pdf-download.gif",
        "/images/pengalaman.png",
        "/images/play.png",
        "/images/profile.png",
        "/images/software.png",
        "/images/tentang.png",
        "/images/twitter.png",
        "/images/whatsapp.png",

        "/images/autobiografi/1.jpg",
        "/images/autobiografi/2.jpg",
        "/images/autobiografi/3.jpg",
        "/images/autobiografi/4.jpg",
        "/images/autobiografi/5.jpg",
        "/images/autobiografi/6.jpg",
        "/images/autobiografi/7.jpg",
        "/images/autobiografi/8.jpg",
        "/images/autobiografi/9.jpg",
        "/images/autobiografi/10.jpg",

        "/images/catur/bishop-black.png",
        "/images/catur/bishop-white.png",
        "/images/catur/kalah.gif",
        "/images/catur/king-black.png",
        "/images/catur/king-white.png",
        "/images/catur/knight-black.png",
        "/images/catur/knight-white.png",
        "/images/catur/menang.gif",
        "/images/catur/pawn-black.png",
        "/images/catur/pawn-white.png",
        "/images/catur/queen-black.png",
        "/images/catur/queen-white.png",   // ✅ typo sudah dibenerno
        "/images/catur/rook-black.png",
        "/images/catur/rook-white.png",
        "/images/catur/seimbang.gif",
        "/images/catur/undo.gif",

        "/images/copyright/logo-facebook.png",
        "/images/copyright/logo-flaticon.png",
        "/images/copyright/logo-github.png",
        "/images/copyright/logo-gmail.png",
        "/images/copyright/logo-gpt.png",
        "/images/copyright/logo-icons8.png",
        "/images/copyright/logo-instagram.png",
        "/images/copyright/logo-linkedin.png",
        "/images/copyright/logo-twitter.png",
        "/images/copyright/logo-vercel.png",

        "/music/lagu1.mp3",
        "/music/lagu2.mp3",
        "/music/lagu3.mp3",
        "/music/lagu4.mp3"
      ]);
    })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim()); // 👉 ambil alih semua tab langsung
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

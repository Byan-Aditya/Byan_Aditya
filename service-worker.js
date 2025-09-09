self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("byan-cache").then(cache => {
      return cache.addAll([
        "./",
        "index.html",
      
        "js/script.js",
      
        "css/profile.css",
        "css/drop_down_menu.css",
        "css/mouse.css",
        "css/autobiografi.css",
        "css/splash_screen.css",
        "css/style.css",
        "css/umur.css",
        "css/view_pager.css",
      
        "files/CV-Byan-Aditya.pdf",
      
        "aplikasi/android-chrome-192x192.png",
        "aplikasi/android-chrome-512x512.png",
        "aplikasi/apple-touch-icon.png",
        "aplikasi/favicon.ico",
        "aplikasi/favicon-16x16.png",
        "aplikasi/favicon-32x32.png",
        "aplikasi/icon-192.png",
        "aplikasi/icon-512.png",
      
        "images/alamat.png",
        "images/back_menu.gif",
        "images/bahasa.png",
        "images/bg1.webp",
        "images/bg2.webp",
        "images/bg3.webp",
        "images/bg4.webp",
        "images/bg5.webp",
        "images/biodata.png",
        "images/cancel.gif",
        "images/cancel-completed.gif",
        "images/complate-alert.gif",
        "images/download-alert.gif",
        "images/download-failed.gif",
        "images/emergency.gif",
        "images/facebook.png",
        "images/formal.png",
        "images/gear.png",
        "images/gmail.png",
        "images/handlebar.png",
        "images/informal.png",
        "images/instagram.png",
        "images/kontak.png",
        "images/lainnya.png",
        "images/linkedin.png",
        "images/logo.png",
        "images/menu.gif",
        "images/music-password.gif",
        "images/password.gif",
        "images/pause.png",
        "images/pdf-download.gif",
        "images/pengalaman.png",
        "images/play.png",
        "images/profile.png",
        "images/software.png",
        "images/tentang.png",
        "images/twitter.png",
        "images/whatsapp.png",
      
        "slide2-images/1.webp",
        "slide2-images/2.webp",
        "slide2-images/3.webp",
        "slide2-images/4.webp",
        "slide2-images/5.webp",
        "slide2-images/6.webp",
        "slide2-images/7.webp",
        "slide2-images/8.webp",
        "slide2-images/9.webp",
        "slide2-images/10.webp",
      
        "music/lagu1.mp3",
        "music/lagu2.mp3",
        "music/lagu3.mp3",
        "music/lagu4.mp3"
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

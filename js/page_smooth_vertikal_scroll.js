document.addEventListener("DOMContentLoaded", () => {
  const pages = document.querySelectorAll(".page");

  pages.forEach(page => {
    let current = page.scrollTop;
    let target = page.scrollTop;
    const ease = 0.1;

    // DETEKSI TOUCH DEVICE
    const isTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0;

    // KALAU TOUCH → BIARKAN NATIVE
    if (isTouch) return;

    page.addEventListener(
      "wheel",
      e => {
        // biarkan horizontal hidup
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

        e.preventDefault();

        target += e.deltaY;
        target = Math.max(
          0,
          Math.min(target, page.scrollHeight - page.clientHeight)
        );
      },
      { passive: false }
    );

    function smooth() {
      current += (target - current) * ease;
      page.scrollTop = current;
      requestAnimationFrame(smooth);
    }

    smooth();
  });
});

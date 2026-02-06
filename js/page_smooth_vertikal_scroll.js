document.addEventListener("DOMContentLoaded", () => {
  const pages = document.querySelectorAll(".page");

  pages.forEach(page => {
    let current = page.scrollTop;
    let target = page.scrollTop;
    const ease = 0.10;

    page.addEventListener("wheel", e => {
      // BIARKAN horizontal tetap hidup
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

      e.preventDefault();
      target += e.deltaY;
      target = Math.max(
        0,
        Math.min(target, page.scrollHeight - page.clientHeight)
      );
    }, { passive: false });

    function smooth() {
      current += (target - current) * ease;
      page.scrollTop = current;
      requestAnimationFrame(smooth);
    }

    smooth();
  });
});

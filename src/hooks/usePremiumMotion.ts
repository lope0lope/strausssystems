import { useEffect } from "react";

const easeInOutCubic = (value: number) =>
  value < 0.5 ? 4 * value * value * value : 1 - Math.pow(-2 * value + 2, 3) / 2;

export const usePremiumMotion = () => {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const updateDepth = () => {
      frame = 0;
      const hero = document.querySelector<HTMLElement>("#hero");
      if (!hero) return;
      const progress = Math.min(1, Math.max(0, window.scrollY / Math.max(hero.offsetHeight, 1)));
      hero.style.setProperty("--scroll-depth", progress.toFixed(3));
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateDepth);
    };

    const onAnchorClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      const selector = link?.getAttribute("href");
      if (!link || !selector || selector === "#") return;
      const target = document.querySelector<HTMLElement>(selector);
      if (!target) return;
      event.preventDefault();

      if (reducedMotion.matches) {
        target.scrollIntoView();
        return;
      }

      const start = window.scrollY;
      const distance = target.getBoundingClientRect().top + start - start;
      const duration = Math.min(1100, Math.max(650, Math.abs(distance) * 0.45));
      const startedAt = performance.now();

      const animate = (now: number) => {
        const elapsed = Math.min(1, (now - startedAt) / duration);
        window.scrollTo(0, start + distance * easeInOutCubic(elapsed));
        if (elapsed < 1) window.requestAnimationFrame(animate);
        else history.replaceState(null, "", selector);
      };
      window.requestAnimationFrame(animate);
    };

    updateDepth();
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", onAnchorClick);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onAnchorClick);
    };
  }, []);
};
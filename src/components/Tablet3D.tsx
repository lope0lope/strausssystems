import { useEffect, useRef, useState } from "react";
import { Rotate3D } from "lucide-react";

type Tablet3DProps = {
  title: string;
  url?: string | null;
  html?: string | null;
};

type Orientation = "landscape" | "portrait";
type MotionValue = { p: number; v: number };

const Tablet3D = ({ title, url, html }: Tablet3DProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const tabletRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const glassRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const [orientation, setOrientation] = useState<Orientation>("landscape");
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const [flipping, setFlipping] = useState(false);
  const hasPreview = Boolean(url || html);
  const activeRef = useRef(active);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    const scene = sceneRef.current;
    const tablet = tabletRef.current;
    const view = viewRef.current;
    const frame = frameRef.current;
    const glass = glassRef.current;
    const shadow = shadowRef.current;
    if (!root || !stage || !scene || !tablet || !view || !frame || !glass || !shadow) return;

    const REST = { rx: 8, ry: -17, rz: 3.5 };
    const MAX_YAW = 14;
    const MAX_PITCH = 10;
    const LIFT = 70;
    const TRACK = { k: 16, c: 5.2 };
    const RETURN = { k: 9, c: 3.2 };
    const FLIP = { k: 20, c: 6.5 };
    const THICK = 34;
    const SCREEN_W = 1180;
    const SCREEN_H = 820;
    const TABLET_W = 1024;
    const MOBILE_W = 430;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.matchMedia("(pointer: coarse)").matches;
    const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));
    const windows = { landscape: { x: 145, y: 295, w: 1360, h: 1111 }, portrait: { x: 126, y: 120, w: 1360, h: 1470 } };
    const shadows = { landscape: { left: 340, top: 1249, width: 890 }, portrait: { left: 431, top: 1433, width: 690 } };
    const stops: [number, [number, number, number]][] = [[0, [182, 186, 194]], [0.15, [141, 144, 152]], [0.5, [95, 98, 105]], [1, [58, 60, 66]]];
    const metal = (position: number) => {
      for (let index = 1; index < stops.length; index += 1) {
        if (position <= stops[index][0]) {
          const previous = stops[index - 1];
          const next = stops[index];
          const amount = (position - previous[0]) / (next[0] - previous[0]);
          return `rgb(${[0, 1, 2].map((channel) => Math.round(previous[1][channel] + (next[1][channel] - previous[1][channel]) * amount)).join(",")})`;
        }
      }
      return "rgb(58,60,66)";
    };

    if (!tablet.querySelector(".tablet3d__ring")) {
      for (let index = 0; index < 20; index += 1) {
        const ring = document.createElement("div");
        const position = index / 19;
        ring.className = "tablet3d__ring";
        ring.style.transform = `translateZ(${((THICK / 2 - 1) - position * (THICK - 2)).toFixed(2)}px)`;
        ring.style.borderColor = metal(position);
        tablet.insertBefore(ring, tablet.querySelector(".tablet3d__front"));
      }
    }

    const layoutStage = (mode: Orientation) => {
      const windowBox = windows[mode];
      const scale = stage.clientWidth / windowBox.w;
      const floor = shadows[mode];
      scene.style.transform = `scale(${scale}) translate(${-windowBox.x}px,${-windowBox.y}px)`;
      stage.style.height = `${windowBox.h * scale}px`;
      shadow.style.left = `${floor.left}px`;
      shadow.style.top = `${floor.top}px`;
      shadow.style.width = `${floor.width}px`;
    };
    const layoutView = (mode: Orientation) => {
      if (mode === "portrait") {
        const scale = SCREEN_H / MOBILE_W;
        view.style.width = `${SCREEN_H}px`;
        view.style.height = `${SCREEN_W}px`;
        view.style.left = `${(SCREEN_W - SCREEN_H) / 2}px`;
        view.style.top = `${-(SCREEN_W - SCREEN_H) / 2}px`;
        view.style.transform = "rotate(-90deg)";
        frame.style.width = `${MOBILE_W}px`;
        frame.style.height = `${SCREEN_W / scale}px`;
        frame.style.transform = `scale(${scale})`;
      } else {
        const scale = SCREEN_W / TABLET_W;
        view.style.width = `${SCREEN_W}px`;
        view.style.height = `${SCREEN_H}px`;
        view.style.left = "0px";
        view.style.top = "0px";
        view.style.transform = "none";
        frame.style.width = `${TABLET_W}px`;
        frame.style.height = `${SCREEN_H / scale}px`;
        frame.style.transform = `scale(${scale})`;
      }
    };

    layoutStage(orientation);
    layoutView(orientation);
    const resizeObserver = new ResizeObserver(() => layoutStage(orientation));
    resizeObserver.observe(root);

    let pointerInside = false;
    let running = true;
    let last = performance.now();
    let leaveTimer = 0;
    const motion = {
      x: { p: 0, v: 0 } as MotionValue,
      y: { p: 0, v: 0 } as MotionValue,
      lift: { p: 0, v: 0 } as MotionValue,
      flip: { p: orientation === "portrait" ? 90 : 0, v: 0 } as MotionValue,
    };
    const target = { x: 0, y: 0, lift: 0, flip: orientation === "portrait" ? 90 : 0 };
    const aim = (event: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      const normalX = clamp((event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2), -1, 1);
      const normalY = clamp((event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2), -1, 1);
      target.y = normalX * MAX_YAW;
      target.x = -normalY * MAX_PITCH;
      target.lift = LIFT;
    };
    const release = () => {
      pointerInside = false;
      target.x = 0;
      target.y = 0;
      target.lift = 0;
    };
    const step = (value: MotionValue, destination: number, spring: { k: number; c: number }, delta: number) => {
      const damping = reduced ? 2 * Math.sqrt(spring.k) : spring.c;
      value.v += (spring.k * (destination - value.p) - damping * value.v) * delta;
      value.p += value.v * delta;
    };
    const animate = (now: number) => {
      if (!running) return;
      const elapsed = Math.min(0.1, (now - last) / 1000 || 0.016);
      last = now;
      const spring = pointerInside || activeRef.current ? TRACK : RETURN;
      const steps = Math.ceil(elapsed * 60);
      const delta = elapsed / steps;
      for (let index = 0; index < steps; index += 1) {
        step(motion.x, target.x, spring, delta);
        step(motion.y, target.y, spring, delta);
        step(motion.lift, target.lift, spring, delta);
        step(motion.flip, target.flip, FLIP, delta);
      }
      const time = now / 1000;
      const bob = reduced ? 0 : Math.sin(time * 1.05) * 9;
      const wobbleX = reduced ? 0 : Math.sin(time * 0.7 + 0.6) * 0.8;
      const wobbleY = reduced ? 0 : Math.sin(time * 0.55) * 1.1;
      const wobbleZ = reduced ? 0 : Math.sin(time * 0.42 + 2) * 0.5;
      tablet.style.transform = `translate3d(0,${bob.toFixed(2)}px,${motion.lift.p.toFixed(2)}px) rotateX(${(motion.x.p + wobbleX).toFixed(3)}deg) rotateY(${(motion.y.p + wobbleY).toFixed(3)}deg) rotateX(${REST.rx}deg) rotateY(${REST.ry}deg) rotateZ(${(REST.rz + wobbleZ + motion.flip.p).toFixed(3)}deg)`;
      shadow.style.opacity = clamp(0.3 - motion.lift.p * 0.0009 - bob * 0.002, 0.12, 0.4).toFixed(3);
      shadow.style.transform = `translate(${-motion.y.p * 3}px,${motion.x.p * 2}px) scale(${(1 - motion.lift.p * 0.0012 - bob * 0.006).toFixed(4)})`;
      glass.style.backgroundPosition = `${(50 - motion.y.p * 3).toFixed(1)}% 0`;
      requestAnimationFrame(animate);
    };
    const handleEnter = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== "mouse") return;
      pointerInside = true;
      if (!active) aim(event);
    };
    const handleMove = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== "mouse") return;
      pointerInside = true;
      if (!active) aim(event);
    };
    const handleLeave = () => {
      window.clearTimeout(leaveTimer);
      leaveTimer = window.setTimeout(release, 140);
    };
    const handleDocumentMove = (event: PointerEvent) => {
      if ((pointerInside || active) && !tablet.contains(event.target as Node)) release();
    };
    tablet.addEventListener("pointerenter", handleEnter);
    tablet.addEventListener("pointermove", handleMove);
    tablet.addEventListener("pointerleave", handleLeave);
    document.addEventListener("pointermove", handleDocumentMove, { passive: true });
    const frameLoop = requestAnimationFrame(animate);

    return () => {
      running = false;
      cancelAnimationFrame(frameLoop);
      window.clearTimeout(leaveTimer);
      resizeObserver.disconnect();
      tablet.removeEventListener("pointerenter", handleEnter);
      tablet.removeEventListener("pointermove", handleMove);
      tablet.removeEventListener("pointerleave", handleLeave);
      document.removeEventListener("pointermove", handleDocumentMove);
    };
  }, [html, orientation, url]);

  const flip = () => {
    const next = orientation === "portrait" ? "landscape" : "portrait";
    setFlipping(true);
    setActive(false);
    setOrientation(next);
    window.setTimeout(() => setFlipping(false), 1100);
  };

  return (
    <div ref={rootRef} className={`tablet3d ${orientation === "portrait" ? "is-portrait" : ""} ${active ? "is-active" : ""} ${hover ? "is-hover" : ""} ${flipping ? "is-flipping" : ""}`} onPointerEnter={() => setHover(true)} onPointerLeave={() => setHover(false)}>
      <div ref={stageRef} className="tablet3d__stage">
        <div ref={sceneRef} className="tablet3d__scene">
          <div ref={shadowRef} className="tablet3d__shadow" />
          <div ref={tabletRef} className="tablet3d__tablet">
            <div className="tablet3d__back" />
            <div className="tablet3d__front">
              <div className="tablet3d__screen">
                <div ref={viewRef} className="tablet3d__view">
                  <iframe ref={frameRef} title={`${title} live preview`} src={url || undefined} srcDoc={url ? undefined : html || undefined} sandbox={url ? undefined : "allow-scripts allow-forms allow-popups"} />
                  {!hasPreview && <div className="tablet3d__empty">Preview ready for a project URL or HTML page</div>}
                  {!active && hasPreview && <button className="tablet3d__hit" type="button" onClick={() => setActive(true)} aria-label={`Interact with ${title} preview`}><span>Click to interact</span></button>}
                  <div className="tablet3d__hint">Click to interact</div>
                </div>
              </div>
              <div ref={glassRef} className="tablet3d__glass" />
            </div>
          </div>
        </div>
      </div>
      <div className="tablet3d__bar">
        <button className="tablet3d__flip" type="button" onPointerDown={(event) => event.stopPropagation()} onClick={flip} aria-pressed={orientation === "portrait"}>
          <Rotate3D aria-hidden="true" />
          <span>{orientation === "portrait" ? "Tablet view" : "Phone view"}</span>
        </button>
      </div>
    </div>
  );
};

export default Tablet3D;

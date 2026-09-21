import { useEffect, useRef, useState } from "react";

type Tablet3DProps = { title: string; gif?: string };
type MotionValue = { p: number; v: number };

const Tablet3D = ({ title, gif = "/croc.gif" }: Tablet3DProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const tabletRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const glassRef = useRef<HTMLDivElement>(null);
  const [coarsePointer, setCoarsePointer] = useState(() => typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches);

  useEffect(() => {
    const query = window.matchMedia("(pointer: coarse)");
    const update = () => setCoarsePointer(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (coarsePointer) return;
    const root = rootRef.current;
    const stage = stageRef.current;
    const scene = sceneRef.current;
    const tablet = tabletRef.current;
    const shadow = shadowRef.current;
    const glass = glassRef.current;
    if (!root || !stage || !scene || !tablet || !shadow || !glass) return;

    const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));
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
        ring.style.transform = `translateZ(${((17 - 1) - position * 32).toFixed(2)}px)`;
        ring.style.borderColor = metal(position);
        tablet.insertBefore(ring, tablet.querySelector(".tablet3d__front"));
      }
    }

    const layout = () => {
      const scale = stage.clientWidth / 1360;
      scene.style.transform = `scale(${scale}) translate(-145px,-295px)`;
      stage.style.height = `${1111 * scale}px`;
    };
    layout();
    const resizeObserver = new ResizeObserver(layout);
    resizeObserver.observe(root);

    let pointerInside = false;
    let running = true;
    let last = performance.now();
    let leaveTimer = 0;
    const motion = { x: { p: 0, v: 0 } as MotionValue, y: { p: 0, v: 0 } as MotionValue, lift: { p: 0, v: 0 } as MotionValue };
    const target = { x: 0, y: 0, lift: 0 };
    const aim = (event: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      target.y = clamp((event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2), -1, 1) * 14;
      target.x = -clamp((event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2), -1, 1) * 10;
      target.lift = 70;
    };
    const release = () => { pointerInside = false; target.x = 0; target.y = 0; target.lift = 0; };
    const step = (value: MotionValue, destination: number, delta: number) => {
      value.v += (16 * (destination - value.p) - 5.2 * value.v) * delta;
      value.p += value.v * delta;
    };
    const animate = (now: number) => {
      if (!running) return;
      const elapsed = Math.min(0.1, (now - last) / 1000 || 0.016);
      last = now;
      const delta = elapsed / Math.ceil(elapsed * 60);
      const steps = Math.ceil(elapsed * 60);
      for (let index = 0; index < steps; index += 1) {
        step(motion.x, target.x, delta);
        step(motion.y, target.y, delta);
        step(motion.lift, target.lift, delta);
      }
      const time = now / 1000;
      const bob = Math.sin(time * 1.05) * 9;
      tablet.style.transform = `translate3d(0,${bob.toFixed(2)}px,${motion.lift.p.toFixed(2)}px) rotateX(${(motion.x.p + 8).toFixed(3)}deg) rotateY(${(motion.y.p - 17).toFixed(3)}deg) rotateZ(${(3.5 + Math.sin(time * 0.42 + 2) * 0.5).toFixed(3)}deg)`;
      shadow.style.opacity = clamp(0.3 - motion.lift.p * 0.0009 - bob * 0.002, 0.12, 0.4).toFixed(3);
      shadow.style.transform = `translate(${-motion.y.p * 3}px,${motion.x.p * 2}px) scale(${(1 - motion.lift.p * 0.0012 - bob * 0.006).toFixed(4)})`;
      glass.style.backgroundPosition = `${(50 - motion.y.p * 3).toFixed(1)}% 0`;
      requestAnimationFrame(animate);
    };
    const handleEnter = (event: PointerEvent) => { if (!event.pointerType || event.pointerType === "mouse") { pointerInside = true; aim(event); } };
    const handleMove = (event: PointerEvent) => { if (!event.pointerType || event.pointerType === "mouse") { pointerInside = true; aim(event); } };
    const handleLeave = () => { window.clearTimeout(leaveTimer); leaveTimer = window.setTimeout(release, 140); };
    tablet.addEventListener("pointerenter", handleEnter);
    tablet.addEventListener("pointermove", handleMove);
    tablet.addEventListener("pointerleave", handleLeave);
    const frameLoop = requestAnimationFrame(animate);
    return () => {
      running = false;
      cancelAnimationFrame(frameLoop);
      window.clearTimeout(leaveTimer);
      resizeObserver.disconnect();
      tablet.removeEventListener("pointerenter", handleEnter);
      tablet.removeEventListener("pointermove", handleMove);
      tablet.removeEventListener("pointerleave", handleLeave);
    };
  }, [coarsePointer]);

  useEffect(() => {
    const banner = document.querySelector<HTMLDivElement>(".tablet3d-mobile-banner");
    if (!coarsePointer || !banner || !window.DeviceOrientationEvent) return;
    const handleOrientation = (event: DeviceOrientationEvent) => banner.style.setProperty("--phone-tilt", `${Math.max(-5, Math.min(5, (event.gamma || 0) * 0.12)).toFixed(2)}deg`);
    window.addEventListener("deviceorientation", handleOrientation, { passive: true });
    return () => window.removeEventListener("deviceorientation", handleOrientation);
  }, [coarsePointer]);

  if (coarsePointer) {
    return <div className="tablet3d-mobile-banner"><img src={gif} alt={`${title} animated preview`} /><span>{title}</span></div>;
  }

  return (
    <div ref={rootRef} className="tablet3d" aria-label={`${title} animated preview`}>
      <div ref={stageRef} className="tablet3d__stage"><div ref={sceneRef} className="tablet3d__scene"><div ref={shadowRef} className="tablet3d__shadow" /><div ref={tabletRef} className="tablet3d__tablet"><div className="tablet3d__back" /><div className="tablet3d__front"><div className="tablet3d__screen"><img ref={imageRef} src={gif} alt={`${title} animated preview`} /></div><div ref={glassRef} className="tablet3d__glass" /></div></div></div></div>
    </div>
  );
};

export default Tablet3D;

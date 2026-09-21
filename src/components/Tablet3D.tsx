import { useEffect, useRef, useState } from "react";
import { Rotate3D } from "lucide-react";

type Tablet3DProps = {
  title: string;
  url?: string | null;
  html?: string | null;
};

const Tablet3D = ({ title, url, html }: Tablet3DProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [portrait, setPortrait] = useState(false);
  const [active, setActive] = useState(false);
  const [hover, setHover] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const hasPreview = Boolean(url || html);

  useEffect(() => {
    if (!hover || active || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTilt({ x: 0, y: 0 });
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      const rect = rootRef.current?.getBoundingClientRect();
      if (!rect) return;
      setTilt({
        x: ((event.clientY - rect.top) / rect.height - 0.5) * -8,
        y: ((event.clientX - rect.left) / rect.width - 0.5) * 12,
      });
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [active, hover]);

  return (
    <div
      ref={rootRef}
      className={`tablet-preview ${portrait ? "is-portrait" : ""} ${active ? "is-active" : ""}`}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      style={{ "--tablet-x": `${tilt.x}deg`, "--tablet-y": `${tilt.y}deg` } as React.CSSProperties}
    >
      <div className="tablet-preview__stage">
        <div className="tablet-preview__scene">
          <div className="tablet-preview__shadow" />
          <div className="tablet-preview__device">
            <div className="tablet-preview__back" />
            <div className="tablet-preview__front">
              <div className="tablet-preview__screen">
                {hasPreview ? (
                  <iframe
                    title={`${title} live preview`}
                    src={url || undefined}
                    srcDoc={url ? undefined : html || undefined}
                    sandbox={url ? undefined : "allow-scripts allow-forms allow-popups"}
                    loading="lazy"
                  />
                ) : (
                  <div className="tablet-preview__empty">Preview ready for a project URL or HTML page</div>
                )}
                {!active && hasPreview && (
                  <button className="tablet-preview__hit" type="button" onClick={() => setActive(true)} aria-label={`Interact with ${title} preview`}>
                    <span>Click to interact</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="tablet-preview__controls">
        <button className="tablet-preview__flip" type="button" onPointerDown={(event) => event.stopPropagation()} onClick={() => { setPortrait((value) => !value); setActive(false); }} aria-pressed={portrait}>
          <Rotate3D aria-hidden="true" />
          <span>{portrait ? "Tablet view" : "Phone view"}</span>
        </button>
      </div>
    </div>
  );
};

export default Tablet3D;

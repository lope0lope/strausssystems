import { useEffect, useRef } from "react";

type Tablet3DProps = {
  title: string;
  gif?: string;
};

const Tablet3D = ({ title, gif = "/croc.gif" }: Tablet3DProps) => {
  const mobileBannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const banner = mobileBannerRef.current;
    if (!banner || !window.DeviceOrientationEvent) return;

    const handleOrientation = (event: DeviceOrientationEvent) => {
      const tilt = Math.max(-5, Math.min(5, (event.gamma || 0) * 0.12));
      banner.style.setProperty("--phone-tilt", `${tilt.toFixed(2)}deg`);
    };

    window.addEventListener("deviceorientation", handleOrientation, { passive: true });
    return () => window.removeEventListener("deviceorientation", handleOrientation);
  }, []);

  return (
    <>
      <div className="tablet3d tablet3d--gif" aria-label={`${title} animated preview`}>
        <div className="tablet3d__stage">
          <div className="tablet3d__scene">
            <div className="tablet3d__tablet">
              <div className="tablet3d__front">
                <div className="tablet3d__screen">
                  <img src={gif} alt={`${title} animated preview`} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div ref={mobileBannerRef} className="tablet3d-mobile-banner">
        <img src={gif} alt={`${title} animated preview`} />
        <span>{title}</span>
      </div>
    </>
  );
};

export default Tablet3D;

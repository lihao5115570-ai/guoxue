import type { CSSProperties } from "react";

export function AmbientBackground() {
  return (
    <div className="site-atmosphere" aria-hidden="true">
      <div className="moon-glow" />
      <div className="mountain-layer mountain-layer-a" />
      <div className="mountain-layer mountain-layer-b" />
      <div className="temple-line" />
      <div className="gold-particles">
        {Array.from({ length: 18 }).map((_, index) => (
          <span key={index} style={{ "--i": index } as CSSProperties} />
        ))}
      </div>
    </div>
  );
}

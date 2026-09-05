type BrandLogoProps = {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  subtitle?: string;
};

const sizeClass = {
  sm: "h-10 w-10",
  md: "h-12 w-12",
  lg: "h-28 w-28"
};

const sizePx = {
  sm: 40,
  md: 48,
  lg: 112
};

const textSizeClass = {
  sm: "text-lg",
  md: "text-xl",
  lg: "text-6xl"
};

export function BrandMark({ size = "md" }: Pick<BrandLogoProps, "size">) {
  const svgSize = Math.round(sizePx[size] * 0.7);

  return (
    <span
      className={`brand-mark lotus-mark ${sizeClass[size]}`}
      aria-hidden="true"
      style={{
        width: sizePx[size],
        height: sizePx[size],
        minWidth: sizePx[size],
        color: "#d6b56c",
        display: "grid",
        placeItems: "center",
        borderRadius: 999
      }}
    >
      <svg width={svgSize} height={svgSize} viewBox="0 0 64 64" fill="none" role="img" style={{ display: "block" }}>
        <path d="M32 7v50" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path
          d="M32 12c-8.2 6.5-13.4 15.4-13.4 24.7 0 6.9 4.6 12.6 13.4 20.3 8.8-7.7 13.4-13.4 13.4-20.3C45.4 27.4 40.2 18.5 32 12Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M32 25c-6.7 1.7-12.4 5.5-17.2 11.5M32 25c6.7 1.7 12.4 5.5 17.2 11.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M32 57c-4.7-8-10.8-13.9-18.4-17.6M32 57c4.7-8 10.8-13.9 18.4-17.6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="32" cy="32" r="27" stroke="currentColor" strokeWidth="1.4" opacity=".72" />
      </svg>
    </span>
  );
}

export function BrandLogo({ size = "md", showText = true, subtitle = "佛家祈福与东方文化" }: BrandLogoProps) {
  return (
    <span className="flex items-center gap-3">
      <BrandMark size={size} />
      {showText && (
        <span className="whitespace-nowrap leading-tight text-[var(--paper)]">
          <span className={`font-semibold tracking-[0.18em] ${textSizeClass[size]}`}>禅心阁</span>
          <small className="block text-xs font-normal tracking-[0.18em] text-[var(--muted)]">{subtitle}</small>
        </span>
      )}
    </span>
  );
}

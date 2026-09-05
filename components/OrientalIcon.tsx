export type OrientalIconType =
  | "divination"
  | "bazi"
  | "wuxing"
  | "fortune"
  | "career"
  | "love"
  | "marriage"
  | "prayer"
  | "calendar"
  | "lottery"
  | "dream"
  | "palm"
  | "lamp"
  | "name"
  | "liuyao"
  | "meditation"
  | "encyclopedia"
  | "lotus"
  | "book"
  | "coin";

type OrientalIconProps = {
  type?: OrientalIconType;
  className?: string;
  seal?: string;
};

function CloudLines() {
  return (
    <>
      <path d="M34 92c11-9 23-9 34 0M132 92c11-9 23-9 34 0" />
      <path d="M42 98h36M124 98h36" />
    </>
  );
}

function Mountains() {
  return (
    <>
      <path d="M38 130 68 92l18 18 30-42 46 62Z" />
      <path d="M52 132h116" />
    </>
  );
}

function CoinPair() {
  return (
    <>
      <circle cx="72" cy="116" r="13" />
      <circle cx="128" cy="116" r="13" />
      <path d="M65 116h14M72 109v14M121 116h14M128 109v14" />
    </>
  );
}

export function OrientalIcon({ type = "lotus", className = "", seal }: OrientalIconProps) {
  return (
    <svg className={`oriental-icon ${className}`} viewBox="0 0 200 160" fill="none" aria-hidden="true">
      <defs>
        <radialGradient id={`oi-halo-${type}`} cx="50%" cy="42%" r="58%">
          <stop offset="0%" stopColor="rgba(214,181,108,.32)" />
          <stop offset="68%" stopColor="rgba(214,181,108,.07)" />
          <stop offset="100%" stopColor="rgba(214,181,108,0)" />
        </radialGradient>
      </defs>
      <rect x="1" y="1" width="198" height="158" rx="2" className="oriental-icon-frame" />
      <circle cx="100" cy="76" r="58" fill={`url(#oi-halo-${type})`} />
      <circle cx="100" cy="76" r="46" className="oriental-icon-ring" />
      <g className="oriental-icon-line">
        {type === "divination" && (
          <>
            <circle cx="100" cy="76" r="37" />
            <path d="M100 39v74M63 76h74M75 50l50 50M125 50l-50 50" />
            <path d="M78 110c14 12 30 12 44 0" />
            <CloudLines />
          </>
        )}
        {type === "bazi" && (
          <>
            <path d="M58 40h84v74H58Z" />
            <path d="M76 40v74M94 40v74M112 40v74M130 40v74" />
            <path d="M66 56h68M66 76h68M66 96h68" />
            <circle cx="100" cy="78" r="52" />
          </>
        )}
        {type === "wuxing" && (
          <>
            <circle cx="100" cy="78" r="44" />
            <path d="M100 34v88M56 78h88M70 48l60 60M130 48l-60 60" />
            <path d="M68 120c20 13 44 13 64 0" />
            <Mountains />
          </>
        )}
        {type === "fortune" && (
          <>
            <Mountains />
            <circle cx="132" cy="48" r="13" />
            <path d="M62 52c25-13 52-13 78 0M72 38c17-8 36-8 55 0" />
            <path d="M94 34c12 14 12 28 0 42M108 34c12 14 12 28 0 42" />
          </>
        )}
        {type === "career" && (
          <>
            <path d="M62 58h76v70H62Z" />
            <path d="M78 58V42h44v16M74 80h52M74 100h52" />
            <CoinPair />
            <CloudLines />
          </>
        )}
        {type === "love" && (
          <>
            <path d="M70 88c14-36 46-36 60 0" />
            <path d="M73 76c9-17 21-8 27 1 6-9 18-18 27-1" />
            <path d="M60 106c24 12 56 12 80 0" />
            <circle cx="142" cy="44" r="12" />
            <CloudLines />
          </>
        )}
        {type === "marriage" && (
          <>
            <circle cx="78" cy="74" r="28" />
            <circle cx="122" cy="74" r="28" />
            <path d="M72 110c18 12 38 12 56 0M72 42c18-12 38-12 56 0" />
            <path d="M82 74h36M100 56v36" />
          </>
        )}
        {type === "prayer" && (
          <>
            <path d="M100 28c-22 17-36 37-36 58 0 18 14 31 36 44 22-13 36-26 36-44 0-21-14-41-36-58Z" />
            <path d="M100 34v88M72 88c19-9 38-9 56 0M82 112c13-18 26-30 40-38" />
            <CloudLines />
          </>
        )}
        {type === "calendar" && (
          <>
            <path d="M58 44h84v82H58Z" />
            <path d="M58 64h84M76 36v20M124 36v20" />
            <path d="M76 82h14M98 82h14M120 82h10M76 102h14M98 102h14M120 102h10" />
            <circle cx="150" cy="42" r="11" />
          </>
        )}
        {type === "lottery" && (
          <>
            <path d="M72 36h56v92H72Z" />
            <path d="M84 52h32M84 70h32M84 88h32M84 106h20" />
            <path d="M58 126h84" />
            <CloudLines />
          </>
        )}
        {type === "dream" && (
          <>
            <path d="M58 84c24 28 60 28 84 0-24-28-60-28-84 0Z" />
            <circle cx="100" cy="84" r="15" />
            <path d="M70 50c18 11 42 11 60 0M82 34c12 9 24 9 36 0" />
            <circle cx="142" cy="42" r="10" />
          </>
        )}
        {type === "palm" && (
          <>
            <path d="M88 122c-14-25-10-53 4-73 3-4 9-2 9 4v34" />
            <path d="M101 86V40c0-7 10-8 12-1l5 48" />
            <path d="M118 88V49c0-7 10-8 12-1l5 43" />
            <path d="M134 92l10-26c3-7 13-4 12 3l-7 40c-4 23-22 35-43 26" />
            <path d="M90 94c16 7 33 7 50 0M98 112c12 6 24 6 36 0" />
          </>
        )}
        {type === "lamp" && (
          <>
            <path d="M82 104h36c10 0 18 8 18 18v10H64v-10c0-10 8-18 18-18Z" />
            <path d="M74 132h52M100 104V84" />
            <path d="M100 36c-11 15-16 26-16 36 0 10 7 18 16 18s16-8 16-18c0-10-5-21-16-36Z" />
            <path d="M100 48c-5 9-7 16-7 22 0 5 3 9 7 9s7-4 7-9c0-6-2-13-7-22Z" />
            <path d="M62 94c20-12 56-12 76 0M50 112c30-18 70-18 100 0" />
            <CloudLines />
          </>
        )}
        {type === "name" && (
          <>
            <path d="M66 38h72v86H66Z" />
            <path d="M82 56h40M82 74h40M82 92h40M82 110h24" />
            <path d="M144 54c18 12 18 36 0 48" />
            <path d="M54 126h92" />
          </>
        )}
        {type === "liuyao" && (
          <>
            {[0, 1, 2, 3, 4, 5].map((i) => <path key={i} d={`M68 ${46 + i * 13}h64`} />)}
            <circle cx="100" cy="80" r="50" />
            <CoinPair />
          </>
        )}
        {type === "meditation" && (
          <>
            <circle cx="100" cy="44" r="14" />
            <path d="M76 122c13-30 35-30 48 0M58 122c24-14 60-14 84 0" />
            <path d="M70 90c20 15 40 15 60 0M100 60v38" />
            <circle cx="100" cy="80" r="52" />
          </>
        )}
        {type === "encyclopedia" || type === "book" ? (
          <>
            <path d="M58 44c8-8 18-10 30-6v82c-12-4-22-2-30 6V44Z" />
            <path d="M142 44c-8-8-18-10-30-6v82c12-4 22-2 30 6V44Z" />
            <path d="M88 38h24M88 120h24M72 58h12M72 76h12M116 58h12M116 76h12" />
          </>
        ) : null}
        {type === "lotus" && (
          <>
            <path d="M100 26c-22 17-36 37-36 58 0 18 14 31 36 44 22-13 36-26 36-44 0-21-14-41-36-58Z" />
            <path d="M100 50c-16 4-30 13-42 27M100 50c16 4 30 13 42 27" />
            <path d="M100 128c-12-20-28-35-48-44M100 128c12-20 28-35 48-44" />
          </>
        )}
        {type === "coin" && <CoinPair />}
      </g>
      <text x="160" y="134" textAnchor="middle" className="oriental-icon-seal">{seal ?? "印"}</text>
    </svg>
  );
}

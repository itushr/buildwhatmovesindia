import { EmblemIcon } from "./Icons";

export default function DottedWave() {
  // Master dotted wave paths & concentric arcs
  const wavePaths = [];
  const arcPaths = [];
  const count = 38;

  for (let i = 0; i < count; i++) {
    const opacity = Math.max(0.10, 0.58 - (i / count) * 0.45);
    const strokeWidth = 1.25;
    const dash = "1.5 5.5";

    // Smooth sweeping curves starting near corner edge
    const startX = -110 + i * 6;
    const startY = 90 + i * 9;
    const cp1X = 90 + i * 11;
    const cp1Y = -10 + i * 11;
    const cp2X = 170 + i * 12;
    const cp2Y = 210 + i * 8;
    const endX = 340 + i * 14;
    const endY = 460 + i * 4;

    const pathData = `M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`;

    wavePaths.push(
      <path
        key={`w-${i}`}
        d={pathData}
        fill="none"
        stroke="#3B82F6"
        strokeWidth={strokeWidth}
        strokeDasharray={dash}
        strokeLinecap="round"
        opacity={opacity}
      />
    );
  }

  for (let j = 0; j < 30; j++) {
    const r = 90 + j * 14;
    const opacity = Math.max(0.08, 0.50 - (j / 30) * 0.40);
    arcPaths.push(
      <circle
        key={`a-${j}`}
        cx="-80"
        cy="270"
        r={r}
        fill="none"
        stroke="#60A5FA"
        strokeWidth={1.2}
        strokeDasharray="1.5 5.5"
        strokeLinecap="round"
        opacity={opacity}
      />
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Official Government Watermark Emblem centered in background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <EmblemIcon className="w-[420px] h-[480px] text-[#0B1C3F] opacity-[0.03] select-none -translate-y-6" />
      </div>

      {/* Ambient Soft Lighting Glow for Typography Readability */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.85) 0%, rgba(235,244,254,0.45) 60%, rgba(225,238,253,0.3) 100%)'
        }}
      />

      {/* Left Dotted Wave Graphic (Top-Left Corner) */}
      <div className="absolute -top-20 -left-28 sm:-top-14 sm:-left-20 md:top-0 md:left-0 w-[440px] h-[480px] sm:w-[500px] sm:h-[520px] md:w-[580px] md:h-[600px] pointer-events-none">
        <svg
          className="w-full h-full"
          viewBox="0 0 600 600"
          preserveAspectRatio="xMinYMid slice"
          style={{
            maskImage:
              'radial-gradient(ellipse at 0% 32%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 65%, transparent 100%)',
            WebkitMaskImage:
              'radial-gradient(ellipse at 0% 32%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 65%, transparent 100%)',
          }}
        >
          <g>{arcPaths}</g>
          <g>{wavePaths}</g>
        </svg>
      </div>

      {/* Right Dotted Wave Graphic (Positioned Lower at Bottom-Right for Diagonal Balance) */}
      <div className="absolute -bottom-10 -right-24 sm:-bottom-12 sm:-right-20 md:bottom-0 md:right-0 w-[440px] h-[480px] sm:w-[500px] sm:h-[520px] md:w-[580px] md:h-[600px] pointer-events-none transform scale-x-[-1] scale-y-[-1]">
        <svg
          className="w-full h-full"
          viewBox="0 0 600 600"
          preserveAspectRatio="xMinYMax slice"
          style={{
            maskImage:
              'radial-gradient(ellipse at 0% 32%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 65%, transparent 100%)',
            WebkitMaskImage:
              'radial-gradient(ellipse at 0% 32%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 65%, transparent 100%)',
          }}
        >
          <g>{arcPaths}</g>
          <g>{wavePaths}</g>
        </svg>
      </div>

      {/* Micro-Dot Security Print Grid Texture */}
      <div 
        className="absolute inset-0 opacity-[0.03] z-0"
        style={{
          backgroundImage: `radial-gradient(#0B1C3F 1px, transparent 1px)`,
          backgroundSize: '28px 28px'
        }}
      />
    </div>
  );
}

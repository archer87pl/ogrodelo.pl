import type { ReactNode } from "react";

function IllustrationWrapper({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <svg
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto max-h-[200px] sm:max-h-none drop-shadow-sm"
      role="img"
      aria-hidden="true"
    >
      <title>{title}</title>
      <ellipse cx="200" cy="155" rx="175" ry="130" fill="#e8f5e0" opacity="0.55" />
      {children}
    </svg>
  );
}

export function IrrigationIllustration() {
  return (
    <IllustrationWrapper title="Nawadnianie ogrodu">
      <path d="M30 230 Q120 215 200 222 Q280 230 370 218 L370 280 L30 280 Z" fill="#c8e6b8" />
      <g className="hero-float-slow">
        <rect x="188" y="218" width="5" height="16" rx="1" fill="#777" />
        <ellipse cx="190.5" cy="216" rx="9" ry="4" fill="#555" />
        <path d="M176 208 Q165 188 158 168" stroke="#6ec6e6" strokeWidth="2" strokeLinecap="round" className="hero-water-arc" />
        <path d="M190 205 Q188 182 186 160" stroke="#4ab8d8" strokeWidth="2.5" strokeLinecap="round" className="hero-water-arc" style={{ animationDelay: "0.2s" }} />
        <path d="M204 208 Q215 188 222 168" stroke="#6ec6e6" strokeWidth="2" strokeLinecap="round" className="hero-water-arc" style={{ animationDelay: "0.4s" }} />
        <circle cx="160" cy="172" r="3" fill="#6ec6e6" className="hero-drop" />
        <circle cx="186" cy="165" r="4" fill="#4ab8d8" className="hero-drop" style={{ animationDelay: "0.3s" }} />
        <circle cx="218" cy="170" r="3" fill="#6ec6e6" className="hero-drop" style={{ animationDelay: "0.5s" }} />
      </g>
      <rect x="52" y="198" width="30" height="40" rx="4" fill="#5a8a5a" />
      <rect x="48" y="194" width="38" height="7" rx="3" fill="#4a7a4a" />
      <text x="67" y="222" textAnchor="middle" fill="white" fontSize="8" fontWeight="600">H₂O</text>
      <g className="hero-sun-pulse" style={{ transformOrigin: "320px 55px" }}>
        <circle cx="320" cy="55" r="24" fill="#fde68a" />
        <circle cx="320" cy="55" r="17" fill="#fbbf24" opacity="0.6" />
      </g>
      <g className="hero-float">
        <rect x="268" y="72" width="100" height="72" rx="10" fill="white" stroke="#d4e4d4" strokeWidth="1.5" />
        <rect x="268" y="72" width="100" height="22" rx="10" fill="#2d6a2d" />
        <rect x="268" y="86" width="100" height="8" fill="#2d6a2d" />
        <text x="318" y="87" textAnchor="middle" fill="white" fontSize="9" fontWeight="600">mm/tydz.</text>
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={280 + i * 18} y={118 - [14, 24, 18, 28][i]} width="10" height={[14, 24, 18, 28][i]} rx="2" fill={i === 3 ? "#2d6a2d" : "#c8e6b8"} />
        ))}
      </g>
    </IllustrationWrapper>
  );
}

export function HedgeIllustration() {
  return (
    <IllustrationWrapper title="Żywopłot">
      <path d="M20 235 L380 235 L380 275 L20 275 Z" fill="#c8e6b8" />
      <g className="hero-float-slow">
        {Array.from({ length: 10 }).map((_, i) => (
          <g key={i}>
            <ellipse cx={55 + i * 34} cy={218} rx="16" ry="20" fill="#2d6a2d" opacity="0.9" />
            <ellipse cx={55 + i * 34} cy={205} rx="12" ry="14" fill="#4a9a4a" />
          </g>
        ))}
      </g>
      <g className="hero-float" style={{ animationDelay: "0.5s" }}>
        <rect x="155" y="88" width="90" height="52" rx="8" fill="white" stroke="#d4e4d4" strokeWidth="1.5" />
        <text x="200" y="110" textAnchor="middle" fill="#2d6a2d" fontSize="10" fontWeight="700">12 szt.</text>
        <text x="200" y="126" textAnchor="middle" fill="#6b7c6b" fontSize="8">co 30 cm</text>
        <line x1="160" y1="132" x2="240" y2="132" stroke="#4a9a4a" strokeWidth="2" />
        <line x1="160" y1="132" x2="160" y2="138" stroke="#4a9a4a" strokeWidth="2" />
        <line x1="240" y1="132" x2="240" y2="138" stroke="#4a9a4a" strokeWidth="2" />
      </g>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={100 + i * 90} y={248} width="4" height="22" fill="#8b7355" />
          <ellipse cx={102 + i * 90} cy={246} rx="8" ry="6" fill="#4a9a4a" />
        </g>
      ))}
    </IllustrationWrapper>
  );
}

export function PrivacyIllustration() {
  return (
    <IllustrationWrapper title="Prywatność ogrodu">
      <path d="M20 240 L380 240 L380 275 L20 275 Z" fill="#c8e6b8" />
      <rect x="40" y="195" width="8" height="45" fill="#8b7355" />
      <rect x="352" y="195" width="8" height="45" fill="#8b7355" />
      <rect x="35" y="210" width="330" height="4" fill="#a08060" />
      <rect x="35" y="225" width="330" height="4" fill="#a08060" />
      <g className="hero-float-slow">
        <rect x="175" y="140" width="12" height="100" rx="3" fill="#6b4c30" />
        <ellipse cx="181" cy="118" rx="42" ry="38" fill="#2d6a2d" />
        <ellipse cx="165" cy="132" rx="26" ry="22" fill="#4a9a4a" />
        <ellipse cx="198" cy="128" rx="24" ry="20" fill="#3d8b3d" />
      </g>
      <rect x="300" y="155" width="55" height="40" rx="2" fill="#d4c4a8" opacity="0.8" />
      <polygon points="300,155 327,130 355,155" fill="#b8a080" />
      <rect x="318" y="170" width="10" height="14" fill="#8b7355" />
      <rect x="335" y="165" width="12" height="10" fill="#6ec6e6" opacity="0.6" />
      <path d="M250 155 L290 175" stroke="#e85d75" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.7" />
      <text x="268" y="168" fill="#e85d75" fontSize="8">widok</text>
      <g className="hero-float">
        <rect x="55" y="100" width="70" height="36" rx="18" fill="white" stroke="#d4e4d4" />
        <text x="90" y="122" textAnchor="middle" fill="#2d6a2d" fontSize="9" fontWeight="700">1.8 m</text>
      </g>
    </IllustrationWrapper>
  );
}

export function FertilizationIllustration() {
  return (
    <IllustrationWrapper title="Nawożenie trawnika">
      <path d="M20 220 Q200 200 380 218 L380 275 L20 275 Z" fill="#c8e6b8" />
      {Array.from({ length: 8 }).map((_, i) => (
        <line key={i} x1={50 + i * 42} y1="228" x2={62 + i * 42} y2="268" stroke="#b5dba5" strokeWidth="1.5" opacity="0.4" />
      ))}
      <g className="hero-float-slow">
        <rect x="155" y="118" width="50" height="65" rx="6" fill="#5a8a3a" />
        <rect x="150" y="112" width="60" height="14" rx="4" fill="#4a7a2a" />
        <text x="180" y="155" textAnchor="middle" fill="white" fontSize="11" fontWeight="700">N</text>
        <text x="180" y="170" textAnchor="middle" fill="white" fontSize="7" opacity="0.8">PK</text>
      </g>
      <g className="hero-float" style={{ animationDelay: "0.6s" }}>
        <ellipse cx="120" cy="200" rx="18" ry="8" fill="#8b7355" opacity="0.5" />
        <ellipse cx="280" cy="195" rx="22" ry="9" fill="#8b7355" opacity="0.4" />
        <ellipse cx="200" cy="210" rx="20" ry="8" fill="#8b7355" opacity="0.45" />
      </g>
      <g className="hero-float">
        <rect x="255" y="85" width="95" height="58" rx="8" fill="white" stroke="#d4e4d4" strokeWidth="1.5" />
        <text x="302" y="108" textAnchor="middle" fill="#6b7c6b" fontSize="8">Harmonogram</text>
        {["Kwi", "Cze", "Wrz"].map((m, i) => (
          <g key={m}>
            <circle cx={275 + i * 22} cy="122" r="8" fill="#e8f5e0" stroke="#4a9a4a" strokeWidth="1.5" />
            <text x={275 + i * 22} y="125" textAnchor="middle" fill="#2d6a2d" fontSize="6">{m}</text>
          </g>
        ))}
      </g>
    </IllustrationWrapper>
  );
}

export function RainwaterIllustration() {
  return (
    <IllustrationWrapper title="Zbiornik na deszczówkę">
      <path d="M20 240 L380 240 L380 275 L20 275 Z" fill="#c8e6b8" />
      <polygon points="80,120 200,70 320,120" fill="#8b9aab" />
      <rect x="80" y="118" width="240" height="12" fill="#7a8a9a" />
      <path d="M130 130 Q125 160 120 195" stroke="#6ec6e6" strokeWidth="3" fill="none" opacity="0.7" />
      <path d="M200 130 L200 185" stroke="#6ec6e6" strokeWidth="3" opacity="0.7" />
      <g className="hero-float-slow">
        <rect x="175" y="175" width="50" height="65" rx="6" fill="#4a7a6a" />
        <rect x="170" y="168" width="60" height="10" rx="4" fill="#3a6a5a" />
        <rect x="185" y="195" width="30" height="35" rx="2" fill="#6ec6e6" opacity="0.5" />
        <text x="200" y="218" textAnchor="middle" fill="white" fontSize="8" fontWeight="600">m³</text>
      </g>
      <g className="hero-float" opacity="0.85">
        <ellipse cx="130" cy="75" rx="22" ry="14" fill="white" />
        <ellipse cx="150" cy="72" rx="18" ry="12" fill="white" />
        <ellipse cx="115" cy="73" rx="14" ry="10" fill="white" />
        <line x1="125" y1="88" x2="122" y2="100" stroke="#6ec6e6" strokeWidth="1.5" className="hero-rain" />
        <line x1="138" y1="86" x2="136" y2="98" stroke="#6ec6e6" strokeWidth="1.5" className="hero-rain" style={{ animationDelay: "0.3s" }} />
        <line x1="148" y1="88" x2="146" y2="102" stroke="#6ec6e6" strokeWidth="1.5" className="hero-rain" style={{ animationDelay: "0.6s" }} />
      </g>
      <g className="hero-float" style={{ animationDelay: "0.4s" }}>
        <rect x="285" y="95" width="80" height="50" rx="8" fill="white" stroke="#d4e4d4" strokeWidth="1.5" />
        <text x="325" y="118" textAnchor="middle" fill="#2d6a2d" fontSize="11" fontWeight="700">4200 l</text>
        <text x="325" y="132" textAnchor="middle" fill="#6b7c6b" fontSize="8">rocznie</text>
      </g>
    </IllustrationWrapper>
  );
}

export function ShadeIllustration() {
  return (
    <IllustrationWrapper title="Cień od drzewa">
      <path d="M20 230 L380 230 L380 275 L20 275 Z" fill="#c8e6b8" />
      <g className="hero-float-slow">
        <rect x="175" y="130" width="14" height="100" rx="4" fill="#6b4c30" />
        <ellipse cx="182" cy="105" rx="50" ry="42" fill="#3d8b3d" />
        <ellipse cx="160" cy="120" rx="30" ry="26" fill="#4a9a4a" />
        <ellipse cx="205" cy="115" rx="28" ry="24" fill="#2d6a2d" />
      </g>
      <ellipse cx="220" cy="245" rx="120" ry="25" fill="#2d6a2d" opacity="0.15" />
      <ellipse cx="240" cy="250" rx="90" ry="18" fill="#2d6a2d" opacity="0.1" />
      <g className="hero-sun-pulse" style={{ transformOrigin: "50px 60px" }}>
        <circle cx="50" cy="60" r="20" fill="#fde68a" />
        <circle cx="50" cy="60" r="14" fill="#fbbf24" opacity="0.6" />
      </g>
      <path d="M50 80 L180 200" stroke="#fbbf24" strokeWidth="1" strokeDasharray="4 3" opacity="0.5" />
      <g className="hero-float">
        <rect x="270" y="88" width="95" height="70" rx="8" fill="white" stroke="#d4e4d4" strokeWidth="1.5" />
        <text x="317" y="108" textAnchor="middle" fill="#6b7c6b" fontSize="8">m² cienia</text>
        {["L", "G", "W", "Z"].map((m, i) => (
          <rect key={m} x={282 + i * 18} y={140 - [12, 22, 18, 10][i]} width="12" height={[12, 22, 18, 10][i]} rx="2" fill={i === 1 ? "#2d6a2d" : "#c8e6b8"} />
        ))}
      </g>
    </IllustrationWrapper>
  );
}

export function GrowthIllustration() {
  return (
    <IllustrationWrapper title="Wzrost roślin">
      <path d="M20 250 L380 250 L380 275 L20 275 Z" fill="#c8e6b8" />
      <line x1="60" y1="60" x2="60" y2="250" stroke="#d4e4d4" strokeWidth="1" />
      {[0.6, 1.2, 2.0, 3.5, 5.0].map((h, i) => (
        <g key={h}>
          <line x1="52" y1={250 - h * 35} x2="68" y2={250 - h * 35} stroke="#4a9a4a" strokeWidth="1.5" />
          <text x="42" y={253 - h * 35} textAnchor="end" fill="#6b7c6b" fontSize="7">{h}m</text>
        </g>
      ))}
      <g className="hero-float-slow">
        <rect x="155" y={250 - 1.2 * 35} width="10" height={1.2 * 35} rx="3" fill="#6b4c30" />
        <ellipse cx="160" cy={250 - 1.2 * 35 - 18} rx="28" ry="24" fill="#4a9a4a" />
        <rect x="210" y={250 - 2.0 * 35} width="12" height={2.0 * 35} rx="3" fill="#6b4c30" />
        <ellipse cx="216" cy={250 - 2.0 * 35 - 28} rx="35" ry="30" fill="#2d6a2d" />
        <rect x="270" y={250 - 3.5 * 35} width="14" height={3.5 * 35} rx="3" fill="#6b4c30" />
        <ellipse cx="277" cy={250 - 3.5 * 35 - 38} rx="42" ry="36" fill="#3d8b3d" />
      </g>
      <g className="hero-float">
        <rect x="300" y="75" width="75" height="48" rx="8" fill="white" stroke="#d4e4d4" strokeWidth="1.5" />
        <text x="337" y="96" textAnchor="middle" fill="#2d6a2d" fontSize="8" fontWeight="700">10 lat</text>
        <text x="337" y="112" textAnchor="middle" fill="#6b7c6b" fontSize="8">5.0 m ↑</text>
      </g>
    </IllustrationWrapper>
  );
}

export function LawnIllustration() {
  return (
    <IllustrationWrapper title="Zakładanie trawnika">
      <path d="M20 220 Q200 205 380 218 L380 275 L20 275 Z" fill="#c8e6b8" />
      <g className="hero-float-slow">
        <rect x="130" y="130" width="55" height="70" rx="4" fill="#c4a060" />
        <rect x="125" y="124" width="65" height="12" rx="3" fill="#b09050" />
        <circle cx="157" cy="165" r="12" fill="#4a9a4a" opacity="0.3" />
        <text x="157" y="169" textAnchor="middle" fill="#2d6a2d" fontSize="8" fontWeight="600">🌱</text>
      </g>
      <g className="hero-float" style={{ animationDelay: "0.5s" }}>
        <path d="M220 200 Q240 185 260 200 L260 240 L220 240 Z" fill="#8b7355" opacity="0.5" />
        <text x="240" y="225" textAnchor="middle" fill="#6b4c30" fontSize="7">ziemia</text>
      </g>
      <ellipse cx="300" cy="215" rx="35" ry="12" fill="#6b4c30" opacity="0.3" />
      <rect x="285" y="205" width="30" height="8" rx="4" fill="#888" className="hero-float" />
      <line x1="270" y1="213" x2="330" y2="213" stroke="#666" strokeWidth="3" strokeLinecap="round" />
      <g className="hero-float">
        <rect x="55" y="88" width="80" height="48" rx="8" fill="white" stroke="#d4e4d4" strokeWidth="1.5" />
        <text x="95" y="110" textAnchor="middle" fill="#2d6a2d" fontSize="9" fontWeight="700">3.5 kg</text>
        <text x="95" y="124" textAnchor="middle" fill="#6b7c6b" fontSize="7">nasion</text>
      </g>
    </IllustrationWrapper>
  );
}

export function MowerIllustration() {
  return (
    <IllustrationWrapper title="Robot koszący">
      <path d="M20 225 Q200 210 380 218 L380 275 L20 275 Z" fill="#c8e6b8" />
      {Array.from({ length: 7 }).map((_, i) => (
        <line key={i} x1={60 + i * 48} y1="232" x2={72 + i * 48} y2="268" stroke="#b5dba5" strokeWidth="1.5" opacity="0.35" />
      ))}
      <g className="hero-float">
        <rect x="155" y="195" width="90" height="38" rx="12" fill="#3a3a3a" />
        <rect x="165" y="185" width="70" height="14" rx="5" fill="#2d6a2d" />
        <circle cx="175" cy="238" r="12" fill="#222" stroke="#444" strokeWidth="2" />
        <circle cx="225" cy="238" r="12" fill="#222" stroke="#444" strokeWidth="2" />
        <circle cx="200" cy="198" r="4" fill="#4ade80" className="hero-blink" />
        <rect x="178" y="205" width="44" height="3" rx="1" fill="#555" />
      </g>
      <g className="hero-float-slow" style={{ animationDelay: "0.8s" }}>
        <rect x="270" y="82" width="95" height="62" rx="8" fill="white" stroke="#d4e4d4" strokeWidth="1.5" />
        <text x="317" y="104" textAnchor="middle" fill="#6b7c6b" fontSize="8">Husqvarna</text>
        <text x="317" y="120" textAnchor="middle" fill="#2d6a2d" fontSize="10" fontWeight="700">92%</text>
        <text x="317" y="134" textAnchor="middle" fill="#6b7c6b" fontSize="7">dopasowanie</text>
      </g>
      <rect x="60" y="210" width="20" height="15" rx="3" fill="#8b7355" opacity="0.5" />
      <circle cx="330" cy="220" r="10" fill="#4a9a4a" opacity="0.4" />
    </IllustrationWrapper>
  );
}

export function TuiAlternativesIllustration() {
  return (
    <IllustrationWrapper title="Alternatywy dla tui">
      <path d="M20 240 L380 240 L380 275 L20 275 Z" fill="#c8e6b8" />
      <g opacity="0.45">
        <rect x="55" y="175" width="8" height="65" fill="#8b7355" />
        <path d="M59 175 L59 140 Q59 120 70 115 Q80 110 59 105 Q38 110 48 140 L48 175" fill="#8b9a6b" />
        <text x="59" y="200" textAnchor="middle" fill="#a05050" fontSize="14">✕</text>
        <text x="59" y="95" textAnchor="middle" fill="#6b7c6b" fontSize="7">tuja</text>
      </g>
      <path d="M130 160 L175 160" stroke="#4a9a4a" strokeWidth="2" markerEnd="url(#arrow-tui)" />
      <g className="hero-float-slow">
        <rect x="195" y="155" width="10" height="85" fill="#6b4c30" />
        <ellipse cx="200" cy="138" rx="32" ry="28" fill="#2d6a2d" />
        <ellipse cx="188" cy="148" rx="18" ry="16" fill="#1e4a1e" />
        <text x="200" y="118" textAnchor="middle" fill="#2d6a2d" fontSize="7" fontWeight="600">cis</text>
      </g>
      <g className="hero-float" style={{ animationDelay: "0.5s" }}>
        <rect x="270" y="165" width="8" height="75" fill="#6b4c30" />
        <ellipse cx="274" cy="152" rx="22" ry="20" fill="#4a9a4a" />
        <ellipse cx="264" cy="158" rx="10" ry="12" fill="#c85050" />
        <ellipse cx="284" cy="156" rx="9" ry="11" fill="#c85050" />
        <text x="274" y="135" textAnchor="middle" fill="#2d6a2d" fontSize="7" fontWeight="600">ostrokrzew</text>
      </g>
      <g className="hero-float">
        <rect x="310" y="78" width="68" height="44" rx="8" fill="white" stroke="#d4e4d4" strokeWidth="1.5" />
        <text x="344" y="98" textAnchor="middle" fill="#2d6a2d" fontSize="8" fontWeight="700">zdrowe</text>
        <text x="344" y="112" textAnchor="middle" fill="#4a9a4a" fontSize="8">✓ bez choroby</text>
      </g>
      <defs>
        <marker id="arrow-tui" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6" fill="#4a9a4a" />
        </marker>
      </defs>
    </IllustrationWrapper>
  );
}

export function TreeComparatorIllustration() {
  return (
    <IllustrationWrapper title="Porównywarka drzew">
      <path d="M20 250 L380 250 L380 275 L20 275 Z" fill="#c8e6b8" />
      <g className="hero-float-slow">
        <rect x="80" y="175" width="14" height="75" rx="3" fill="#6b4c30" />
        <ellipse cx="87" cy="155" rx="38" ry="32" fill="#2d6a2d" />
        <text x="87" y="148" textAnchor="middle" fill="white" fontSize="8" fontWeight="600">dąb</text>
      </g>
      <g className="hero-float" style={{ animationDelay: "0.4s" }}>
        <rect x="280" y="155" width="12" height="95" rx="3" fill="#5a4030" />
        <polygon points="286,145 268,175 304,175" fill="#3d6b3d" />
        <polygon points="286,125 262,160 310,160" fill="#2d6a2d" />
        <polygon points="286,105 256,145 316,145" fill="#4a8a4a" />
        <text x="286" y="98" textAnchor="middle" fill="#2d6a2d" fontSize="8" fontWeight="600">sosna</text>
      </g>
      <g className="hero-float">
        <rect x="155" y="95" width="90" height="52" rx="8" fill="white" stroke="#d4e4d4" strokeWidth="1.5" />
        <text x="200" y="115" textAnchor="middle" fill="#2d6a2d" fontSize="9" fontWeight="700">vs</text>
        <text x="200" y="132" textAnchor="middle" fill="#6b7c6b" fontSize="8">wzrost · woda · cień</text>
      </g>
      <path d="M130 200 L170 200" stroke="#4a9a4a" strokeWidth="2" markerEnd="url(#arrow-tree)" />
      <defs>
        <marker id="arrow-tree" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6" fill="#4a9a4a" />
        </marker>
      </defs>
    </IllustrationWrapper>
  );
}

export function ShrubComparatorIllustration() {
  return (
    <IllustrationWrapper title="Porównywarka krzewów">
      <path d="M20 250 L380 250 L380 275 L20 275 Z" fill="#c8e6b8" />
      <g className="hero-float-slow">
        <rect x="70" y="200" width="8" height="50" fill="#6b4c30" />
        <ellipse cx="74" cy="192" rx="28" ry="22" fill="#2d6a2d" />
        <text x="74" y="186" textAnchor="middle" fill="white" fontSize="7" fontWeight="600">laurowiśnia</text>
      </g>
      <g className="hero-float" style={{ animationDelay: "0.4s" }}>
        <rect x="290" y="205" width="7" height="45" fill="#5a4030" />
        <polygon points="293,198 278,218 308,218" fill="#3d6b3d" />
        <polygon points="293,185 272,210 314,210" fill="#2d6a2d" />
        <text x="293" y="178" textAnchor="middle" fill="#2d6a2d" fontSize="7" fontWeight="600">tuja</text>
      </g>
      <g className="hero-float">
        <rect x="155" y="100" width="90" height="48" rx="8" fill="white" stroke="#d4e4d4" strokeWidth="1.5" />
        <text x="200" y="120" textAnchor="middle" fill="#2d6a2d" fontSize="9" fontWeight="700">krzewy</text>
        <text x="200" y="136" textAnchor="middle" fill="#6b7c6b" fontSize="8">żywopłot · kwiaty</text>
      </g>
    </IllustrationWrapper>
  );
}

export function GardenPlanIllustration() {
  return (
    <IllustrationWrapper title="Generator planu ogrodu">
      <path d="M20 250 L380 250 L380 275 L20 275 Z" fill="#c8e6b8" />
      <rect x="40" y="180" width="120" height="70" rx="6" fill="#5a9a5a" opacity="0.5" stroke="#2d6a2d" strokeWidth="1" />
      <text x="100" y="218" textAnchor="middle" fill="#1e4a1e" fontSize="8" fontWeight="600">trawnik</text>
      <rect x="175" y="195" width="70" height="55" rx="6" fill="#e8c878" opacity="0.6" stroke="#c8a040" strokeWidth="1" />
      <text x="210" y="225" textAnchor="middle" fill="#6b5020" fontSize="7" fontWeight="600">warzywnik</text>
      <rect x="260" y="200" width="55" height="50" rx="6" fill="#d878a8" opacity="0.45" stroke="#a84878" strokeWidth="1" />
      <text x="287" y="228" textAnchor="middle" fill="#6b2040" fontSize="7" fontWeight="600">rabaty</text>
      <rect x="330" y="210" width="45" height="40" rx="6" fill="#8a8a8a" opacity="0.4" stroke="#5a5a5a" strokeWidth="1" />
      <text x="352" y="233" textAnchor="middle" fill="#3a3a3a" fontSize="6" fontWeight="600">relaks</text>
      <g className="hero-float">
        <rect x="130" y="75" width="140" height="55" rx="10" fill="white" stroke="#d4e4d4" strokeWidth="1.5" />
        <text x="200" y="98" textAnchor="middle" fill="#2d6a2d" fontSize="9" fontWeight="700">plan + kosztorys</text>
        <text x="200" y="115" textAnchor="middle" fill="#6b7c6b" fontSize="8">strefy · fazy · PLN</text>
      </g>
    </IllustrationWrapper>
  );
}

export function GardenCalendarIllustration() {
  return (
    <IllustrationWrapper title="Kalendarz ogrodnika">
      <path d="M20 250 L380 250 L380 275 L20 275 Z" fill="#c8e6b8" />
      <g className="hero-float-slow">
        <rect x="95" y="70" width="210" height="165" rx="12" fill="white" stroke="#d4e4d4" strokeWidth="2" />
        <rect x="95" y="70" width="210" height="36" rx="12" fill="#2d6a2d" />
        <rect x="95" y="94" width="210" height="12" fill="#2d6a2d" />
        <text x="200" y="93" textAnchor="middle" fill="white" fontSize="11" fontWeight="700">kalendarz ogrodnika</text>
        {[0, 1, 2, 3, 4, 5].map((col) => (
          <rect
            key={`h-${col}`}
            x={108 + col * 32}
            y={118}
            width={24}
            height={14}
            rx={3}
            fill="#e8f5e0"
          />
        ))}
        {[0, 1, 2, 3].map((row) =>
          [0, 1, 2, 3, 4, 5].map((col) => (
            <rect
              key={`c-${row}-${col}`}
              x={108 + col * 32}
              y={138 + row * 22}
              width={24}
              height={18}
              rx={3}
              fill={
                row === 1 && col === 4
                  ? "#4a9a4a"
                  : row === 2 && col === 2
                    ? "#7bc67b"
                    : row === 0 && col === 0
                      ? "#a8d4a8"
                      : "#f5faf2"
              }
              stroke="#d4e4d4"
              strokeWidth="0.5"
            />
          ))
        )}
        <circle cx="318" cy="155" r="22" fill="#e8f5e0" stroke="#4a9a4a" strokeWidth="1.5" />
        <path d="M318 142 L318 168 M305 155 L331 155" stroke="#4a9a4a" strokeWidth="2" strokeLinecap="round" />
      </g>
      <g className="hero-float" style={{ animationDelay: "0.3s" }}>
        <ellipse cx="55" cy="210" rx="18" ry="14" fill="#2d6a2d" />
        <rect x="52" y="210" width="6" height="25" fill="#6b4c30" />
      </g>
      <g className="hero-float" style={{ animationDelay: "0.6s" }}>
        <ellipse cx="345" cy="215" rx="14" ry="10" fill="#5a9a5a" />
        <rect x="342" y="215" width="5" height="20" fill="#6b4c30" />
      </g>
    </IllustrationWrapper>
  );
}

export function FloweringCatalogIllustration() {
  return (
    <IllustrationWrapper title="Katalog roślin kwitnących">
      <path d="M20 250 L380 250 L380 275 L20 275 Z" fill="#c8e6b8" />
      <g className="hero-float-slow">
        <rect x="60" y="90" width="280" height="130" rx="12" fill="white" stroke="#d4e4d4" strokeWidth="1.5" />
        <text x="200" y="115" textAnchor="middle" fill="#2d6a2d" fontSize="10" fontWeight="700">kwitnienie I – XII</text>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
          <rect key={i} x={72 + i * 22} y="125" width="16" height="18" rx="3" fill={i >= 4 && i <= 8 ? "#e8f5e0" : "#f5faf2"} stroke="#d4e4d4" strokeWidth="0.5" />
        ))}
        <text x="80" y="160" fill="#6b7c6b" fontSize="7">Lawenda</text>
        {[4, 5, 6, 7].map((i) => (
          <text key={`l-${i}`} x={75 + i * 22} y="175" textAnchor="middle" fontSize="8">🌸</text>
        ))}
        <text x="80" y="195" fill="#6b7c6b" fontSize="7">Budleja</text>
        {[5, 6, 7, 8].map((i) => (
          <text key={`b-${i}`} x={75 + i * 22} y="210" textAnchor="middle" fontSize="8">🌸</text>
        ))}
      </g>
      <g className="hero-float" style={{ animationDelay: "0.3s" }}>
        <circle cx="340" cy="120" r="28" fill="#fce7f3" stroke="#f472b6" strokeWidth="1" />
        <text x="340" y="125" textAnchor="middle" fontSize="16">🌸</text>
      </g>
    </IllustrationWrapper>
  );
}

export const CALCULATOR_ILLUSTRATIONS: Record<string, () => React.JSX.Element> = {
  "kalkulator-nawadniania": IrrigationIllustration,
  "kalkulator-zywoplotu": HedgeIllustration,
  "kalkulator-prywatnosci": PrivacyIllustration,
  "kalkulator-nawozenia": FertilizationIllustration,
  "kalkulator-deszczowki": RainwaterIllustration,
  "kalkulator-cienia": ShadeIllustration,
  "kalkulator-wzrostu": GrowthIllustration,
  "porownywarka-drzew": TreeComparatorIllustration,
  "porownywarka-krzewow": ShrubComparatorIllustration,
  "generator-planu-ogrodu": GardenPlanIllustration,
  "kalkulator-trawnika": LawnIllustration,
  "kalkulator-robota-koszacego": MowerIllustration,
  "alternatywy-dla-tui": TuiAlternativesIllustration,
  "kalendarz-ogrodnika": GardenCalendarIllustration,
  "katalog-kwitnienia": FloweringCatalogIllustration,
};

export function HeroGardenIllustration() {
  return (
    <div
      className="relative w-full max-w-lg mx-auto lg:max-w-none lg:mx-0"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 520 480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-sm"
        role="img"
      >
        <title>Ilustracja ogrodu — kalkulatory Ogrodelo.pl</title>

        {/* Soft background blob */}
        <ellipse cx="260" cy="240" rx="220" ry="200" fill="#e8f5e0" opacity="0.6" />

        {/* Ground / lawn */}
        <path
          d="M40 340 Q130 320 260 330 Q390 340 480 325 L480 400 L40 400 Z"
          fill="#c8e6b8"
        />
        <path
          d="M40 355 Q200 345 260 350 Q320 355 480 340"
          stroke="#a8d498"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.6"
        />

        {/* Lawn stripes */}
        {[80, 140, 200, 320, 380, 440].map((x) => (
          <line
            key={x}
            x1={x}
            y1="348"
            x2={x + 20}
            y2="395"
            stroke="#b5dba5"
            strokeWidth="1.5"
            opacity="0.4"
          />
        ))}

        {/* Fence left */}
        <g opacity="0.9">
          {[0, 1, 2, 3, 4].map((i) => (
            <rect
              key={i}
              x={58 + i * 22}
              y={290 - i * 2}
              width="6"
              height={55 + i * 2}
              rx="2"
              fill="#8b7355"
            />
          ))}
          <rect x="52" y="308" width="118" height="5" rx="2" fill="#a08060" />
          <rect x="52" y="328" width="118" height="5" rx="2" fill="#a08060" />
        </g>

        {/* Hedge row */}
        <g className="hero-float-slow">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <ellipse
              key={i}
              cx={200 + i * 28}
              cy={318 - Math.abs(i - 3.5) * 2}
              rx="18"
              ry="22"
              fill="#2d6a2d"
              opacity={0.85 + (i % 2) * 0.1}
            />
          ))}
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <ellipse
              key={`t-${i}`}
              cx={200 + i * 28}
              cy={302 - Math.abs(i - 3.5) * 2}
              rx="14"
              ry="16"
              fill="#4a9a4a"
            />
          ))}
        </g>

        {/* Big tree right */}
        <g className="hero-float-slow" style={{ animationDelay: "0.5s" }}>
          <rect x="398" y="268" width="14" height="75" rx="4" fill="#6b4c30" />
          <ellipse cx="405" cy="230" rx="55" ry="48" fill="#3d8b3d" />
          <ellipse cx="385" cy="248" rx="35" ry="30" fill="#4a9a4a" />
          <ellipse cx="425" cy="245" rx="32" ry="28" fill="#2d6a2d" />
          <ellipse cx="405" cy="215" rx="28" ry="24" fill="#5cb85c" opacity="0.7" />
        </g>

        {/* Small tree left */}
        <g className="hero-float-slow" style={{ animationDelay: "1s" }}>
          <rect x="118" y="295" width="10" height="50" rx="3" fill="#7a5c3a" />
          <circle cx="123" cy="275" r="32" fill="#4a9a4a" />
          <circle cx="110" cy="285" r="20" fill="#2d6a2d" opacity="0.8" />
          <circle cx="136" cy="282" r="18" fill="#5cb85c" opacity="0.7" />
        </g>

        {/* Flower bed */}
        <ellipse cx="155" cy="362" rx="45" ry="12" fill="#d4a574" opacity="0.5" />
        {[
          { x: 130, c: "#e85d75" },
          { x: 148, c: "#f4a261" },
          { x: 165, c: "#e9c46a" },
          { x: 180, c: "#e85d75" },
        ].map((f) => (
          <g key={f.x}>
            <line x1={f.x} y1="362" x2={f.x} y2="348" stroke="#4a9a4a" strokeWidth="2" />
            <circle cx={f.x} cy="344" r="6" fill={f.c} />
            <circle cx={f.x} cy="344" r="3" fill="#fff5cc" opacity="0.8" />
          </g>
        ))}

        {/* Sprinkler + water arcs */}
        <g className="hero-sprinkle">
          <rect x="288" y="368" width="4" height="18" rx="1" fill="#888" />
          <ellipse cx="290" cy="366" rx="8" ry="4" fill="#666" />
          <path
            d="M278 358 Q270 340 265 320"
            stroke="#6ec6e6"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.7"
            className="hero-water-arc"
          />
          <path
            d="M290 355 Q288 335 286 315"
            stroke="#6ec6e6"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.85"
            className="hero-water-arc"
            style={{ animationDelay: "0.2s" }}
          />
          <path
            d="M302 358 Q310 338 318 318"
            stroke="#6ec6e6"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.7"
            className="hero-water-arc"
            style={{ animationDelay: "0.4s" }}
          />
          {/* Water drops */}
          <circle cx="268" cy="325" r="3" fill="#6ec6e6" className="hero-drop" />
          <circle cx="286" cy="318" r="4" fill="#4ab8d8" className="hero-drop" style={{ animationDelay: "0.3s" }} />
          <circle cx="312" cy="322" r="3" fill="#6ec6e6" className="hero-drop" style={{ animationDelay: "0.6s" }} />
        </g>

        {/* Rain barrel */}
        <g>
          <rect x="72" y="330" width="36" height="48" rx="4" fill="#5a8a5a" />
          <rect x="68" y="326" width="44" height="8" rx="3" fill="#4a7a4a" />
          <path d="M68 330 Q60 300 50 285" stroke="#6ec6e6" strokeWidth="2.5" fill="none" opacity="0.6" />
          <text x="90" y="358" textAnchor="middle" fill="white" fontSize="9" fontWeight="600" opacity="0.9">
            H₂O
          </text>
        </g>

        {/* Floating calculator card */}
        <g className="hero-float">
          <rect x="330" y="88" width="148" height="118" rx="14" fill="white" stroke="#d4e4d4" strokeWidth="2" />
          <rect x="330" y="88" width="148" height="32" rx="14" fill="#2d6a2d" />
          <rect x="330" y="106" width="148" height="14" fill="#2d6a2d" />
          <text x="404" y="108" textAnchor="middle" fill="white" fontSize="11" fontWeight="600">
            Kalkulator
          </text>
          {/* Mini chart bars */}
          {[0, 1, 2, 3, 4].map((i) => (
            <rect
              key={i}
              x={348 + i * 22}
              y={168 - [20, 35, 28, 42, 24][i]}
              width="14"
              height={[20, 35, 28, 42, 24][i]}
              rx="3"
              fill={i === 3 ? "#2d6a2d" : "#c8e6b8"}
            />
          ))}
          {/* Result line */}
          <path d="M344 178 L392 155 L436 165" stroke="#4a9a4a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <circle cx="436" cy="165" r="4" fill="#2d6a2d" />
          {/* Icons row */}
          <text x="355" y="138" fontSize="14">💧</text>
          <text x="383" y="138" fontSize="14">🌿</text>
          <text x="411" y="138" fontSize="14">📊</text>
          <text x="439" y="138" fontSize="14">🌱</text>
        </g>

        {/* Sun */}
        <g className="hero-sun-pulse">
          <circle cx="88" cy="72" r="32" fill="#fde68a" opacity="0.9" />
          <circle cx="88" cy="72" r="24" fill="#fbbf24" opacity="0.6" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
            const rad = (angle * Math.PI) / 180;
            const x1 = 88 + Math.cos(rad) * 38;
            const y1 = 72 + Math.sin(rad) * 38;
            const x2 = 88 + Math.cos(rad) * 48;
            const y2 = 72 + Math.sin(rad) * 48;
            return (
              <line
                key={angle}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#fbbf24"
                strokeWidth="3"
                strokeLinecap="round"
                opacity="0.7"
              />
            );
          })}
        </g>

        {/* Cloud */}
        <g className="hero-float-slow" style={{ animationDelay: "2s" }} opacity="0.85">
          <ellipse cx="195" cy="62" rx="28" ry="18" fill="white" />
          <ellipse cx="220" cy="58" rx="22" ry="16" fill="white" />
          <ellipse cx="172" cy="60" rx="20" ry="14" fill="white" />
          <ellipse cx="198" cy="52" rx="18" ry="12" fill="white" />
          {/* Rain from cloud */}
          <line x1="188" y1="78" x2="185" y2="92" stroke="#6ec6e6" strokeWidth="1.5" opacity="0.5" className="hero-rain" />
          <line x1="200" y1="76" x2="198" y2="90" stroke="#6ec6e6" strokeWidth="1.5" opacity="0.5" className="hero-rain" style={{ animationDelay: "0.2s" }} />
          <line x1="212" y1="78" x2="210" y2="93" stroke="#6ec6e6" strokeWidth="1.5" opacity="0.5" className="hero-rain" style={{ animationDelay: "0.4s" }} />
        </g>

        {/* Mower robot */}
        <g className="hero-float" style={{ animationDelay: "1.5s" }}>
          <rect x="355" y="368" width="42" height="24" rx="8" fill="#444" />
          <rect x="360" y="362" width="32" height="10" rx="4" fill="#2d6a2d" />
          <circle cx="364" cy="394" r="7" fill="#333" stroke="#555" strokeWidth="2" />
          <circle cx="388" cy="394" r="7" fill="#333" stroke="#555" strokeWidth="2" />
          <circle cx="376" cy="370" r="3" fill="#4ade80" className="hero-blink" />
        </g>

        {/* Tui replacement arrow badge */}
        <g className="hero-float-slow" style={{ animationDelay: "0.8s" }}>
          <rect x="168" y="118" width="110" height="44" rx="22" fill="white" stroke="#d4e4d4" strokeWidth="1.5" />
          <text x="223" y="136" textAnchor="middle" fill="#6b7c6b" fontSize="9">
            zamiast
          </text>
          <text x="223" y="152" textAnchor="middle" fill="#2d6a2d" fontSize="11" fontWeight="700">
            tui → cis
          </text>
          <path d="M148 140 L162 140" stroke="#4a9a4a" strokeWidth="2" markerEnd="url(#arrow)" />
        </g>

        {/* Floating leaves */}
        <g className="hero-leaf" style={{ animationDelay: "0s" }}>
          <path d="M240 120 Q248 110 256 120 Q248 128 240 120" fill="#4a9a4a" opacity="0.7" />
        </g>
        <g className="hero-leaf" style={{ animationDelay: "1.2s" }}>
          <path d="M450 200 Q458 190 466 200 Q458 208 450 200" fill="#2d6a2d" opacity="0.6" />
        </g>
        <g className="hero-leaf" style={{ animationDelay: "2.4s" }}>
          <path d="M160 220 Q168 210 176 220 Q168 228 160 220" fill="#5cb85c" opacity="0.5" />
        </g>

        <defs>
          <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6" fill="#4a9a4a" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

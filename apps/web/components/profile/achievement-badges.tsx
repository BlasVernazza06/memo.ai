export function FirstQuizBadge({ unlocked }: { unlocked: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFE066" />
          <stop offset="50%" stopColor="#F5B041" />
          <stop offset="100%" stopColor="#DC7633" />
        </linearGradient>
        <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#EC7063" />
          <stop offset="100%" stopColor="#B03A2E" />
        </linearGradient>
      </defs>
      {/* Ribbons */}
      <path
        d="M35,50 L35,85 L50,75 L65,85 L65,50 Z"
        fill="url(#ribbonGrad)"
        filter="drop-shadow(0px 3px 2px rgba(0,0,0,0.15))"
      />
      <path d="M45,50 L45,88 L50,83 L55,88 L55,50 Z" fill="#E74C3C" />

      {/* Outer Gold Ring */}
      <circle
        cx="50"
        cy="45"
        r="32"
        fill="url(#goldGrad)"
        filter="drop-shadow(0px 4px 4px rgba(0,0,0,0.2))"
      />
      <circle cx="50" cy="45" r="26" fill="#F39C12" />
      <circle cx="50" cy="45" r="22" fill="url(#goldGrad)" />

      {/* Star Detail */}
      <path
        d="M50,30 L54,39 L64,40 L56,47 L59,57 L50,51 L41,57 L44,47 L36,40 L46,39 Z"
        fill="#FFF"
        opacity={unlocked ? 0.9 : 0.4}
      />

      {/* Gloss Sparkles */}
      {unlocked && (
        <>
          <circle cx="32" cy="28" r="3" fill="#FFF" opacity="0.8" />
          <circle cx="68" cy="60" r="2" fill="#FFF" opacity="0.8" />
        </>
      )}
    </svg>
  );
}

export function Quiz10Badge({ unlocked }: { unlocked: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D2B4DE" />
          <stop offset="50%" stopColor="#AF7AC5" />
          <stop offset="100%" stopColor="#76448A" />
        </linearGradient>
        <linearGradient id="brainGlow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#EBDEF0" />
          <stop offset="100%" stopColor="#AF7AC5" />
        </linearGradient>
      </defs>
      {/* Tech Hexagon Background */}
      <polygon
        points="50,12 85,32 85,72 50,92 15,72 15,32"
        fill="url(#purpleGrad)"
        filter="drop-shadow(0px 4px 5px rgba(0,0,0,0.2))"
      />
      <polygon points="50,17 80,34 80,69 50,86 20,69 20,34" fill="#5B2C6F" />

      {/* Brain Robot Silhouette */}
      <rect
        x="36"
        y="44"
        width="28"
        height="26"
        rx="6"
        fill="url(#brainGlow)"
      />
      {/* Left and Right Brain lobes */}
      <circle cx="40" cy="40" r="14" fill="url(#brainGlow)" />
      <circle cx="60" cy="40" r="14" fill="url(#brainGlow)" />
      <circle cx="43" cy="48" r="11" fill="#EBDEF0" />
      <circle cx="57" cy="48" r="11" fill="#EBDEF0" />

      {/* Eyes */}
      <circle cx="42" cy="54" r="3" fill="#8E44AD" />
      <circle cx="58" cy="54" r="3" fill="#8E44AD" />
      {unlocked && (
        <>
          <circle cx="43" cy="53" r="1" fill="#FFF" />
          <circle cx="59" cy="53" r="1" fill="#FFF" />
        </>
      )}

      {/* Sparkles */}
      {unlocked && (
        <path
          d="M50,22 L52,28 L58,30 L52,32 L50,38 L48,32 L42,30 L48,28 Z"
          fill="#FFF"
          opacity="0.9"
        />
      )}
    </svg>
  );
}

export function FirstDeckBadge({ unlocked }: { unlocked: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#AED6F1" />
          <stop offset="50%" stopColor="#5DADE2" />
          <stop offset="100%" stopColor="#2E86C1" />
        </linearGradient>
      </defs>
      {/* Rounded Badge Base */}
      <rect
        x="15"
        y="15"
        width="70"
        height="70"
        rx="22"
        fill="url(#blueGrad)"
        filter="drop-shadow(0px 4px 4px rgba(0,0,0,0.2))"
      />
      <rect x="20" y="20" width="60" height="60" rx="17" fill="#1B4F72" />

      {/* Book / Flashcard Silhouette */}
      <rect
        x="30"
        y="32"
        width="40"
        height="42"
        rx="4"
        fill="#FFF"
        transform="rotate(-8 50 50)"
      />
      <rect
        x="34"
        y="28"
        width="40"
        height="42"
        rx="4"
        fill="url(#blueGrad)"
        filter="drop-shadow(0px 2px 3px rgba(0,0,0,0.2))"
      />

      {/* Star Accent */}
      <path
        d="M54,40 L56,45 L61,46 L57,50 L58,55 L54,52 L50,55 L51,50 L47,46 L52,45 Z"
        fill="#FFF"
        opacity={unlocked ? 0.95 : 0.4}
      />
    </svg>
  );
}

export function Deck100CardsBadge({ unlocked }: { unlocked: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FADBD8" />
          <stop offset="50%" stopColor="#F5B041" />
          <stop offset="100%" stopColor="#D35400" />
        </linearGradient>
      </defs>
      {/* Shield Base */}
      <path
        d="M50,12 L85,25 L80,65 L50,90 L20,65 L15,25 Z"
        fill="url(#orangeGrad)"
        filter="drop-shadow(0px 4px 5px rgba(0,0,0,0.2))"
      />
      <path d="M50,17 L79,28 L75,62 L50,84 L25,62 L21,28 Z" fill="#6E2C00" />

      {/* Elephant of Memory */}
      <path
        d="M35,62 C35,42 45,35 60,35 C68,35 72,40 72,48 C72,55 68,58 62,58 L54,58 C50,58 48,60 48,64 L48,68 C48,70 45,72 42,72 L38,72 Z"
        fill="url(#orangeGrad)"
      />
      <circle cx="58" cy="45" r="2.5" fill="#5D4037" />

      {/* Trunk details */}
      <path
        d="M35,60 C32,60 28,55 28,48 C28,42 32,40 35,40"
        stroke="#F5B041"
        strokeWidth="3"
        fill="none"
      />
    </svg>
  );
}

export function Streak3Badge({ unlocked }: { unlocked: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D4EFDF" />
          <stop offset="50%" stopColor="#52BE80" />
          <stop offset="100%" stopColor="#1E8449" />
        </linearGradient>
        <linearGradient id="leafGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ABEBC6" />
          <stop offset="100%" stopColor="#27AE60" />
        </linearGradient>
      </defs>
      {/* Leaf Circle Base */}
      <circle
        cx="50"
        cy="50"
        r="38"
        fill="url(#greenGrad)"
        filter="drop-shadow(0px 4px 4px rgba(0,0,0,0.15))"
      />
      <circle cx="50" cy="50" r="32" fill="#145A32" />

      {/* Triple Leaf Flame */}
      <path
        d="M50,22 C50,22 64,36 64,48 C64,60 50,70 50,70 C50,70 36,60 36,48 C36,36 50,22 50,22 Z"
        fill="url(#leafGrad)"
      />
      <path
        d="M50,28 C50,28 60,40 60,48 C60,56 50,64 50,64 C50,64 40,56 40,48 C40,40 50,28 50,28 Z"
        fill="#D4EFDF"
        opacity="0.3"
      />

      {/* Sprout Detail */}
      <path
        d="M32,48 C32,48 40,44 44,52 C44,52 38,58 32,48 Z"
        fill="url(#greenGrad)"
        transform="rotate(-15 32 48)"
      />
      <path
        d="M68,48 C68,48 60,44 56,52 C56,52 62,58 68,48 Z"
        fill="url(#greenGrad)"
        transform="rotate(15 68 48)"
      />
    </svg>
  );
}

export function Streak7Badge({ unlocked }: { unlocked: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <linearGradient id="hotGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FADBD8" />
          <stop offset="50%" stopColor="#E74C3C" />
          <stop offset="100%" stopColor="#78281F" />
        </linearGradient>
        <linearGradient id="fireGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F9E79F" />
          <stop offset="40%" stopColor="#F39C12" />
          <stop offset="100%" stopColor="#E74C3C" />
        </linearGradient>
      </defs>
      {/* Burning Badge Circle */}
      <circle
        cx="50"
        cy="50"
        r="38"
        fill="url(#hotGrad)"
        filter="drop-shadow(0px 4px 5px rgba(0,0,0,0.25))"
      />
      <circle cx="50" cy="50" r="33" fill="#4A121A" />

      {/* 3D Flame Shape */}
      <path
        d="M50,20 C50,20 68,40 68,54 C68,68 50,78 50,78 C50,78 32,68 32,54 C32,40 50,20 50,20 Z"
        fill="url(#fireGrad)"
        filter="drop-shadow(0px 3px 2px rgba(0,0,0,0.2))"
      />
      <path
        d="M50,35 C50,35 60,48 60,56 C60,64 50,70 50,70 C50,70 40,64 40,56 C40,48 50,35 50,35 Z"
        fill="#FCF3CF"
      />

      {/* Magic Sparkle */}
      {unlocked && (
        <path
          d="M68,26 L70,31 L75,32 L71,35 L72,40 L68,37 L64,40 L65,35 L61,32 L66,31 Z"
          fill="#FFF"
        />
      )}
    </svg>
  );
}

export function Streak30Badge({ unlocked }: { unlocked: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <linearGradient id="pinkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FADBD8" />
          <stop offset="50%" stopColor="#EC407A" />
          <stop offset="100%" stopColor="#880E4F" />
        </linearGradient>
        <linearGradient id="electricGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E8F8F5" />
          <stop offset="50%" stopColor="#48C9B0" />
          <stop offset="100%" stopColor="#8E44AD" />
        </linearGradient>
      </defs>
      {/* Electric Star polygon */}
      <polygon
        points="50,8 63,35 92,38 70,58 77,87 50,72 23,87 30,58 8,38 37,35"
        fill="url(#pinkGrad)"
        filter="drop-shadow(0px 4px 5px rgba(0,0,0,0.3))"
      />
      <polygon
        points="50,15 60,37 84,40 66,56 72,80 50,67 28,80 34,56 16,40 40,37"
        fill="#4A0E2E"
      />

      {/* Lightning Lobe Flame */}
      <path
        d="M50,22 C50,22 64,38 64,50 C64,62 50,70 50,70 C50,70 36,62 36,50 C36,38 50,22 50,22 Z"
        fill="url(#electricGrad)"
      />
      {/* Lightning Bolt */}
      <polygon points="50,28 55,42 46,44 52,58 43,58 48,46 52,46" fill="#FFF" />
    </svg>
  );
}

export function WorkspaceFirstBadge({ unlocked }: { unlocked: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E0F7FA" />
          <stop offset="50%" stopColor="#00ACC1" />
          <stop offset="100%" stopColor="#006064" />
        </linearGradient>
      </defs>
      {/* Squircle Base */}
      <rect
        x="15"
        y="15"
        width="70"
        height="70"
        rx="25"
        fill="url(#cyanGrad)"
        filter="drop-shadow(0px 4px 4px rgba(0,0,0,0.18))"
      />
      <rect x="20" y="20" width="60" height="60" rx="20" fill="#00363A" />

      {/* Flagpole and Flag */}
      <rect x="28" y="26" width="4" height="48" rx="2" fill="#D7CCC8" />
      <path
        d="M32,28 L68,36 L68,52 L32,44 Z"
        fill="url(#cyanGrad)"
        filter="drop-shadow(0px 2px 2px rgba(0,0,0,0.15))"
      />
      <path
        d="M32,32 L60,38 L60,48 L32,42 Z"
        fill="#FFF"
        opacity={unlocked ? 0.95 : 0.4}
      />
    </svg>
  );
}

export function Workspace5Badge({ unlocked }: { unlocked: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <linearGradient id="indigoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E8EAF6" />
          <stop offset="50%" stopColor="#3F51B5" />
          <stop offset="100%" stopColor="#1A237E" />
        </linearGradient>
      </defs>
      {/* Squircle Base */}
      <rect
        x="15"
        y="15"
        width="70"
        height="70"
        rx="25"
        fill="url(#indigoGrad)"
        filter="drop-shadow(0px 4px 4px rgba(0,0,0,0.18))"
      />
      <rect x="20" y="20" width="60" height="60" rx="20" fill="#0D1330" />

      {/* 3D Columns Triumphal Arch */}
      {/* Pediment */}
      <polygon points="30,36 70,36 50,26" fill="url(#indigoGrad)" />
      <rect x="28" y="36" width="44" height="4" rx="1" fill="#C5CAE9" />
      {/* Pillars */}
      <rect
        x="34"
        y="40"
        width="6"
        height="28"
        rx="1"
        fill="url(#indigoGrad)"
      />
      <rect
        x="60"
        y="40"
        width="6"
        height="28"
        rx="1"
        fill="url(#indigoGrad)"
      />
      <rect
        x="47"
        y="44"
        width="6"
        height="24"
        rx="1"
        fill="url(#indigoGrad)"
        opacity="0.7"
      />
      {/* Base */}
      <rect x="26" y="68" width="48" height="6" rx="2" fill="#C5CAE9" />
    </svg>
  );
}

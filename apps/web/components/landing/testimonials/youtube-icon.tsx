import { motion } from 'motion/react';

export default function YoutubeIcon() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: [0, -10, 0],
      }}
      transition={{
        opacity: { duration: 1 },
        x: { duration: 1 },
        y: {
          repeat: Infinity,
          duration: 4,
          ease: 'easeInOut',
        },
      }}
      className="absolute -right-6 bottom-6 z-20 hidden xl:block"
    >
      <div className="w-16 h-16 rotate-12 rounded-[1.5rem] bg-white dark:bg-zinc-800 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] border border-white dark:border-zinc-700 flex items-center justify-center group overflow-visible">
        <svg
          width="42"
          height="42"
          viewBox="0 0 42 42"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id="ytGradient"
              x1="0"
              y1="0"
              x2="42"
              y2="42"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FF4B4B" />
              <stop offset="1" stopColor="#D40000" />
            </linearGradient>
          </defs>
          <rect
            x="2"
            y="7"
            width="38"
            height="28"
            rx="8"
            fill="url(#ytGradient)"
          />
          <path
            d="M28 21L17 27.35V14.65L28 21Z"
            fill="white"
            style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.2))' }}
          />
        </svg>
      </div>
    </motion.div>
  );
}

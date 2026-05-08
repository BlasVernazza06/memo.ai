import { motion } from 'motion/react';

export default function ChatIcon() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
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
      className="absolute -left-12 top-1/4 z-20 hidden xl:block"
    >
      <div className="w-16 h-16 -rotate-12 rounded-[1.5rem] bg-white dark:bg-zinc-800 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] border border-white dark:border-zinc-700 flex items-center justify-center relative overflow-visible group">
        {/* Custom 3D-like Chat SVG */}
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id="chatGradient"
              x1="0"
              y1="0"
              x2="40"
              y2="40"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#3B82F6" />
              <stop offset="1" stopColor="#2563EB" />
            </linearGradient>
          </defs>
          <path
            d="M34 16C34 23.1797 27.732 29 20 29C18.6677 29 17.3879 28.8273 16.2001 28.5L10 32V25.5C7.54581 23.3662 6 20.3701 6 17C6 9.8203 12.268 4 20 4C27.732 4 34 9.8203 34 16Z"
            fill="url(#chatGradient)"
          />
          <rect
            x="13"
            y="14"
            width="14"
            height="2.5"
            rx="1.25"
            fill="white"
            fillOpacity="0.4"
          />
          <rect
            x="13"
            y="19"
            width="8"
            height="2.5"
            rx="1.25"
            fill="white"
            fillOpacity="0.4"
          />
        </svg>
        <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-primary border-2 border-white dark:border-zinc-800 shadow-sm animate-pulse" />
      </div>
    </motion.div>
  );
}

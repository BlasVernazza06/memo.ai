import Link from 'next/link';

import { ChevronRight, LucideIcon } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface HelpCategoryCardProps {
  title: string;
  desc: string;
  icon: LucideIcon;
  color: string;
  bg: string;
  slug: string;
  index: number;
}

export default function HelpCategoryCard({
  title,
  desc,
  icon: Icon,
  slug,
  index,
}: HelpCategoryCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 300,
    damping: 30,
  });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXRelative = e.clientX - rect.left;
    const mouseYRelative = e.clientY - rect.top;

    mouseX.set(mouseXRelative / width - 0.5);
    mouseY.set(mouseYRelative / height - 0.5);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <Link href={`/dashboard/help/${slug}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05, duration: 0.5, ease: 'easeOut' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="group relative cursor-pointer h-full"
      >
        {/* Glow Effect */}
        <div
          className={`absolute -inset-[3px] rounded-4xl bg-linear-to-br from-primary/40 via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-[20px]`}
        />

        <div className="relative h-full bg-card/60 backdrop-blur-xl border border-border/50 rounded-4xl p-8 shadow-sm group-hover:shadow-2xl group-hover:shadow-primary/20 group-hover:border-primary/50 transition-all duration-500 flex flex-col overflow-hidden">
          {/* Inner Blur / Inset Glow (Blurreo previo) */}
          <div className="absolute inset-0 pointer-events-none rounded-4xl ring-1 ring-inset ring-white/10 opacity-0 group-hover:opacity-100 transition-opacity shadow-[inset_0_0_20px_rgba(var(--primary),0.1)]" />
          
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 bg-primary/5 text-primary`}
          >
            <motion.div style={{ z: 20 }}>
              <Icon className="w-7 h-7" />
            </motion.div>
          </div>

          <motion.h3
            className="text-xl font-bold text-foreground mb-3 tracking-tight transition-colors group-hover:text-primary"
            style={{ z: 10 }}
          >
            {title}
          </motion.h3>

          <p className="text-muted-foreground text-sm font-medium leading-relaxed mb-8 flex-grow">
            {desc}
          </p>

          <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-[0.2em] translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            Explorar <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

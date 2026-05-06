'use client';

import { motion } from 'motion/react';
import { Clock, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import type { Workspace } from '../../types/workspaces';

export default function RecentWorkspaces({ workspaces }: { workspaces: Workspace[] }) {
  // Solo mostramos los 3 más recientes que tengan actividad
  const recent = workspaces.slice(0, 3);

  if (recent.length === 0) return null;

  return (
    <section className="space-y-8 text-foreground">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-foreground text-background rounded-lg flex items-center justify-center">
          <Clock className="w-4 h-4" />
        </div>
        <h2 className="text-xl font-black text-foreground tracking-tight italic">Continuar</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recent.map((ws, idx) => (
          <Link key={ws.id} href={`/dashboard/workspaces/${ws.id}`}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -4, borderColor: 'var(--primary)' }}
              className="group bg-card border border-border p-5 rounded-3xl shadow-sm hover:shadow-[0_20px_50px_rgba(var(--primary),0.05)] transition-all flex items-center gap-4"
            >
              <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${ws.color || 'from-primary to-blue-600'} opacity-90 shrink-0 flex items-center justify-center text-white shadow-sm font-black`}>
                {ws.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-foreground truncate group-hover:text-primary transition-colors text-sm italic">{ws.name}</h3>
                <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest truncate">
                  {ws.lastActive || 'Reciente'}
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
}

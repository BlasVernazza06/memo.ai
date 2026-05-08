'use client';

import { motion } from 'motion/react';
import { Brain, FileText, Sparkles, Trophy } from 'lucide-react';

export function BrowserMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100, rotateX: 15, rotateY: -10 }}
      animate={{ opacity: 1, y: 0, rotateX: 10, rotateY: -5 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ rotateX: 5, rotateY: -2, scale: 1.01 }}
      className="relative z-20 w-full aspect-[16/10] bg-[#0F1115] rounded-[2rem] border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] overflow-hidden"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Premium Browser Header */}
      <div className="h-14 bg-white/[0.03] border-b border-white/[0.08] px-8 flex items-center justify-between backdrop-blur-md">
        <div className="flex gap-2.5">
          <div className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] shadow-[0_0_10px_rgba(255,95,86,0.3)]" />
          <div className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] shadow-[0_0_10px_rgba(255,189,46,0.2)]" />
          <div className="w-3.5 h-3.5 rounded-full bg-[#27C93F] shadow-[0_0_10px_rgba(39,201,63,0.3)]" />
        </div>
        <div className="flex items-center gap-2.5 px-6 py-1.5 bg-white/5 border border-white/5 rounded-2xl text-[10px] uppercase font-black tracking-widest text-white/40">
          <Brain className="w-3 h-3 text-primary" />
          <span>memo.ai / dashboard / neurociencia</span>
        </div>
        <div className="flex -space-x-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0F1115] bg-white/10" />
          ))}
        </div>
      </div>

      {/* Dashboard App Grid Mockup */}
      <div className="h-full w-full grid grid-cols-12 overflow-hidden">
        {/* Sidebar Partial */}
        <div className="col-span-3 border-r border-white/5 p-8 space-y-12">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
               <Sparkles className="w-5 h-5 text-white" />
             </div>
             <div className="space-y-1.5">
               <div className="h-3 w-20 bg-white/20 rounded-full" />
               <div className="h-2 w-12 bg-white/10 rounded-full" />
             </div>
          </div>
          
          <div className="space-y-6">
            <div className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em] px-2">Bibliotecas</div>
            {[1, 2, 3].map(i => (
              <div key={i} className={`flex items-center gap-3 p-3 rounded-2xl transition-colors ${i === 1 ? 'bg-white/10 border border-white/5 shadow-xl' : 'hover:bg-white/5'}`}>
                <div className={`w-8 h-8 rounded-lg ${i === 1 ? 'bg-primary/20 text-primary' : 'bg-white/5 text-white/40'} flex items-center justify-center`}>
                  <FileText className="w-4 h-4" />
                </div>
                <div className={`h-2.5 w-24 rounded-full ${i === 1 ? 'bg-white/40' : 'bg-white/10'}`} />
              </div>
            ))}
          </div>
        </div>
        
        {/* Main Area Preview */}
        <div className="col-span-9 p-12 bg-[#0F1115] relative">
          {/* Header within app */}
          <div className="flex items-center justify-between mb-12">
             <div className="space-y-2">
               <p className="text-[10px] font-black text-primary uppercase tracking-widest">Workspace Activo</p>
               <h4 className="text-3xl font-black text-white">Neurociencia Sistémica</h4>
             </div>
             <div className="flex items-center gap-4">
               <div className="px-5 py-2.5 bg-white/5 border border-white/5 rounded-2xl text-[11px] font-bold text-white/60">Editar</div>
               <div className="px-5 py-2.5 bg-primary text-white rounded-2xl text-[11px] font-bold shadow-2xl shadow-primary/40">Generar Quiz</div>
             </div>
          </div>

          <div className="grid grid-cols-12 gap-10">
            {/* Active Document Card */}
            <div className="col-span-8 space-y-8">
               <div className="bg-white/5 border border-white/5 rounded-[2.5rem] p-10 backdrop-blur-xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8">
                    <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-primary animate-pulse">
                      <Sparkles className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                       <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                         <FileText className="w-6 h-6 text-white/60" />
                       </div>
                       <div className="space-y-2">
                         <div className="h-4 w-40 bg-white/40 rounded-full" />
                         <div className="h-2 w-20 bg-white/10 rounded-full" />
                       </div>
                    </div>
                    
                    <div className="pt-8 space-y-4">
                      <h3 className="text-2xl font-bold text-white leading-tight">¿Cómo se propagan los potenciales de acción en el axón?</h3>
                      <div className="h-24 w-full bg-white/5 border border-white/5 rounded-3xl p-6 flex flex-col justify-center">
                         <div className="h-3 w-full bg-white/10 rounded-full mb-3" />
                         <div className="h-3 w-2/3 bg-white/10 rounded-full" />
                      </div>
                    </div>
                  </div>
               </div>
            </div>

            {/* Sidebar stats cards */}
            <div className="col-span-4 space-y-8 pt-4">
               <div className="bg-primary rounded-[2.5rem] p-10 shadow-2xl shadow-primary/20 group">
                  <Trophy className="w-10 h-10 text-white mb-6 transition-transform group-hover:scale-110" />
                  <div className="space-y-2">
                    <div className="text-4xl font-black text-white">98%</div>
                    <div className="text-[10px] font-black text-white/40 uppercase tracking-widest">Dominio alcanzado</div>
                  </div>
               </div>
               <div className="bg-white/5 border border-white/5 rounded-[2.5rem] p-8 space-y-6">
                  <div className="flex -space-x-3">
                     {[1, 2, 3, 4].map(i => (
                       <div key={i} className="w-10 h-10 rounded-full border-4 border-[#0F1115] bg-white/10" />
                     ))}
                     <div className="w-10 h-10 rounded-full border-4 border-[#0F1115] bg-primary flex items-center justify-center text-[10px] font-black text-white">+12</div>
                  </div>
                  <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden">
                     <div className="h-full bg-primary w-[85%]" />
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

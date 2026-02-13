'use client';

import { BookOpen, FileText, Plus, Sparkles } from "lucide-react";
import { motion } from "motion/react";

export default function DashHero() {
    return (
        <section>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 px-8 py-12 md:px-16 md:py-20 text-white shadow-2xl"
                >
                    {/* Background Sprinkles */}
                    <div className="absolute top-0 right-0 w-[600px] h-full overflow-hidden pointer-events-none opacity-40">
                        <div className="absolute top-[-20%] right-[-10%] w-[400px] h-[400px] bg-primary rounded-full blur-[100px]" />
                        <div className="absolute bottom-[-20%] right-[10%] w-[300px] h-[300px] bg-blue-400 rounded-full blur-[80px]" />
                    </div>

                    <div className="relative z-10 max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-wider mb-6"
                        >
                            <Sparkles className="w-3.5 h-3.5 text-blue-300" />
                            <span>Bienvenido de vuelta, Blas</span>
                        </motion.div>

                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-[1.1]">
                            ¿Qué vamos a <span className="text-primary italic">aprender</span> hoy?
                        </h1>
                        
                        <p className="text-slate-300 text-lg md:text-xl font-medium mb-10 max-w-lg leading-relaxed">
                            Transforma tus apuntes en conocimiento interactivo. Crea un nuevo workspace para empezar a estudiar con IA.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <motion.button 
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                className="group bg-primary text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-primary/30 flex items-center gap-3 text-md transition-all active:shadow-inner"
                            >
                                <Plus className="w-6 h-6" />
                                Nuevo Workspace
                            </motion.button>
                            
                            <motion.button 
                                whileHover={{ backgroundColor: "rgba(255,255,255,0.08)" }}
                                className="bg-white/5 backdrop-blur-sm border border-white/10 px-8 py-4 rounded-2xl font-bold transition-all flex items-center gap-3 text-md"
                            >
                                <BookOpen className="w-5 h-5 text-slate-400" />
                                Tutorial rápido
                            </motion.button>
                        </div>
                    </div>

                    {/* Decorative Image/Element */}
                    <div className="hidden lg:block absolute right-16 top-1/2 -translate-y-1/2 w-[300px] h-[300px]">
                        <motion.div
                            animate={{ 
                                rotateY: [0, 10, 0],
                                rotateX: [0, -5, 0],
                                y: [0, -10, 0]
                            }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="w-full h-full bg-white/5 backdrop-blur-[2px] rounded-3xl border border-white/10 shadow-3xl p-6 flex flex-col justify-between"
                        >
                            <div className="flex justify-between items-start">
                                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg">
                                    <FileText className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex -space-x-2">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-[10px] font-bold">
                                            {i}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="h-4 w-3/4 bg-white/20 rounded-full animate-pulse" />
                                <div className="h-4 w-full bg-white/10 rounded-full" />
                                <div className="h-4 w-1/2 bg-white/10 rounded-full" />
                            </div>
                            <div className="pt-4 border-t border-white/10 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                <span>AI Processing...</span>
                                <span className="text-primary">85%</span>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </section>
    );
}
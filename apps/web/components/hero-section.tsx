'use client';

import { ArrowRight, Sparkles, Brain, FileText, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

export default function HeroSection() {
    return (
        <section className="relative pt-8 pb-20 overflow-hidden">
            {/* Floating Elements Backdrop */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
                <FloatingIcon Icon={Brain} className="top-[10%] left-[15%] text-primary/20" delay={0} duration={5} />
                <FloatingIcon Icon={FileText} className="top-[25%] right-[10%] text-blue-400/20" delay={1} duration={6} />
                <FloatingIcon Icon={Sparkles} className="bottom-[20%] left-[10%] text-amber-400/20" delay={2} duration={4} />
                <FloatingIcon Icon={CheckCircle2} className="bottom-[15%] right-[15%] text-green-400/20" delay={0.5} duration={7} />
            </div>

            <div className="memo-container relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col items-center text-center"
                >
                    {/* Badge */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-sm font-semibold mb-8 backdrop-blur-sm"
                    >
                        <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
                        <span>Revolucionando el estudio con IA</span>
                    </motion.div>
                    
                    {/* Heading */}
                    <h1 className="text-5xl md:text-7xl font-extrabold max-w-5xl tracking-tight leading-[1.1]">
                        Convierte tus apuntes en{" "}
                        <span className="relative inline-block">
                            <span className="memo-gradient-text">Conocimiento</span>
                            <motion.div 
                                className="absolute -bottom-2 left-0 w-full h-1 bg-linear-to-r from-primary to-blue-400 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ delay: 1, duration: 1 }}
                            />
                        </span>
                        <br />
                        en segundos
                    </h1>
                    
                    {/* Subtitle */}
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mt-8 leading-relaxed font-light">
                        Sube tus PDFs y deja que nuestra IA genere flashcards inteligentes, 
                        quizzes y planes de estudio personalizados.
                    </p>
                    
                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 mt-12">
                        <Link href="/dashboard" className="flex items-center gap-2">
                            <motion.button 
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                className="bg-primary text-primary-foreground px-8 py-4 rounded-2xl font-semibold shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all flex items-center gap-3 text-md"
                            >
                                Comenzar ahora
                                <ArrowRight className="w-5 h-5" />
                            </motion.button>
                        </Link>
                        <motion.button 
                            whileHover={{ backgroundColor: "rgba(0,0,0,0.03)" }}
                            className="bg-background border border-border px-8 py-3 rounded-2xl font-semibold hover:bg-accent transition-all flex items-center gap-3 text-md"
                        >
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <span className="text-primary ml-1 text-xs">▶</span>
                            </div>
                            Ver demo
                        </motion.button>
                    </div>
                    
                    {/* Trust indicators */}
                    <div className="mt-12 flex items-center gap-6 text-sm text-muted-foreground font-medium grayscale opacity-60">
                        <span className="flex items-center gap-1">⭐ Valoración 4.9/5</span>
                        <div className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                        <span>+5,000 Estudiantes</span>
                        <div className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                        <span>Sin tarjeta</span>
                    </div>
                </motion.div>
                
                {/* Desktop Preview */}
                <motion.div 
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="relative mt-20 mx-auto max-w-5xl"
                >
                    {/* Abstract background glows */}
                    <div className="absolute -top-[10%] left-1/2 -translate-x-1/2 w-[120%] h-[120%] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
                    <div className="absolute -top-[5%] left-[20%] w-64 h-64 bg-blue-400/20 blur-[80px] rounded-full animate-pulse pointer-events-none" />
                    
                    <div className="relative group">
                        {/* Glow effect on hover */}
                        <div className="absolute -inset-1 bg-linear-to-r from-primary/20 to-blue-400/20 rounded-4xl blur-2xl opacity-0 group-hover:opacity-100 transition duration-1000" />
                        
                        <div className="relative bg-[#0F1115] rounded-3xl border border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] overflow-hidden">
                            {/* Browser Bar */}
                            <div className="bg-white/5 border-b border-white/10 px-6 py-4 flex items-center justify-between">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                                    <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                                </div>
                                <div className="px-4 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] text-white/40 font-mono tracking-wider">
                                    MEMO.AI / DASHBOARD / BIOLOGIA_FINAL
                                </div>
                                <div className="w-10 h-1 rounded-full bg-white/10" />
                            </div>

                            {/* Content Mockup */}
                            <div className="p-6 grid grid-cols-12 gap-8 min-h-[500px]">
                                {/* Sidebar Mock */}
                                <div className="col-span-3 space-y-6">
                                    <div className="space-y-2">
                                        <div className="h-4 w-24 bg-white/10 rounded-md" />
                                        <div className="h-10 w-full bg-white/5 rounded-xl border border-white/5" />
                                        <div className="h-10 w-full bg-primary/20 rounded-xl border border-primary/20" />
                                        <div className="h-10 w-full bg-white/5 rounded-xl border border-white/5" />
                                    </div>
                                    <div className="pt-6 space-y-3">
                                        <div className="h-4 w-20 bg-white/10 rounded-md" />
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="aspect-square bg-white/5 rounded-lg" />
                                            <div className="aspect-square bg-white/5 rounded-lg" />
                                        </div>
                                    </div>
                                </div>

                                {/* Main Area Mock */}
                                <div className="col-span-9 space-y-6">
                                    <div className="flex justify-between items-end">
                                        <div className="space-y-2">
                                            <div className="h-4 w-32 bg-white/10 rounded-md" />
                                            <div className="h-8 w-64 bg-white/20 rounded-lg" />
                                        </div>
                                        <div className="flex -space-x-3">
                                            {[1,2,3].map(i => (
                                                <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0F1115] bg-white/10 shadow-xl" />
                                            ))}
                                            <div className="w-10 h-10 rounded-full border-2 border-[#0F1115] bg-primary flex items-center justify-center text-[10px] font-bold text-white">+12</div>
                                        </div>
                                    </div>

                                    {/* Flashcard Active */}
                                    <div className="bg-linear-to-br from-white/5 to-white/2 border border-white/10 rounded-3xl p-6 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-6">
                                            <div className="px-3 py-1 rounded-full bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest">Flashcard 08/24</div>
                                        </div>
                                        <div className="space-y-6 max-w-xl">
                                            <div className="h-2 w-16 bg-primary rounded-full" />
                                            <h3 className="text-2xl font-bold text-white leading-tight">¿Cuáles son las fases principales de la mitosis celular?</h3>
                                            <p className="text-white/40 text-sm leading-relaxed">Haz clic para ver la respuesta detallada y las referencias bibliográficas.</p>
                                        </div>
                                        <div className="mt-12 flex gap-4">
                                            <div className="h-12 w-32 bg-white/5 rounded-2xl border border-white/10" />
                                            <div className="h-12 w-48 bg-primary/10 rounded-2xl border border-primary/20 flex items-center justify-center">
                                                <span className="text-primary font-bold text-sm">Revelar respuesta</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-3 gap-6">
                                        {[1,2,3].map(i => (
                                            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3">
                                                <div className="h-3 w-12 bg-white/10 rounded-md" />
                                                <div className="h-6 w-20 bg-white/20 rounded-md" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Floating Decorative Assets */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="absolute -right-12 top-1/2 -translate-y-1/2 hidden lg:block"
                    >
                        <div className="memo-glass-strong p-5 rounded-3xl space-y-4 shadow-2xl">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-2xl bg-green-500/20 flex items-center justify-center text-green-500">
                                    <CheckCircle2 className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Progreso</div>
                                    <div className="text-sm font-bold">85% Completado</div>
                                </div>
                            </div>
                            <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                                <div className="h-full bg-green-500 w-[85%]" />
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

function FloatingIcon({ Icon, className, delay = 0, duration = 4 }: { Icon: any, className: string, delay?: number, duration?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
                opacity: 1, 
                scale: 1,
                y: [0, -20, 0],
                rotate: [0, 5, -5, 0]
            }}
            transition={{ 
                opacity: { delay, duration: 1 },
                scale: { delay, duration: 1 },
                y: { repeat: Infinity, duration, ease: "easeInOut" },
                rotate: { repeat: Infinity, duration: duration * 1.5, ease: "easeInOut" }
            }}
            className={`absolute p-4 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm ${className}`}
        >
            <Icon className="w-6 h-6" />
        </motion.div>
    );
}


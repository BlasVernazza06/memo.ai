'use client';

import { ArrowRight, ChevronUp, User, MousePointer2 } from "lucide-react";
import { motion } from "motion/react";

export default function HeroSection() {
    return (
        <div className="memo-container">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center text-center"
            >
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-700 text-sm font-medium mb-8">
                    <span className="text-amber-500">⭐⭐⭐⭐⭐</span>
                    <span>Valorado 4.9/5</span>
                </div>
                
                {/* Heading */}
                <h1 className="text-6xl font-bold max-w-4xl">
                    El Mejor{" "}
                    <span className="memo-gradient-text">Asistente de Estudio</span>
                    <br />
                    con Inteligencia Artificial
                </h1>
                
                {/* Subtitle */}
                <p className="memo-body-large max-w-2xl mt-6">
                    Sube tus PDFs y genera flashcards, quizzes y roadmaps de estudio 
                    personalizados automáticamente. Fácil.
                </p>
                
                {/* CTA Buttons */}
                <div className="flex items-center gap-4 mt-10">
                    <button className="memo-btn-shine bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
                        Comenzar gratis
                        <span>→</span>
                    </button>
                    <button className="border border-border bg-white px-8 py-3 rounded-full font-medium hover:bg-accent transition-colors flex items-center gap-2">
                        <span>▶</span>
                        Ver demo
                    </button>
                </div>
                
                {/* Small text */}
                <p className="text-sm text-muted-foreground mt-4">
                    Sin tarjeta de crédito requerida
                </p>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.3 }}
                className="relative mt-12 mx-auto max-w-3xl"
            >
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-chart-2/5 rounded-2xl blur-xl" />

                <div className="relative bg-card rounded-2xl border border-border shadow-2xl overflow-hidden">
                    {/* Browser header */}
                    <div className="bg-muted/50 px-4 py-3 border-b border-border flex items-center gap-2">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-destructive/60" />
                            <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
                            <div className="w-3 h-3 rounded-full bg-green-400/60" />
                        </div>
                        <div className="flex-1 flex justify-center">
                            <div className="bg-background/80 rounded-md border border-border px-4 py-1 text-xs text-muted-foreground">
                                memo.ai/dashboard
                            </div>
                        </div>
                    </div>
                
                    {/* App preview */}
                    <div className="p-6 bg-background relative">
                        
                        {/* Main content mockup */}
                        <div className="space-y-4">
                            
                            {/* Upload area mockup */}
                            <div className="mx-25 space-y-5">
                                <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                                        <ArrowRight className="w-5 h-5 text-primary rotate-[-90deg]" />
                                    </div>
                                    <p className="font-medium text-sm">Arrastra tu PDF aquí</p>
                                    <p className="text-xs text-muted-foreground mt-1">o haz clic para seleccionar</p>
                                </div>
                                {/* Flashcard mockup */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
                                        <div className="text-xs text-muted-foreground mb-2">Flashcard 1/25</div>
                                        <div className="font-medium text-sm">¿Qué es la fotosíntesis?</div>
                                    </div>
                                    <div className="bg-primary text-primary-foreground rounded-xl p-4">
                                        <div className="text-xs opacity-80 mb-2">Respuesta</div>
                                        <div className="font-medium text-sm">Proceso de conversión de luz...</div>
                                    </div>
                                </div>
                            </div>                            
                            
                            {/* User streak badge - Liquid Glass style */}
                            <div className="relative">
                                
                                {/* Glass container */}
                                <div 
                                    className="relative flex justify-between w-max rounded-[20px] px-4 py-2 gap-6"
                                    style={{
                                        background: `
                                            linear-gradient(180deg, 
                                                rgba(255,255,255,0.35) 0%, 
                                                rgba(255,255,255,0.12) 40%,
                                                rgba(255,255,255,0.08) 100%
                                            )
                                        `,
                                        backdropFilter: 'blur(50px) saturate(200%) brightness(1.1)',
                                        WebkitBackdropFilter: 'blur(50px) saturate(200%) brightness(1.1)',
                                        boxShadow: `
                                            0 0 0 0.5px rgba(255,255,255,0.5),
                                            0 1px 0 0 rgba(255,255,255,0.4) inset,
                                            0 -1px 0 0 rgba(0,0,0,0.03) inset,
                                            0 4px 16px rgba(0,0,0,0.04),
                                            0 12px 40px rgba(0,0,0,0.06)
                                        `,
                                    }}
                                >
                                    <div className="flex items-center gap-2">
                                        <ChevronUp className="w-3.5 h-3.5 text-foreground/40" />
                                        <div 
                                            className="size-7 rounded-full flex items-center justify-center text-white font-semibold text-[11px] shadow-lg"
                                            style={{
                                                background: 'linear-gradient(145deg, #0ea5e9 0%, #3b82f6 100%)',
                                                boxShadow: '0 4px 12px rgba(14,165,233,0.5), inset 0 1px 2px rgba(255,255,255,0.4)',
                                            }}
                                        >
                                            JD
                                        </div>
                                        <span className="text-sm font-medium text-foreground/70">John Doe</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span className="text-base leading-none drop-shadow-sm">🔥</span>
                                        <span className="font-bold text-orange-500 text-sm drop-shadow-sm">7</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div></div>
            </motion.div>
        </div>
    );
}
'use client';

import { motion } from "motion/react";
import { Plus, FolderPlus, BookOpen, Brain, Clock, ChevronRight, Sparkles, Files, Users, FileText } from "lucide-react";
import { Button } from "@repo/ui/components/ui/button";

export default function DashboardPage() {
    const workspaces = [
        { 
            id: 1, 
            name: "Anatomía Humana", 
            docs: 12, 
            color: "from-blue-500 to-indigo-600", 
            icon: BookOpen,
            lastActive: "hace 2 horas"
        },
        { 
            id: 2, 
            name: "Marketing Digital", 
            docs: 8, 
            color: "from-purple-500 to-pink-600", 
            icon: Brain,
            lastActive: "hace 1 día"
        },
        { 
            id: 3, 
            name: "Sistemas Operativos", 
            docs: 15, 
            color: "from-emerald-500 to-teal-600", 
            icon: Files,
            lastActive: "hace 3 días"
        },
    ];

    return (
        <div className="space-y-12 py-6">
            {/* Dashboard Hero */}
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

            {/* Workspaces Section */}
            <section className="space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Tus Workspaces</h2>
                        <p className="text-sm text-slate-500 font-medium">Gestiona tus áreas de estudio y documentos recientes.</p>
                    </div>
                    <Button variant="ghost" className="text-primary font-bold hover:bg-primary/5 rounded-xl gap-2">
                        Ver todos
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {/* Create New Workspace Card */}
                    <motion.div 
                        whileHover={{ y: -5 }}
                        className="group cursor-pointer border-2 border-dashed border-slate-200 rounded-4xl p-8 flex flex-col items-center justify-center text-center hover:border-primary/40 hover:bg-primary/2 transition-all min-h-[220px]"
                    >
                        <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                            <FolderPlus className="w-6 h-6 text-slate-400 group-hover:text-white" />
                        </div>
                        <h3 className="font-bold text-slate-900 mb-1">Nuevo Workspace</h3>
                        <p className="text-xs text-slate-400 font-medium">Crea un espacio para una nueva materia</p>
                    </motion.div>

                    {/* Workspace Cards */}
                    {workspaces.map((ws, idx) => (
                        <motion.div 
                            key={ws.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * idx }}
                            whileHover={{ y: -5 }}
                            className="group relative bg-white border border-slate-200/60 rounded-4xl p-8 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all flex flex-col justify-between min-h-[220px]"
                        >
                            <div className="absolute top-6 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button size="icon" variant="ghost" className="rounded-xl h-8 w-8">
                                    <ChevronRight className="w-4 h-4" />
                                </Button>
                            </div>

                            <div>
                                <div className={`w-14 h-14 bg-linear-to-br ${ws.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/10`}>
                                    <ws.icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2 truncate pr-6">{ws.name}</h3>
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-tight">
                                        <Files className="w-3.5 h-3.5" />
                                        <span>{ws.docs} docs</span>
                                    </div>
                                    <div className="w-1 h-1 rounded-full bg-slate-300" />
                                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-tight">
                                        <Users className="w-3.5 h-3.5" />
                                        <span>Personal</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                                    <Clock className="w-3 h-3" />
                                    {ws.lastActive}
                                </span>
                                <div className="flex -space-x-1.5">
                                    {[1, 2].map(i => (
                                        <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-100 overflow-hidden">
                                            <div className="w-full h-full bg-linear-to-br from-slate-200 to-slate-300" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}

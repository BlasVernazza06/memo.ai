'use client';

import { motion } from 'motion/react';
import { 
    Upload, 
    FileText, 
    MoreVertical, 
    Plus, 
    Search,
    ChevronDown,
    BrainCircuit,
    Sparkles,
    Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ThemeToggle } from '@/components/theme-toggle';

// Mock data for recent documents
const recentDocs = [
    { title: "Anatomía Humana - Cap 1", date: "Hace 2 horas", cards: 24, progress: 80 },
    { title: "Historia del Arte - Renacimiento", date: "Ayer", cards: 15, progress: 45 },
    { title: "Física Cuántica Básica", date: "Hace 3 días", cards: 32, progress: 10 },
];

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-slate-50/50">
            {/* Header / Topbar */}
            <header className="sticky top-0 z-30 w-full border-b bg-background/80 backdrop-blur-xl supports-backdrop-filter:bg-background/60">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-slate-900">
                        <BrainCircuit className="w-8 h-8 text-primary" />
                        Memo.ai
                    </div>

                    <div className="flex-1 max-w-md hidden md:block">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Buscar documentos..."
                                className="w-full bg-slate-100/50 pl-9 rounded-full border-none focus-visible:ring-1 focus-visible:bg-white transition-all"
                            />
                        </div>
                    </div>

                    <div className='flex gap-2'>
                        <ThemeToggle/>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => {}}
                        >
                            <Settings/>
                        </Button>
                    </div>

                    {/* Empty div to keep spacing if needed or just remove flex-1 from search */ }
                </div>
            </header>

            <main className="container mx-auto px-4 py-8 space-y-8 pb-24">
                {/* Welcome & Upload Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="grid md:grid-cols-3 gap-6"
                >
                    {/* Welcome Text */}
                    <div className="md:col-span-2 space-y-2">
                        <h1 className="text-3xl font-bold text-slate-900">
                            Hola, John <span className="inline-block animate-wave origin-[70%_70%]">👋</span>
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            ¿Qué vamos a aprender hoy? Sube un nuevo documento para empezar.
                        </p>
                    </div>

                    {/* Stats/Actions (Optional, keeping it clean for now) */}
                </motion.div>

                {/* Main Upload Area */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                    className="relative group cursor-pointer"
                >
                    <div className="absolute -inset-1 bg-linear-to-r from-blue-500 to-indigo-500 rounded-2xl opacity-20 group-hover:opacity-40 blur transition duration-500" />
                    <div className="relative bg-white border-2 border-dashed border-slate-200 rounded-xl p-10 text-center hover:border-primary/50 hover:bg-slate-50/50 transition-all duration-300">
                        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                            <Upload className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-1">
                            Sube tus documentos
                        </h3>
                        <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
                            Arrastra y suelta tu PDF aquí o haz clic para explorar. 
                            Soportamos archivos de hasta 50MB.
                        </p>
                        <Button className="rounded-full shadow-lg shadow-primary/20">
                            <Plus className="w-4 h-4 mr-2" />
                            Seleccionar Archivos
                        </Button>
                    </div>
                </motion.div>

                {/* Recent Documents Grid */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-amber-500" />
                            Actividad Reciente
                        </h2>
                        <Button variant="ghost" size="sm" className="text-muted-foreground">
                            Ver todo
                        </Button>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* New Item Card (Ghost) */}
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="group flex flex-col items-center justify-center h-48 border-2 border-dashed border-slate-200 rounded-xl hover:border-slate-300 hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mb-2">
                                <Plus className="w-5 h-5 text-slate-400" />
                            </div>
                            <span className="font-medium text-slate-500 text-sm">Crear nuevo mazo</span>
                        </motion.div>

                        {/* Recent Items */}
                        {recentDocs.map((doc, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + (i * 0.1) }}
                                className="group bg-white border border-slate-100 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-blue-100 transition-all cursor-pointer relative overflow-hidden"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="w-10 h-10 rounded-lg bg-blue-50/80 flex items-center justify-center text-blue-600">
                                        <FileText className="w-5 h-5" />
                                    </div>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2 text-slate-400 hover:text-slate-600">
                                        <MoreVertical className="w-4 h-4" />
                                    </Button>
                                </div>
                                
                                <h3 className="font-semibold text-slate-900 mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                                    {doc.title}
                                </h3>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                                    <span>{doc.date}</span>
                                    <span>•</span>
                                    <span>{doc.cards} cartas</span>
                                </div>

                                {/* Progress Bar */}
                                <div className="space-y-1.5">
                                    <div className="flex justify-between text-xs">
                                        <span className="font-medium text-slate-600">{doc.progress}% completado</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-linear-to-r from-blue-500 to-indigo-500 rounded-full"
                                            style={{ width: `${doc.progress}%` }} 
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>

            {/* Floating Profile & Streak (Bottom Left) */}
            <div className="fixed bottom-6 left-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div 
                    className="relative flex items-center gap-4 rounded-full px-4 py-2 border border-white/20 backdrop-blur-xl shadow-2xl"
                    style={{
                        background: 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 100%)',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.8)'
                    }}
                >
                    {/* User Profile */}
                    <button className="flex items-center gap-3 group outline-none">
                        <div 
                            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-md transition-transform group-hover:scale-105"
                            style={{
                                background: 'linear-gradient(145deg, #0ea5e9 0%, #3b82f6 100%)',
                                boxShadow: '0 2px 8px rgba(14,165,233,0.3), inset 0 1px 1px rgba(255,255,255,0.3)',
                            }}
                        >
                            JD
                        </div>
                        <div className="text-left">
                            <p className="text-sm font-bold text-slate-800 leading-none">John Doe</p>
                            <div className="flex items-center gap-1.5 mt-1">
                                <span className="text-[10px] uppercase font-bold tracking-wider text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded-[4px]">Pro</span>
                                <span className="text-[10px] text-muted-foreground">•</span>
                                <div className="flex items-center gap-0.5">
                                    <span className="text-xs leading-none">🔥</span>
                                    <span className="font-bold text-orange-500 text-xs">7 días</span>
                                </div>
                            </div>
                        </div>
                        <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors ml-1" />
                    </button>
                </div>
            </div>
        </div>
    );
}

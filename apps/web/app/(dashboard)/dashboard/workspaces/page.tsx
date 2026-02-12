'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
    Plus, 
    Search, 
    Grid, 
    List, 
    Filter, 
    MoreVertical, 
    Layers, 
    BookOpen, 
    Files, 
    Clock, 
    ChevronRight,
    Star,
    Brain
} from "lucide-react";
import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import Link from "next/link";

export default function WorkspacesPage() {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [searchQuery, setSearchQuery] = useState("");

    const workspaces = [
        { 
            id: 1, 
            name: "Anatomía Humana", 
            docs: 12, 
            flashcards: 145,
            color: "from-blue-500 to-indigo-600", 
            icon: BookOpen,
            lastActive: "hace 2 horas",
            pinned: true,
            category: "Medicina"
        },
        { 
            id: 2, 
            name: "Marketing Digital", 
            docs: 8, 
            flashcards: 64,
            color: "from-purple-500 to-pink-600", 
            icon: Brain,
            lastActive: "hace 1 día",
            pinned: true,
            category: "Negocios"
        },
        { 
            id: 3, 
            name: "Sistemas Operativos", 
            docs: 15, 
            flashcards: 210,
            color: "from-emerald-500 to-teal-600", 
            icon: Files,
            lastActive: "hace 3 días",
            pinned: false,
            category: "Ingeniería"
        },
        { 
            id: 4, 
            name: "Historia del Arte", 
            docs: 5, 
            flashcards: 32,
            color: "from-orange-500 to-red-600", 
            icon: BookOpen,
            lastActive: "hace 1 semana",
            pinned: false,
            category: "Humanidades"
        },
    ];

    const filteredWorkspaces = workspaces.filter(ws => 
        ws.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-10 py-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                            <Layers className="w-6 h-6 text-primary" />
                        </div>
                        <h1 className="text-4xl font-black tracking-tight text-slate-900">Mis Workspaces</h1>
                    </div>
                    <p className="text-slate-500 font-medium">Gestiona y organiza tus áreas de estudio inteligentes.</p>
                </div>
                
                <Link href="/dashboard/workspaces/new" className="bg-primary hover:bg-primary/90 text-white font-bold rounded-2xl h-14 px-8 shadow-xl shadow-primary/20 flex items-center justify-center gap-3 active:scale-95 transition-all w-full md:w-auto">
                    <Plus className="w-6 h-6" />
                    Crear Nuevo
                </Link>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white border border-slate-200/60 p-3 rounded-[2rem] shadow-sm">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input 
                        placeholder="Buscar por nombre o categoría..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-12 bg-transparent border-none h-12 focus-visible:ring-0 text-slate-900 placeholder:text-slate-400 font-medium" 
                    />
                </div>
                
                <div className="flex items-center gap-2 p-1 bg-slate-50 rounded-2xl w-full md:w-auto">
                    <button 
                        onClick={() => setViewMode('grid')}
                        className={`flex-1 md:flex-none p-2.5 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-white text-primary shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        <Grid className="w-5 h-5" />
                    </button>
                    <button 
                        onClick={() => setViewMode('list')}
                        className={`flex-1 md:flex-none p-2.5 rounded-xl transition-all ${viewMode === 'list' ? 'bg-white text-primary shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        <List className="w-5 h-5" />
                    </button>
                    <div className="w-px h-6 bg-slate-200 mx-1 hidden md:block" />
                    <button className="flex-1 md:flex-none flex items-center gap-2 px-4 py-2.5 rounded-xl text-slate-500 font-bold text-sm hover:bg-white transition-all">
                        <Filter className="w-4 h-4" />
                        Filtros
                    </button>
                </div>
            </div>

            {/* Workspaces Display */}
            <AnimatePresence mode="wait">
                <motion.div 
                    layout
                    className={viewMode === 'grid' 
                        ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8" 
                        : "flex flex-col gap-4"
                    }
                >
                    {/* Add New Quick Card (Grid only) */}
                    {viewMode === 'grid' && (
                        <Link href="/dashboard/workspaces/new" className="block">
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                whileHover={{ y: -5 }}
                                className="group cursor-pointer border-2 border-dashed border-slate-200 rounded-4xl p-8 flex flex-col items-center justify-center text-center hover:border-primary/40 hover:bg-primary/2 transition-all min-h-[260px] h-full"
                            >
                                <div className="w-16 h-16 bg-slate-100 rounded-[1.5rem] flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm group-active:scale-95">
                                    <Plus className="w-8 h-8 text-slate-400 group-hover:text-white" />
                                </div>
                                <h3 className="font-bold text-slate-900 mb-1">Nuevo Workspace</h3>
                                <p className="text-xs text-slate-400 font-medium">Crea un espacio inteligente para tus PDFs</p>
                            </motion.div>
                        </Link>
                    )}

                    {filteredWorkspaces.map((ws, idx) => (
                        <Link key={ws.id} href={`/dashboard/workspaces/${ws.id}`} className="block">
                            <motion.div 
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.05 * idx }}
                                whileHover={viewMode === 'grid' ? { y: -5 } : { x: 5 }}
                                className={`group relative bg-white border border-slate-200/60 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all p-8 ${
                                    viewMode === 'grid' 
                                    ? "rounded-4xl flex flex-col justify-between min-h-[260px] h-full" 
                                    : "rounded-3xl flex flex-row items-center justify-between md:gap-8 min-h-[100px]"
                                }`}
                            >
                                <div className={viewMode === 'grid' ? "flex flex-col" : "flex flex-row items-center gap-6 flex-1"}>
                                    <div className={`flex items-center justify-center shrink-0 ${
                                        viewMode === 'grid' 
                                        ? `w-14 h-14 bg-linear-to-br ${ws.color} rounded-2xl mb-6 shadow-lg shadow-primary/10` 
                                        : `w-12 h-12 bg-linear-to-br ${ws.color} rounded-xl shadow-md shadow-primary/5`
                                    }`}>
                                        <ws.icon className="w-6 h-6 text-white" />
                                    </div>
                                    
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className={`font-black text-slate-900 group-hover:text-primary transition-colors truncate ${viewMode === 'grid' ? "text-xl" : "text-lg"}`}>
                                                {ws.name}
                                            </h3>
                                            {ws.pinned && <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />}
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-0.5 rounded-md">
                                                {ws.category}
                                            </span>
                                            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-tight">
                                                <Files className="w-3.5 h-3.5" />
                                                <span>{ws.docs}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className={viewMode === 'grid' ? "mt-8 pt-6 border-t border-slate-50 flex items-center justify-between" : "flex items-center gap-8 text-right shrink-0"}>
                                    {viewMode === 'grid' && (
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                                            <Clock className="w-3 h-3" />
                                            {ws.lastActive}
                                        </span>
                                    )}
                                    <div className="flex items-center gap-3">
                                        <div className="p-2.5 rounded-xl text-slate-300 group-hover:text-slate-600 group-hover:bg-slate-50 transition-colors">
                                            <MoreVertical className="w-5 h-5" />
                                        </div>
                                        <div className="bg-slate-100 text-slate-900 group-hover:bg-primary group-hover:text-white rounded-xl shadow-sm transition-all active:scale-95 group/btn h-10 w-10 flex items-center justify-center">
                                            <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-0.5 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </motion.div>
            </AnimatePresence>

            {/* Empty State */}
            {filteredWorkspaces.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-2">
                        <Layers className="w-10 h-10 text-slate-200" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">No encontramos resultados</h3>
                    <p className="text-slate-500 max-w-xs font-medium">Prueba con otra palabra clave o crea un nuevo workspace.</p>
                    <Button variant="ghost" className="text-primary font-bold hover:bg-primary/5 rounded-xl">Limpiar búsqueda</Button>
                </div>
            )}
        </div>
    );
}

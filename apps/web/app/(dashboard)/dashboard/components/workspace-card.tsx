import { ChevronRight, Heart, MoreVertical, Files, LucideIcon, BookOpen, Brain, Files as FilesIcon } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";

export type Workspace = {
    id: string;
    userId: string;
    name: string;
    description: string | null;
    customContext: string | null;
    category: string | null;
    icon: string | null; // emoji o nombre de icono
    coverImage: string | null;
    isFavorite: boolean;
    isArchived: boolean;
    createdAt: Date | string;
    updatedAt: Date | string;
    
    // Virtual/UI fields
    docs: number;
    flashcards: number;
    color: string; 
    lastActive: string;
};

const ICON_MAP: Record<string, LucideIcon> = {
    'book-open': BookOpen,
    'brain': Brain,
    'files': FilesIcon,
};

export default function WorkspaceCard({ ws, idx, viewMode }: { ws: Workspace, idx: number, viewMode: 'grid' | 'list' }) {
    const Icon = ICON_MAP[ws.icon || ''] || FilesIcon; // Fallback por si el nombre no coincide

    return (
        <div className="relative group/ws h-full">
            <Link href={`/dashboard/workspaces/${ws.id}`} className="block h-full">
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: Math.min(idx * 0.05, 0.3) }}
                    whileHover={viewMode === 'grid' ? { y: -4 } : { x: 4 }}
                    className={`relative bg-white border border-slate-200/60 shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all overflow-hidden h-full ${
                        viewMode === 'grid' 
                        ? "rounded-4xl flex flex-col h-[380px]" 
                        : "rounded-3xl flex flex-row items-center justify-between md:gap-8 min-h-[100px] p-6"
                    }`}
                >
                    {/* Favorite Button (Inside motion.div to follow movement) */}
                    <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            // Aquí iría la lógica de favorito
                        }}
                        className={`absolute top-4 right-4 z-20 p-2.5 rounded-2xl backdrop-blur-md border border-white/20 transition-all ${
                            ws.isFavorite ? 'bg-rose-500 text-white fill-current shadow-lg shadow-rose-500/20' : 'bg-white/40 text-white hover:bg-white/60'
                        }`}
                    >
                        <Heart className={`w-4 h-4 ${ws.isFavorite ? 'fill-current' : ''}`} />
                    </motion.button>

                    {viewMode === 'grid' && (
                        <div className="relative h-40 w-full overflow-hidden shrink-0">
                            {/* Cover Media */}
                            {ws.coverImage ? (
                                <img 
                                    src={ws.coverImage} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover/ws:scale-105" 
                                    alt={ws.name}
                                />
                            ) : (
                                <div className={`w-full h-full bg-linear-to-br ${ws.color} opacity-90 transition-transform duration-700 group-hover/ws:scale-105`} />
                            )}
                            
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-transparent" />
                            
                            {/* Category Badge */}
                            <div className="absolute bottom-3 left-4">
                                <span className="text-[9px] font-black text-white/90 uppercase tracking-[0.15em] bg-white/10 backdrop-blur-md border border-white/10 px-2 py-1 rounded-lg">
                                    {ws.category}
                                </span>
                            </div>
                        </div>
                    )}

                    <div className={`p-6 flex flex-col justify-between flex-1 ${viewMode === 'grid' ? "" : "flex-row items-center gap-6"}`}>
                        <div className={viewMode === 'grid' ? "space-y-3" : "flex flex-row items-center gap-6 flex-1"}>
                            <div className="flex items-start justify-between">
                                <div className={`flex items-center justify-center shrink-0 ${
                                    viewMode === 'grid' 
                                    ? 'w-12 h-12 bg-slate-50 border border-slate-100 rounded-2xl shadow-sm' 
                                    : 'w-12 h-12 bg-linear-to-br from-slate-100 to-slate-200 rounded-xl'
                                }`}>
                                    <Icon className={`w-5 h-5 ${viewMode === 'grid' ? 'text-primary' : 'text-slate-600'}`} />
                                </div>
                                {viewMode === 'grid' && (
                                    <div className="p-2 rounded-xl text-slate-300 hover:text-slate-600 hover:bg-slate-50 transition-colors">
                                        <MoreVertical className="w-4 h-4" />
                                    </div>
                                )}
                            </div>

                            <div className="space-y-1">
                                <h3 className={`font-black text-slate-900 group-hover/ws:text-primary transition-colors line-clamp-1 ${viewMode === 'grid' ? "text-lg" : "text-lg"}`}>
                                    {ws.name}
                                </h3>
                                <p className="text-[11px] text-slate-400 font-bold flex items-center gap-2">
                                    <Files className="w-3.5 h-3.5" />
                                    {ws.docs} Documentos • {ws.flashcards} Flashcards
                                </p>
                            </div>
                        </div>

                        <div className={viewMode === 'grid' ? "pt-4 mt-auto border-t border-slate-50 flex items-center justify-between" : "flex items-center gap-8 text-right shrink-0"}>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                    Activo hace {ws.lastActive.replace('hace ', '')}
                                </span>
                            </div>
                            
                            <div className="bg-slate-100 text-slate-900 group-hover/ws:bg-primary group-hover/ws:text-white rounded-xl shadow-sm transition-all active:scale-95 h-9 w-9 flex items-center justify-center">
                                <ChevronRight className="w-5 h-5 group-hover/ws:translate-x-0.5 transition-transform" />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </Link>
        </div>
    );
}
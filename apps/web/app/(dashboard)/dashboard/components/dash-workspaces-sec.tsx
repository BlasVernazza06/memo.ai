'use client';

import { FolderPlus, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@repo/ui/components/ui/button";
import WorkspaceCard, { Workspace } from "./workspace-card";

export default function DashWorkspacesSec() {
    const MOCK_WORKSPACES: Workspace[] = [
        { 
            id: "1", 
            userId: "user-1",
            name: "Anatomía Humana", 
            description: "Estudio profundo del cuerpo humano",
            customContext: null,
            docs: 12, 
            flashcards: 145,
            color: "from-blue-500 to-indigo-600", 
            icon: 'book-open',
            lastActive: "hace 2 horas",
            isFavorite: true,
            isArchived: false,
            category: "Medicina",
            coverImage: "https://images.unsplash.com/photo-1530210124550-912dc1381cb8?q=80&w=2070",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        { 
            id: "2", 
            userId: "user-1",
            name: "Marketing Digital", 
            description: "Estrategias de venta online",
            customContext: null,
            docs: 8, 
            flashcards: 64,
            color: "from-purple-500 to-pink-600", 
            icon: 'brain',
            lastActive: "hace 1 día",
            isFavorite: true,
            isArchived: false,
            category: "Negocios",
            coverImage: null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        { 
            id: "3", 
            userId: "user-1",
            name: "Sistemas Operativos", 
            description: "Conceptos básicos de kernels y procesos",
            customContext: null,
            docs: 15, 
            flashcards: 210,
            color: "from-emerald-500 to-teal-600", 
            icon: 'files',
            lastActive: "hace 3 días",
            isFavorite: false,
            isArchived: false,
            category: "Ingeniería",
            coverImage: null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        { 
            id: "4", 
            userId: "user-1",
            name: "Historia del Arte", 
            description: "Desde el renacimiento hasta la actualidad",
            customContext: null,
            docs: 5, 
            flashcards: 32,
            color: "from-orange-500 to-red-600", 
            icon: 'book-open',
            lastActive: "hace 1 semana",
            isFavorite: false,
            isArchived: false,
            category: "Humanidades",
            coverImage: null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
    ];  
    
    return (
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
                    {MOCK_WORKSPACES.map((ws, idx) => (
                        <WorkspaceCard key={ws.id} ws={ws} idx={idx} viewMode="grid" />
                    ))}
                </div>
        </section>
    );
}
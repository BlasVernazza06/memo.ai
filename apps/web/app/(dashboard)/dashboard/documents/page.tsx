'use client';

import { useState } from "react";
import { motion } from "motion/react";
import { 
    FileText, 
    Plus, 
    Filter, 
    Clock, 
    ChevronRight,
    ArrowUpRight,
    File,
    Youtube,
    Link as LinkIcon,
    Trash2
} from "lucide-react";
import { Button } from "@repo/ui/components/ui/button";
import SearchInput from "@/components/shared/search-input";

const INITIAL_DOCUMENTS = [
    { id: 1, name: "Sistema Inmune.pdf", type: "pdf", date: "Hace 2 horas", size: "2.4 MB", workspace: "Anatomía" },
    { id: 2, name: "Clase 04: SEO Estratégico", type: "youtube", date: "Ayer", size: "15:20 min", workspace: "Marketing digital" },
    { id: 3, name: "Marketing_Plan_2024.docx", type: "link", date: "Hace 2 días", size: "Link externo", workspace: "Marketing digital" },
    { id: 4, name: "Resumen_Bioquimica.pdf", type: "pdf", date: "Hace 1 semana", size: "1.1 MB", workspace: "Medicina" },
];

const SEARCH_KEYS: (keyof typeof INITIAL_DOCUMENTS[0])[] = ["name", "workspace"];

export default function DocumentsPage() {
    const [filteredDocuments, setFilteredDocuments] = useState(INITIAL_DOCUMENTS);

    const getIcon = (type: string) => {
        switch (type) {
            case 'pdf': return <FileText className="w-5 h-5 text-blue-500" />;
            case 'youtube': return <Youtube className="w-5 h-5 text-red-500" />;
            case 'link': return <LinkIcon className="w-5 h-5 text-emerald-500" />;
            default: return <File className="w-5 h-5 text-slate-400" />;
        }
    };

    return (
        <div className="space-y-10 py-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                            <FileText className="w-6 h-6 text-primary" />
                        </div>
                        <h1 className="text-4xl font-black tracking-tight text-slate-900">Documentos</h1>
                    </div>
                    <p className="text-slate-500 font-medium">Todos tus materiales de estudio en un solo lugar.</p>
                </div>
                
                <Button className="bg-primary hover:bg-primary/90 text-white font-bold rounded-2xl h-14 px-8 shadow-xl shadow-primary/20 flex gap-3 active:scale-95 transition-all w-full md:w-auto">
                    <Plus className="w-6 h-6" />
                    Subir Material
                </Button>
            </div>

            {/* Search Bar */}
            <SearchInput 
                data={INITIAL_DOCUMENTS}
                onResultsChange={setFilteredDocuments}
                searchKeys={SEARCH_KEYS}
                placeholder="Buscar documentos..."
                suffix={
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" className="rounded-xl font-bold flex gap-2 h-11 transition-all hover:bg-slate-50">
                            <Filter className="w-4 h-4" />
                            Tipo
                        </Button>
                        <Button variant="ghost" className="rounded-xl font-bold flex gap-2 h-11 transition-all hover:bg-slate-50">
                            Fecha
                        </Button>
                    </div>
                }
            />

            {/* Documents List */}
            <div className="bg-white border border-slate-200/60 rounded-4xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-50">
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Nombre</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] hidden md:table-cell">Espacio</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] hidden lg:table-cell">Fecha</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredDocuments.map((doc) => (
                                <motion.tr 
                                    key={doc.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="group hover:bg-slate-50 transition-colors"
                                >
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all shrink-0">
                                                {getIcon(doc.type)}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-sm font-bold text-slate-900 truncate group-hover:text-primary transition-colors cursor-pointer">{doc.name}</p>
                                                <p className="text-xs text-slate-400 font-medium md:hidden">{doc.workspace}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 hidden md:table-cell">
                                        <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">{doc.workspace}</span>
                                    </td>
                                    <td className="px-8 py-5 hidden lg:table-cell">
                                        <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                                            <Clock className="w-4 h-4" />
                                            {doc.date}
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button size="icon" variant="ghost" className="rounded-xl h-9 w-9 text-slate-300 hover:text-red-500 hover:bg-red-50">
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                            <Button size="icon" variant="ghost" className="rounded-xl h-9 w-9 text-slate-300 hover:text-primary hover:bg-primary/5">
                                                <ArrowUpRight className="w-4 h-4" />
                                            </Button>
                                            <Button size="icon" className="bg-slate-900 text-white rounded-xl h-9 w-9 shadow-lg hover:scale-110 active:scale-95 transition-all">
                                                <ChevronRight className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            
            {/* Empty State Mockup */}
            <div className="flex items-center justify-center py-12">
                <p className="text-slate-400 text-sm font-medium">Mostrando {filteredDocuments.length} archivos totales</p>
            </div>
        </div>
    );
}

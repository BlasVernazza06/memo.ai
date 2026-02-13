'use client';

import { useState } from "react";
import { 
    FileText, 
    Layers, 
    Brain, 
    Plus, 
    MoreVertical,
    Sparkles,
    Settings,
    Download,
    MessageSquare,
    BarChart3,
    Heart,
    ChevronLeft,
} from "lucide-react";
import { Button } from "@repo/ui/components/ui/button";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import WorkspaceSettingsModal from "../../components/workspace-settings-modal";
import SearchInput from "@/components/shared/search-input";

// ============================================================
// MOCK DATA
// ============================================================

const MOCK_WORKSPACE = {
    id: "ws-1",
    name: "Anatomía Humana: Sistema Óseo",
    description: "Estudio del sistema esquelético humano, incluyendo huesos y articulaciones.",
    customContext: "Enfocarse mucho en los huesos del cráneo para el parcial del lunes.",
    category: "Medicina",
    icon: "🦴",
    coverImage: "https://images.unsplash.com/photo-1530210124550-912dc1381cb8?q=80&w=2070",
    isFavorite: true,
};

const MOCK_DOCS = [
    { id: "doc-1", name: "Sistema_Oseo_Completo.pdf", type: "pdf", size: "4.2 MB", date: "Hoy" }
];

// ============================================================
// COMPONENTS
// ============================================================

export default function WorkspaceDetailPage() {
    const [activeTab, setActiveTab] = useState<'docs' | 'flashcards' | 'quizzes' | 'analysis'>('docs');
    const [isFav, setIsFav] = useState(MOCK_WORKSPACE.isFavorite);
    const [showSettings, setShowSettings] = useState(false);

    const TABS = [
        { id: 'docs' as const, label: 'Documentos', count: 12, icon: FileText },
        { id: 'flashcards' as const, label: 'Flashcards', count: 48, icon: Layers },
        { id: 'quizzes' as const, label: 'Quizzes', count: 4, icon: Brain },
        { id: 'analysis' as const, label: 'Análisis', count: null, icon: BarChart3 },
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-6 pb-20 pt-4 px-4 overflow-hidden">
            {/* Breadcrumb */}
            <div className="flex items-center gap-4">
                <Link href="/dashboard/workspaces" className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                    <ChevronLeft className="w-5 h-5 text-slate-500" />
                </Link>
                <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                    <Link href="/dashboard/workspaces" className="hover:text-primary transition-colors">Workspaces</Link>
                    <span>/</span>
                    <span className="text-slate-900">{MOCK_WORKSPACE.category}</span>
                </div>
            </div>

            {/* Optional Cover Banner */}
            {MOCK_WORKSPACE.coverImage && (
                <div className="relative h-48 md:h-64 w-full rounded-4xl overflow-hidden shadow-2xl shadow-slate-200/50 border border-slate-200">
                    <img src={MOCK_WORKSPACE.coverImage} className="w-full h-full object-cover" alt="Cover" />
                    <div className="absolute inset-0 bg-linear-to-t from-slate-900/40 via-transparent to-transparent" />
                </div>
            )}

            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
                <div className="flex gap-6 items-start">
                    <div className="w-24 h-24 bg-white border border-slate-200 shadow-xl rounded-3xl flex items-center justify-center text-5xl shrink-0 -mt-12 md:-mt-16 relative z-10 select-none">
                        {MOCK_WORKSPACE.icon}
                    </div>
                    <div className="space-y-1">
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none">
                            {MOCK_WORKSPACE.name}
                        </h1>
                        <p className="text-slate-500 font-medium text-sm max-w-xl">
                            {MOCK_WORKSPACE.description}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Button 
                        onClick={() => setIsFav(!isFav)}
                        variant="ghost" 
                        className={`rounded-2xl h-14 w-14 p-0 shadow-sm border border-slate-200/60 transition-all active:scale-95 ${
                            isFav ? 'bg-rose-50 border-rose-100 text-rose-500' : 'bg-white text-slate-400 hover:text-rose-500'
                        }`}
                    >
                        <Heart className={`w-6 h-6 ${isFav ? 'fill-current' : ''}`} />
                    </Button>
                    <Button className="bg-primary hover:bg-primary/90 text-white font-black rounded-2xl h-14 px-8 gap-3 shadow-xl shadow-primary/25 transition-all active:scale-95">
                        <Sparkles className="w-5 h-5" />
                        Estudiar Ahora
                    </Button>
                    <Button 
                        onClick={() => setShowSettings(true)}
                        variant="ghost" 
                        className="rounded-2xl h-14 w-14 p-0 bg-white border border-slate-200/60 text-slate-400 hover:text-slate-600 shadow-sm transition-all active:scale-95"
                    >
                        <Settings className="w-6 h-6" />
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-6">
                {/* Main Content */}
                <div className="lg:col-span-8 space-y-10">
                    
                    {/* Mastery Card */}
                    <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm flex flex-col md:flex-row items-center gap-8">
                        <div className="relative w-28 h-28 flex items-center justify-center">
                            {/* Simple Radial Progress SVG */}
                            <svg className="w-full h-full -rotate-90">
                                <circle cx="56" cy="56" r="50" className="stroke-slate-100 fill-none" strokeWidth="12" />
                                <circle cx="56" cy="56" r="50" className="stroke-primary fill-none" strokeWidth="12" strokeDasharray="314" strokeDashoffset="47" strokeLinecap="round" />
                            </svg>
                            <span className="absolute inset-0 flex items-center justify-center text-2xl font-black text-slate-900">85%</span>
                        </div>
                        <div className="flex-1 text-center md:text-left space-y-2">
                            <h3 className="text-xl font-black text-slate-900">Dominio del Contenido</h3>
                            <p className="text-slate-500 text-sm font-medium leading-relaxed">
                                Estás a un **15%** de convertirte en un experto en este mazo. ¡Sigue practicando las flashcards marcadas como difíciles!
                            </p>
                            <div className="flex flex-wrap gap-2 pt-2 justify-center md:justify-start">
                                <span className="px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest">32 Dominadas</span>
                                <span className="px-3 py-1.5 bg-amber-50 text-amber-600 rounded-full text-[10px] font-black uppercase tracking-widest">12 Pendientes</span>
                            </div>
                        </div>
                    </div>

                    {/* Tabs Section */}
                    <div className="space-y-6">
                        <div className="flex bg-slate-100/60 backdrop-blur-sm p-1.5 rounded-4xl w-full md:w-fit overflow-x-auto gap-1 no-scrollbar">
                            {TABS.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-3 px-6 py-3.5 rounded-3xl text-xs font-black uppercase tracking-widest transition-all shrink-0 ${
                                        activeTab === tab.id 
                                        ? 'bg-white text-primary shadow-lg shadow-slate-200/50' 
                                        : 'text-slate-400 hover:text-slate-600'
                                    }`}
                                >
                                    <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-primary' : 'text-slate-400'}`} />
                                    <span>{tab.label}</span>
                                    {tab.count !== null && (
                                        <span className={`px-2 py-0.5 rounded-lg text-[10px] ${
                                            activeTab === tab.id ? 'bg-primary/10 text-primary' : 'bg-slate-200/60 text-slate-500'
                                        }`}>
                                            {tab.count}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div 
                                key={activeTab} 
                                initial={{ opacity: 0, y: 10 }} 
                                animate={{ opacity: 1, y: 0 }} 
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="min-h-[400px]"
                            >
                                {activeTab === 'docs' && <DocsList />}
                                {activeTab !== 'docs' && <EmptyTabState />}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-4 space-y-6">
                    {/* Context Card */}
                    {MOCK_WORKSPACE.customContext && (
                        <div className="bg-amber-50/40 border border-amber-100 rounded-4xl p-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-5">
                                <MessageSquare className="w-20 h-20 text-amber-600" />
                            </div>
                            <h3 className="text-amber-800 text-[10px] font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                                <MessageSquare className="w-3.5 h-3.5" />
                                Contexto del Estudiante
                            </h3>
                            <p className="text-amber-900/70 text-sm font-medium leading-relaxed italic relative z-10">
                                &quot;{MOCK_WORKSPACE.customContext}&quot;
                            </p>
                        </div>
                    )}

                    <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white space-y-6 shadow-2xl shadow-slate-900/30 group">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Brain className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-black text-lg">Memo AI</h3>
                                <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Asistente Activo</p>
                            </div>
                        </div>
                        <p className="text-white/60 text-sm font-medium leading-relaxed bg-white/5 p-5 rounded-3xl border border-white/5">
                            &quot;He procesado el archivo del **Sistema Óseo**. Te recomiendo empezar con el quiz de los huesos del cráneo, ya que es lo que marcaste como prioridad.&quot;
                        </p>
                        <Button className="w-full bg-primary hover:bg-primary/90 text-white font-black rounded-2xl h-14 gap-2">
                            Charlar con Memo
                        </Button>
                    </div>
                </div>
            </div>

            {/* Settings Modal */}
            <WorkspaceSettingsModal 
                isOpen={showSettings} 
                onClose={() => setShowSettings(false)} 
                workspace={MOCK_WORKSPACE}
            />
        </div>
    );
}

function DocsList() {
    const [filteredDocs, setFilteredDocs] = useState(MOCK_DOCS);

    return (
        <div className="space-y-6">
            <SearchInput 
                data={MOCK_DOCS}
                onResultsChange={setFilteredDocs}
                placeholder="Buscar documentos en este workspace..."
                showButton
                buttonText="Subir Archivo"
                suffix={<Plus className="w-5 h-5 mr-1" />}
            />

            <div className="grid grid-cols-1 gap-4">
                {filteredDocs.map(doc => (
                    <div key={doc.id} className="bg-white border border-slate-100 p-6 rounded-4xl flex items-center gap-6 hover:border-primary/30 transition-all cursor-pointer group shadow-xs hover:shadow-lg hover:shadow-slate-100">
                        <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110">
                            <FileText className="w-8 h-8" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="font-black text-slate-900 text-lg group-hover:text-primary transition-colors truncate">{doc.name}</h4>
                            <div className="flex items-center gap-3">
                                <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">PDF • {doc.size}</span>
                                <div className="w-1 h-1 rounded-full bg-slate-200" />
                                <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{doc.date}</span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="ghost" size="icon" className="rounded-xl h-12 w-12 text-slate-300 hover:text-slate-600 hover:bg-slate-50">
                                <Download className="w-5 h-5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="rounded-xl h-12 w-12 text-slate-300 hover:text-slate-600 hover:bg-slate-50">
                                <MoreVertical className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function EmptyTabState() {
    return (
        <div className="bg-slate-50/50 border border-slate-100 rounded-5xl p-16 text-center space-y-6">
            <div className="w-20 h-20 bg-white rounded-3xl shadow-xl flex items-center justify-center mx-auto text-slate-200 border border-slate-50">
                <Sparkles className="w-10 h-10" />
            </div>
            <div className="space-y-2">
                <h3 className="text-xl font-black text-slate-900">Sección en proceso</h3>
                <p className="text-sm text-slate-400 max-w-sm mx-auto font-medium">
                    La IA está analizando tus archivos para generar material de estudio personalizado. ¡Recibirás una notificación pronto!
                </p>
            </div>
            <Button variant="outline" className="rounded-2xl h-12 px-6 font-bold border-slate-200">
                Acelerar Proceso
            </Button>
        </div>
    );
}

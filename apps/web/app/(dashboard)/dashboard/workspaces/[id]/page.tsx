'use client';

import { useState } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { 
    FileText, 
    Layers, 
    Brain, 
    Zap, 
    Plus, 
    Search, 
    MoreVertical,
    ChevronLeft,
    CheckCircle2,
    Play,
    MessageSquare,
    Sparkles,
    Settings,
    Download,
    Share2,
    Video,
    Image as ImageIcon
} from "lucide-react";
import { Button } from "@repo/ui/components/ui/button";
import Link from "next/link";

type Tab = 'docs' | 'flashcards' | 'analysis' | 'quizzes';

export default function WorkspaceDetailPage() {
    const params = useParams();
    const [activeTab, setActiveTab] = useState<Tab>('docs');
    const workspaceId = params.id as string;

    console.log("Viewing workspace:", workspaceId);

    // Mock data for the workspace
    const workspace = {
        name: "Anatomía Humana: Sistema Óseo",
        category: "Medicina",
        documentsCount: 12,
        flashcardsCount: 48,
        quizzesCount: 4,
        lastActive: "Hace 2 horas",
        progress: 65,
    };

    const tabs = [
        { id: 'docs', label: 'Documentos', icon: FileText },
        { id: 'flashcards', label: 'Flashcards', icon: Layers },
        { id: 'quizzes', label: 'Quizzes', icon: Zap },
        { id: 'analysis', label: 'Análisis IA', icon: Brain },
    ];

    return (
        <div className="space-y-8 pb-10">
            {/* Header / Breadcrumbs */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-slate-400">
                        <Link href="/dashboard/workspaces" className="hover:text-primary transition-colors font-bold text-xs uppercase tracking-widest">Workspaces</Link>
                        <span className="text-slate-300">/</span>
                        <span className="text-slate-500 font-bold text-xs uppercase tracking-widest">{workspace.category}</span>
                    </div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                        {workspace.name}
                        <div className="bg-emerald-100 text-emerald-600 text-[10px] uppercase font-black px-2 py-1 rounded-md tracking-tighter">Activo</div>
                    </h1>
                </div>

                <div className="flex items-center gap-3">
                    <Button variant="outline" className="rounded-2xl gap-2 font-bold border-slate-200 text-slate-600 hover:bg-white hover:border-slate-300">
                        <Share2 className="w-4 h-4" />
                        Compartir
                    </Button>
                    <Button className="bg-primary hover:bg-primary/90 text-white font-bold rounded-2xl gap-2 shadow-xl shadow-primary/20 transition-all active:scale-95">
                        <Sparkles className="w-4 h-4" />
                        Estudiar ahora
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-xl border border-slate-100 bg-white">
                        <Settings className="w-5 h-5 text-slate-400" />
                    </Button>
                </div>
            </div>

            {/* Stats Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: "Documentos", value: workspace.documentsCount, icon: FileText, color: "text-blue-500", bg: "bg-blue-50" },
                    { label: "Flashcards", value: workspace.flashcardsCount, icon: Layers, color: "text-emerald-500", bg: "bg-emerald-50" },
                    { label: "Quizzes", value: workspace.quizzesCount, icon: Zap, color: "text-orange-500", bg: "bg-orange-50" },
                    { label: "Progreso", value: `${workspace.progress}%`, icon: CheckCircle2, color: "text-primary", bg: "bg-primary/5" },
                ].map((stat, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white border border-slate-100 p-5 rounded-4xl shadow-sm space-y-3"
                    >
                        <div className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}>
                            <stat.icon className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                            <p className="text-2xl font-black text-slate-900">{stat.value}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Main Content Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Left Side: Content Tabs */}
                <div className="lg:col-span-8 space-y-6">
                    {/* Tab Navigation */}
                    <div className="flex bg-white/50 backdrop-blur-sm p-1.5 rounded-4xl border border-slate-200/60 w-fit">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as Tab)}
                                className={`flex items-center gap-2 px-6 py-3 rounded-3xl transition-all text-sm font-bold ${
                                    activeTab === tab.id 
                                    ? 'bg-white text-primary shadow-sm ring-1 ring-slate-200/50' 
                                    : 'text-slate-400 hover:text-slate-600'
                                }`}
                            >
                                <tab.icon className="w-4 h-4" />
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            transition={{ duration: 0.2 }}
                            className="space-y-6"
                        >
                            {activeTab === 'docs' && <DocumentsView />}
                            {activeTab === 'flashcards' && <FlashcardsView />}
                            {activeTab === 'quizzes' && <QuizzesView />}
                            {activeTab === 'analysis' && <AnalysisView />}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Right Side: AI Assistant Quick Chat & Progress sidebar */}
                <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit space-y-6">
                    <div className="bg-slate-900 rounded-4xl p-6 text-white shadow-2xl shadow-slate-900/20 relative overflow-hidden group">
                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary blur-[80px] opacity-20 group-hover:opacity-30 transition-opacity" />
                        
                        <div className="relative space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center">
                                    <Sparkles className="w-6 h-6 text-primary" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-black text-lg">Memo Assistant</h3>
                                    <p className="text-white/50 text-[10px] uppercase font-bold tracking-widest">En línea • Experto en Anatomía</p>
                                </div>
                            </div>

                            <div className="bg-white/5 rounded-3xl p-4 text-sm font-medium leading-relaxed border border-white/10">
                                &quot;¡He analizado tus nuevos documentos! He detectado que el Sistema Axial es el tema con más contenido. ¿Quieres que prepare un cuestionario rápido sobre esto?&quot;
                            </div>

                            <div className="space-y-3">
                                <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold rounded-2xl gap-2 py-6 shadow-lg shadow-primary/20">
                                    <MessageSquare className="w-4 h-4" />
                                    Continuar Chat
                                </Button>
                                <div className="flex gap-2">
                                    <button className="flex-1 bg-white/5 hover:bg-white/10 p-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-colors cursor-pointer">Resumir</button>
                                    <button className="flex-1 bg-white/5 hover:bg-white/10 p-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-colors cursor-pointer">Explorar</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-slate-100 p-6 rounded-4xl shadow-sm space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="font-black text-slate-800 uppercase tracking-widest text-[11px]">Tu Aprendizaje</h3>
                            <CheckCircle2 className="w-5 h-5 text-primary" />
                        </div>
                        <div className="space-y-4">
                            {[
                                { name: "Anatomía Axial", progress: 90 },
                                { name: "Sistema Apendicular", progress: 45 },
                                { name: "Articulaciones", progress: 12 },
                            ].map((item, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between text-[11px] font-bold text-slate-600">
                                        <span>{item.name}</span>
                                        <span>{item.progress}%</span>
                                    </div>
                                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary" style={{ width: `${item.progress}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function DocumentsView() {
    const docs = [
        { id: 1, name: "Sistema_Oseo_Completo.pdf", type: "pdf", size: "4.2 MB", added: "Hoy", status: "Analizado" },
        { id: 2, name: "Clase_Huesos_Craeneo.mp4", type: "video", size: "128 MB", added: "Ayer", status: "Transcrito" },
        { id: 3, name: "Diagrama_Femur_HD.png", type: "image", size: "1.5 MB", added: "Hace 2 días", status: "Analizado" },
    ];

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder="Buscar documentos..." 
                        className="w-full bg-white border border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-sm font-medium focus:ring-0 focus:border-primary outline-none shadow-sm"
                    />
                </div>
                <Button className="bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold gap-2 ml-4">
                    <Plus className="w-4 h-4" />
                    Subir Material
                </Button>
            </div>

            <div className="space-y-3">
                {docs.map((doc) => (
                    <div key={doc.id} className="bg-white border border-slate-100 p-4 rounded-3xl flex items-center gap-4 group hover:border-primary/20 hover:shadow-md transition-all">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                            doc.type === 'pdf' ? 'bg-blue-50 text-blue-500' :
                            doc.type === 'video' ? 'bg-red-50 text-red-500' :
                            'bg-emerald-50 text-emerald-500'
                        }`}>
                            {doc.type === 'pdf' && <FileText className="w-6 h-6" />}
                            {doc.type === 'video' && <Video className="w-6 h-6" />}
                            {doc.type === 'image' && <ImageIcon className="w-6 h-6" />}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-slate-900 truncate">{doc.name}</h4>
                            <p className="text-[11px] text-slate-400 font-medium">{doc.size} • Añadido {doc.added}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="hidden md:block bg-slate-100 text-slate-500 text-[10px] font-black uppercase px-2 py-1 rounded-md tracking-tighter">
                                {doc.status}
                            </span>
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button variant="ghost" size="icon" className="rounded-xl hover:bg-slate-50">
                                    <Play className="w-4 h-4 text-primary" />
                                </Button>
                                <Button variant="ghost" size="icon" className="rounded-xl hover:bg-slate-50">
                                    <Download className="w-4 h-4 text-slate-400" />
                                </Button>
                                <Button variant="ghost" size="icon" className="rounded-xl hover:bg-slate-50">
                                    <MoreVertical className="w-4 h-4 text-slate-400" />
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function FlashcardsView() {
    const params = useParams();
    const workspaceId = params.id as string;

    const decks = [
        { id: 'deck-1', name: "Conceptos Básicos", cards: 12, mastery: 80, color: "from-blue-400 to-indigo-500" },
        { id: 'deck-2', name: "Huesos del Cráneo", cards: 22, mastery: 45, color: "from-emerald-400 to-teal-500" },
        { id: 'deck-3', name: "Columna Vertebral", cards: 15, mastery: 10, color: "from-orange-400 to-red-500" },
    ];

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {decks.map((deck) => (
                    <Link key={deck.id} href={`/dashboard/workspaces/${workspaceId}/flashcards/${deck.id}`}>
                        <motion.div 
                            whileHover={{ y: -5, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-white border border-slate-100 p-1 rounded-4xl shadow-sm cursor-pointer group relative overflow-hidden"
                        >
                            <div className={`absolute top-0 left-0 w-full h-2 bg-linear-to-r ${deck.color}`} />
                            <div className="p-7 space-y-6">
                                <div className="flex justify-between items-start">
                                    <div className={`w-14 h-14 bg-linear-to-br ${deck.color} rounded-2xl flex items-center justify-center shadow-lg transform group-hover:rotate-6 transition-transform`}>
                                        <Layers className="w-7 h-7 text-white" />
                                    </div>
                                    <div className="px-3 py-1 bg-slate-50 rounded-lg border border-slate-100">
                                        <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{deck.cards} Cartas</span>
                                    </div>
                                </div>
                                
                                <div className="space-y-1">
                                    <h4 className="font-black text-slate-900 text-lg leading-tight group-hover:text-primary transition-colors">{deck.name}</h4>
                                    <p className="text-xs font-bold text-slate-400">Dominio: {deck.mastery}%</p>
                                </div>

                                <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                                    <span className="text-[10px] font-black uppercase text-primary tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all">
                                        Jugar Mazo
                                        <Play className="w-3 h-3 fill-current" />
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </Link>
                ))}
                
                {/* Create New Deck Card */}
                <motion.div 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="border-2 border-dashed border-slate-200 p-8 rounded-4xl flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary/30 hover:bg-primary/5 transition-all min-h-[240px]"
                >
                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 text-slate-300 group-hover:text-primary transition-colors">
                        <Plus className="w-8 h-8" />
                    </div>
                    <h4 className="font-bold text-slate-900">Crear Nuevo Mazo</h4>
                    <p className="text-xs font-medium text-slate-400 mt-1">Manual o con IA</p>
                </motion.div>
            </div>
        </div>
    );
}

function QuizzesView() {
    const params = useParams();
    const workspaceId = params.id as string;
    
    const quizzes = [
        { id: 'quiz-1', name: "Evaluación: Cráneo y Columna", score: 85, total: 100, date: "Ayer", status: "Completado" },
        { id: 'quiz-2', name: "Quiz: Sistema Apendicular", score: null, total: 20, date: "Pendiente", status: "Nuevo" },
    ];

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quizzes.map((quiz) => (
                    <div key={quiz.id} className="bg-white border border-slate-100 p-6 rounded-4xl shadow-sm space-y-4">
                        <div className="flex justify-between items-start">
                            <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center">
                                <Zap className="w-6 h-6" />
                            </div>
                            {quiz.score !== null ? (
                                <div className="text-right">
                                    <p className="text-2xl font-black text-slate-900">{quiz.score}/{quiz.total}</p>
                                    <p className="text-[10px] font-black uppercase text-emerald-500 tracking-widest">Puntuación</p>
                                </div>
                            ) : (
                                <span className="bg-blue-50 text-blue-600 text-[10px] font-black uppercase px-2 py-1 rounded-md tracking-tighter">Disponible</span>
                            )}
                        </div>
                        <h4 className="font-bold text-slate-900 text-lg">{quiz.name}</h4>
                        <div className="flex items-center justify-between pt-2">
                            <span className="text-xs font-medium text-slate-400">{quiz.date}</span>
                            <Link href={`/dashboard/workspaces/${workspaceId}/quizzes/${quiz.id}`}>
                                <Button className={`${quiz.score !== null ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' : 'bg-primary text-white shadow-lg shadow-primary/20'} rounded-xl font-bold px-6`}>
                                    {quiz.score !== null ? 'Revisar' : 'Comenzar'}
                                </Button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="bg-slate-900 p-8 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between text-white overflow-hidden relative gap-6">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] -mr-32 -mt-32" />
                <div className="relative space-y-2 text-center md:text-left">
                    <h3 className="text-xl font-black">¿Un desafío rápido?</h3>
                    <p className="text-white/50 text-sm font-medium">Genera un quiz personalizado basado en tus últimos archivos.</p>
                </div>
                <Button className="relative bg-white text-slate-900 hover:bg-white/90 font-black rounded-2xl px-8 py-6 shadow-xl">
                    Generar Quiz IA
                </Button>
            </div>
        </div>
    );
}

function AnalysisView() {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white border border-slate-100 p-8 rounded-4xl shadow-sm space-y-6">
                    <h4 className="font-black text-slate-900 uppercase tracking-widest text-[10px] flex items-center gap-2">
                        <Brain className="w-4 h-4 text-primary" />
                        Mapa de Conceptos
                    </h4>
                    <div className="space-y-4">
                        {[
                            { concept: "Osteología", relevance: 100 },
                            { concept: "Columna Vertebral", relevance: 85 },
                            { concept: "Huesos Largos", relevance: 60 },
                            { concept: "Médula Ósea", relevance: 40 },
                        ].map((c, i) => (
                            <div key={i} className="space-y-2">
                                <div className="flex justify-between text-[11px] font-bold">
                                    <span className="text-slate-700">{c.concept}</span>
                                    <span className="text-primary">{c.relevance}%</span>
                                </div>
                                <div className="h-1.5 bg-slate-50 rounded-full">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: `${c.relevance}%` }}
                                        className="h-full bg-primary rounded-full" 
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white border border-slate-100 p-8 rounded-4xl shadow-sm space-y-6">
                    <h4 className="font-black text-slate-900 uppercase tracking-widest text-[10px] flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-primary" />
                        Puntos Clave Detectados
                    </h4>
                    <ul className="space-y-4">
                        {[
                            "El cráneo cuenta con 8 huesos craneales y 14 faciales.",
                            "La columna vertebral se divide en 5 regiones distintas.",
                            "El fémur no es solo el más largo, también el más resistente.",
                        ].map((point, i) => (
                            <li key={i} className="flex gap-4 p-4 bg-slate-50/50 rounded-2xl border border-slate-100/50">
                                <div className="w-6 h-6 bg-primary/10 text-primary rounded-lg flex items-center justify-center shrink-0 font-black text-[10px]">
                                    {i + 1}
                                </div>
                                <p className="text-sm font-medium text-slate-600 leading-snug">{point}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

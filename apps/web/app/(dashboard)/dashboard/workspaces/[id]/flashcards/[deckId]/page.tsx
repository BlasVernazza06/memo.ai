'use client';

// React
import { useState } from "react";

// Next
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

// External packages
import { 
    ChevronLeft, 
    RotateCcw, 
    Check, 
    X, 
    Trophy,
    ArrowRight,
    HelpCircle,
    Clock,
    Zap,
    AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Components
import { Button } from "@repo/ui/components/ui/button";

export default function FlashcardGamePage() {
    const params = useParams();
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [gameState, setGameState] = useState<'playing' | 'completed'>('playing');
    const [score, setScore] = useState({ known: 0, unknown: 0 });

    const deckId = params.deckId as string;
    const workspaceId = params.id as string;

    // Mock data based on deckId logic could be here
    const cards = [
        { id: 1, question: "¿Cuál es el hueso más largo del cuerpo humano?", answer: "El fémur." },
        { id: 2, question: "¿Cuántas vértebras cervicales tiene el ser humano?", answer: "Siete vértebras." },
        { id: 3, question: "¿Qué hueso protege el cerebro?", answer: "El cráneo." },
        { id: 4, question: "¿Dónde se encuentra el hueso hioides?", answer: "En el cuello, debajo de la lengua (no articula con otro hueso)." },
        { id: 5, question: "¿Cuál es la función principal de la caja torácica?", answer: "Proteger el corazón y los pulmones." },
    ];

    const handleFlip = () => setIsFlipped(!isFlipped);

    const handleNext = (known: boolean) => {
        setScore(prev => ({
            ...prev,
            known: known ? prev.known + 1 : prev.known,
            unknown: !known ? prev.unknown + 1 : prev.unknown
        }));

        setIsFlipped(false);

        if (currentIndex < cards.length - 1) {
            setTimeout(() => setCurrentIndex(currentIndex + 1), 200);
        } else {
            setGameState('completed');
        }
    };

    const restartGame = () => {
        setCurrentIndex(0);
        setScore({ known: 0, unknown: 0 });
        setGameState('playing');
        setIsFlipped(false);
    };

    if (gameState === 'completed') {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center max-w-2xl mx-auto space-y-8 text-center p-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    className="w-24 h-24 bg-yellow-100 text-yellow-500 rounded-full flex items-center justify-center mb-4 mx-auto shadow-xl shadow-yellow-500/20"
                >
                    <Trophy className="w-12 h-12" />
                </motion.div>
                
                <div className="space-y-2">
                    <h1 className="text-4xl font-black text-slate-900">¡Sesión Completada!</h1>
                    <p className="text-slate-500 font-medium text-lg">Has repasado {cards.length} tarjetas.</p>
                </div>

                <div className="grid grid-cols-2 gap-4 w-full px-4 md:px-0">
                    <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-3xl space-y-1">
                        <p className="text-4xl font-black text-emerald-600">{score.known}</p>
                        <p className="text-xs font-bold uppercase text-emerald-400 tracking-widest">Dominadas</p>
                    </div>
                    <div className="bg-orange-50 border border-orange-100 p-6 rounded-3xl space-y-1">
                        <p className="text-4xl font-black text-orange-600">{score.unknown}</p>
                        <p className="text-xs font-bold uppercase text-orange-400 tracking-widest">A repasar</p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full pt-6 px-4 md:px-0">
                    <Button onClick={restartGame} variant="outline" className="flex-1 h-14 rounded-2xl border-slate-200 text-slate-600 font-bold hover:bg-slate-50 hover:text-slate-900 transition-colors">
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Repetir Mazo
                    </Button>
                    <Link href={`/dashboard/workspaces/${workspaceId}`} className="flex-1 w-full block">
                        <Button className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold shadow-xl shadow-primary/20 transition-all active:scale-95">
                            Volver al Workspace
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    const currentCard = cards[currentIndex];

    return (
        <div className="max-w-3xl mx-auto space-y-6 pb-10 pt-4 px-4 md:px-0">
            {/* Header */}
            <div className="flex items-center justify-between">
                <Link href={`/dashboard/workspaces/${workspaceId}`} className="group flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors font-bold text-sm">
                    <div className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-slate-100 flex items-center justify-center transition-colors">
                        <ChevronLeft className="w-4 h-4" />
                    </div>
                    <span>Salir</span>
                </Link>
                <div className="flex items-center gap-3 bg-white border border-slate-100 rounded-full pl-4 pr-1 py-1 shadow-sm">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Progreso</span>
                    <div className="bg-slate-100 px-3 py-1 rounded-full text-xs font-black text-slate-900">
                        {currentIndex + 1} / {cards.length}
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden w-full">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
                    className="h-full bg-primary transition-all duration-500 ease-out"
                />
            </div>

            {/* Flashcard Area */}
            <div className="h-[420px] w-full perspective-1000 group cursor-pointer select-none" onClick={handleFlip}>
                <motion.div 
                    initial={false}
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 20 }}
                    className="w-full h-full relative preserve-3d shadow-xl hover:shadow-2xl hover:shadow-primary/5 transition-shadow rounded-[2.5rem]"
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    {/* Front */}
                    <div 
                        className="absolute inset-0 backface-hidden bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-12 flex flex-col items-center justify-center text-center z-10"
                        style={{ backfaceVisibility: 'hidden' }}
                    >
                        <div className="w-14 h-14 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mb-8 shadow-sm">
                            <HelpCircle className="w-7 h-7" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black text-slate-800 leading-tight max-w-lg">
                            {currentCard?.question}
                        </h3>
                        <p className="absolute bottom-10 text-slate-300 font-bold text-xs uppercase tracking-[0.2em] animate-pulse">
                            Tocá para ver respuesta
                        </p>
                    </div>

                    {/* Back */}
                    <div 
                        className="absolute inset-0 backface-hidden bg-slate-900 text-white rounded-[2.5rem] p-8 md:p-12 flex flex-col items-center justify-center text-center"
                        style={{ transform: "rotateY(180deg)", backfaceVisibility: 'hidden' }}
                    >
                        <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-sm">
                            <Check className="w-7 h-7 text-emerald-400" />
                        </div>
                        <h3 className="text-xl md:text-2xl font-medium leading-relaxed max-w-lg">
                            {currentCard?.answer}
                        </h3>
                        <p className="absolute bottom-10 text-white/20 font-bold text-xs uppercase tracking-[0.2em]">
                            Respuesta Correcta
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Controls */}
            <div className="grid grid-cols-3 items-center gap-4 max-w-md mx-auto pt-6">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex flex-col items-center gap-2">
                    <Button 
                        onClick={(e) => { e.stopPropagation(); handleNext(false); }}
                        className="w-16 h-16 rounded-3xl bg-white border-2 border-orange-100 text-orange-400 hover:bg-orange-500 hover:text-white hover:border-orange-500 shadow-lg shadow-orange-500/10 transition-all duration-300 flex items-center justify-center p-0"
                    >
                        <X className="w-8 h-8" />
                    </Button>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Difícil</span>
                </motion.div>

                <div className="flex justify-center -mt-8 relative z-10">
                     <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button 
                            onClick={(e) => { e.stopPropagation(); handleFlip(); }}
                            className="w-24 h-24 rounded-[2rem] bg-indigo-600 hover:bg-indigo-500 text-white shadow-2xl shadow-indigo-600/30 flex items-center justify-center p-0 border-4 border-slate-50"
                        >
                            <div className="flex flex-col items-center gap-1">
                                {isFlipped ? <ArrowRight className="w-8 h-8 animate-in slide-in-from-left-2 fade-in duration-300" /> : <Zap className="w-8 h-8" />}
                                <span className="text-[9px] uppercase font-black tracking-widest opacity-80 leading-none">{isFlipped ? 'Siguiente' : 'Voltear'}</span>
                            </div>
                        </Button>
                    </motion.div>
                </div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex flex-col items-center gap-2">
                    <Button 
                        onClick={(e) => { e.stopPropagation(); handleNext(true); }}
                        className="w-16 h-16 rounded-3xl bg-white border-2 border-emerald-100 text-emerald-400 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 shadow-lg shadow-emerald-500/10 transition-all duration-300 flex items-center justify-center p-0"
                    >
                        <Check className="w-8 h-8" />
                    </Button>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Fácil</span>
                </motion.div>
            </div>
        </div>
    );
}

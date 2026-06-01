'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, FileText, Sparkles, Trophy, Check, X, RefreshCw } from 'lucide-react';

interface MockWorkspace {
  id: number;
  name: string;
  category: string;
  mastery: string;
  masteryPercentage: number;
  mainQuestion: string;
  snippet: string;
  documents: string[];
  color: string;
  quiz: {
    question: string;
    options: { text: string; correct: boolean }[];
    explanation: string;
  };
}

const WORKSPACES: MockWorkspace[] = [
  {
    id: 1,
    name: 'Neurociencia Sistémica',
    category: 'Fisiología',
    mastery: '98%',
    masteryPercentage: 98,
    mainQuestion: '¿Cómo se propagan los potenciales de acción en el axón?',
    snippet: 'La propagación se produce a lo largo del axón mediante la apertura secuencial de canales de sodio y potasio regulados por voltaje...',
    documents: ['Fisiología Neuronal.pdf', 'Sinapsis Química.txt'],
    color: 'from-violet-500 to-indigo-500',
    quiz: {
      question: '¿Qué célula mieliniza los axones en el Sistema Nervioso Central (SNC)?',
      options: [
        { text: 'Célula de Schwann', correct: false },
        { text: 'Oligodendrocito', correct: true },
        { text: 'Astrocito', correct: false },
      ],
      explanation: 'Los oligodendrocitos mielinizan múltiples axones en el SNC, mientras que las células de Schwann lo hacen en el SNP.',
    },
  },
  {
    id: 2,
    name: '🤖 Inteligencia Artificial',
    category: 'Ciencia de Datos',
    mastery: '82%',
    masteryPercentage: 82,
    mainQuestion: '¿Qué es el mecanismo de Autoatención en Transformers?',
    snippet: 'Permite que el modelo asocie y pondere dinámicamente la relevancia de diferentes palabras en una secuencia, sin importar la distancia...',
    documents: ['Paper_Transformers.pdf', 'Atencion_Explicada.docx'],
    color: 'from-emerald-500 to-teal-500',
    quiz: {
      question: '¿Qué componente introdujo la arquitectura Transformer para prescindir de la recurrencia?',
      options: [
        { text: 'Mecanismo de Autoatención', correct: true },
        { text: 'Filtros Convolucionales', correct: false },
        { text: 'Capas LSTM densas', correct: false },
      ],
      explanation: 'El mecanismo de autoatención (self-attention) permite procesar secuencias en paralelo eliminando la necesidad de recurrencia.',
    },
  },
  {
    id: 3,
    name: '🎨 Historia del Diseño',
    category: 'Humanidades',
    mastery: '75%',
    masteryPercentage: 75,
    mainQuestion: '¿Cuál es el postulado principal de la Bauhaus?',
    snippet: 'La Bauhaus unificó el arte y la artesanía con la premisa de "la forma sigue a la función", influyendo profundamente en la modernidad...',
    documents: ['Manifiesto_Bauhaus.pdf', 'Tipografia_Suiza.txt'],
    color: 'from-amber-500 to-orange-500',
    quiz: {
      question: '¿Quién fundó la escuela alemana de diseño Bauhaus en 1919?',
      options: [
        { text: 'Walter Gropius', correct: true },
        { text: 'Le Corbusier', correct: false },
        { text: 'Mies van der Rohe', correct: false },
      ],
      explanation: 'Walter Gropius fundó la Bauhaus en Weimar con la intención de unificar las bellas artes con los oficios prácticos.',
    },
  },
];

export function BrowserMockup() {
  const [activeId, setActiveId] = useState(1);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizFinished, setQuizFinished] = useState(false);

  const activeWs = (WORKSPACES.find(w => w.id === activeId) || WORKSPACES[0]) as MockWorkspace;

  const handleSelectOption = (idx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);
    setQuizFinished(true);
  };

  const handleResetQuiz = () => {
    setSelectedOption(null);
    setQuizFinished(false);
    setShowQuiz(false);
  };

  const handleWsSwitch = (id: number) => {
    setActiveId(id);
    setSelectedOption(null);
    setQuizFinished(false);
    setShowQuiz(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100, rotateX: 15, rotateY: -10 }}
      animate={{ opacity: 1, y: 0, rotateX: 10, rotateY: -5 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ rotateX: 5, rotateY: -2, scale: 1.01 }}
      className="relative z-20 w-full aspect-[16/10] bg-[#0F1115] rounded-[2rem] border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] overflow-hidden"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Premium Browser Header */}
      <div className="h-14 bg-white/[0.03] border-b border-white/[0.08] px-8 flex items-center justify-between backdrop-blur-md">
        <div className="flex gap-2.5">
          <div className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] shadow-[0_0_10px_rgba(255,95,86,0.3)] cursor-pointer" onClick={() => handleWsSwitch(1)} />
          <div className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] shadow-[0_0_10px_rgba(255,189,46,0.2)] cursor-pointer" onClick={() => handleWsSwitch(2)} />
          <div className="w-3.5 h-3.5 rounded-full bg-[#27C93F] shadow-[0_0_10px_rgba(39,201,63,0.3)] cursor-pointer" onClick={() => handleWsSwitch(3)} />
        </div>
        <div className="flex items-center gap-2.5 px-6 py-1.5 bg-white/5 border border-white/5 rounded-2xl text-[9px] uppercase font-black tracking-widest text-white/40">
          <Brain className="w-3 h-3 text-primary animate-pulse" />
          <span>memo.ai / {activeWs.name.toLowerCase().replace(/[^a-z0-9]/g, '')}</span>
        </div>
        <div className="flex -space-x-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0F1115] bg-white/10 overflow-hidden flex items-center justify-center text-[10px] font-black text-white/50 uppercase">
              {i === 1 ? 'AI' : i === 2 ? 'ME' : 'MO'}
            </div>
          ))}
        </div>
      </div>

      {/* Dashboard App Grid Mockup */}
      <div className="h-full w-full grid grid-cols-12 overflow-hidden">
        {/* Sidebar Partial */}
        <div className="col-span-3 border-r border-white/5 p-6 space-y-8 bg-zinc-950/20">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
               <Sparkles className="w-5 h-5 text-white" />
             </div>
             <div className="space-y-1">
               <div className="h-3 w-16 bg-white/40 rounded-full" />
               <div className="h-2 w-10 bg-white/20 rounded-full" />
             </div>
          </div>
          
          <div className="space-y-4">
            <div className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em] px-2">Workspaces</div>
            <div className="space-y-2">
              {WORKSPACES.map(ws => (
                <button
                  key={ws.id}
                  onClick={() => handleWsSwitch(ws.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all duration-300 text-left ${
                    ws.id === activeId
                      ? 'bg-white/10 border border-white/10 shadow-xl'
                      : 'hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    ws.id === activeId ? 'bg-primary/20 text-primary' : 'bg-white/5 text-white/40'
                  }`}>
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="overflow-hidden">
                    <div className={`text-xs font-bold truncate ${ws.id === activeId ? 'text-white' : 'text-white/60'}`}>
                      {ws.name.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ ]/g, '').trim()}
                    </div>
                    <div className="text-[9px] font-semibold text-white/30 uppercase mt-0.5 tracking-wider">
                      {ws.category}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Main Area Preview */}
        <div className="col-span-9 p-8 md:p-10 bg-[#0F1115] relative overflow-y-auto pb-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Header within app */}
              <div className="flex items-center justify-between gap-4">
                 <div className="space-y-1">
                   <p className="text-[9px] font-black text-primary uppercase tracking-widest">Workspace Activo</p>
                   <h4 className="text-2xl font-black text-white tracking-tight">{activeWs.name}</h4>
                 </div>
                 <div className="flex items-center gap-3 shrink-0">
                   <button
                     onClick={() => setShowQuiz(true)}
                     className="px-4 py-2.5 bg-primary hover:bg-primary/95 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-xl shadow-primary/20 transition-all flex items-center gap-2"
                   >
                     <Sparkles className="w-3.5 h-3.5 fill-current" />
                     <span>Generar Quiz</span>
                   </button>
                 </div>
              </div>

              {/* Main Interactive Screen with switchable status */}
              <div className="grid grid-cols-12 gap-6 relative">
                {showQuiz ? (
                  /* Quiz simulation screen */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="col-span-12 bg-white/5 border border-white/10 rounded-[2rem] p-8 backdrop-blur-xl space-y-6"
                  >
                    <div className="flex items-center justify-between border-b border-white/5 pb-4">
                      <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
                        <Sparkles className="w-4 h-4 animate-spin-slow" />
                        <span>Quiz Generado por IA</span>
                      </div>
                      <button
                        onClick={handleResetQuiz}
                        className="text-[9px] font-black uppercase tracking-widest text-white/50 hover:text-white flex items-center gap-1.5 transition-colors"
                      >
                        <RefreshCw className="w-3 h-3" /> Reiniciar
                      </button>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-base font-black text-white leading-relaxed">
                        {activeWs.quiz.question}
                      </h3>

                      <div className="space-y-2.5">
                        {activeWs.quiz.options.map((opt, idx) => {
                          const isSelected = selectedOption === idx;
                          let btnStyle = 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10';
                          
                          if (selectedOption !== null) {
                            if (opt.correct) {
                              btnStyle = 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300';
                            } else if (isSelected) {
                              btnStyle = 'bg-rose-500/20 border-rose-500/50 text-rose-300';
                            } else {
                              btnStyle = 'opacity-40 bg-transparent border-white/5 text-white/40';
                            }
                          }

                          return (
                            <button
                              key={idx}
                              onClick={() => handleSelectOption(idx)}
                              disabled={selectedOption !== null}
                              className={`w-full p-4 rounded-xl border text-left text-xs font-bold flex items-center justify-between transition-all ${btnStyle}`}
                            >
                              <span>{opt.text}</span>
                              {selectedOption !== null && opt.correct && (
                                <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
                              )}
                              {isSelected && !opt.correct && (
                                <X className="w-4 h-4 text-rose-400 stroke-[3]" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {quizFinished && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-white/5 rounded-xl border border-white/5 text-[11px] text-white/60 leading-relaxed font-semibold"
                      >
                        💡 <strong className="text-white">Explicación:</strong> {activeWs.quiz.explanation}
                      </motion.div>
                    )}
                  </motion.div>
                ) : (
                  /* Standard document view */
                  <>
                    <div className="col-span-8 space-y-6">
                      <div className="bg-white/5 border border-white/5 rounded-[2rem] p-8 backdrop-blur-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-6">
                          <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
                            <Sparkles className="w-5 h-5" />
                          </div>
                        </div>
                        <div className="space-y-6">
                          <div className="flex items-center gap-3">
                             <div className="p-2.5 bg-white/5 rounded-lg border border-white/10 text-white/60">
                               <FileText className="w-5 h-5" />
                             </div>
                             <div>
                               <div className="text-[10px] font-black text-white/40 uppercase tracking-widest">Documento Activo</div>
                               <h5 className="text-xs font-bold text-white mt-0.5">{activeWs.documents[0]}</h5>
                             </div>
                          </div>
                          
                          <div className="pt-4 space-y-4">
                            <h3 className="text-lg font-black text-white leading-tight">{activeWs.mainQuestion}</h3>
                            <div className="bg-white/5 border border-white/5 rounded-2xl p-5 leading-relaxed text-xs text-white/60 font-medium select-none shadow-inner min-h-[90px]">
                              {activeWs.snippet}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Sidebar stats cards */}
                    <div className="col-span-4 space-y-6">
                      <div className={`bg-gradient-to-br ${activeWs.color} rounded-[2rem] p-6 shadow-2xl relative overflow-hidden group transition-all duration-300`}>
                        <div className="absolute -right-6 -bottom-6 w-20 h-20 bg-white/10 rounded-full blur-xl" />
                        <Trophy className="w-8 h-8 text-white mb-4 transition-transform group-hover:scale-110 relative z-10" />
                        <div className="space-y-1 relative z-10">
                          <div className="text-3xl font-black text-white tracking-tighter">{activeWs.mastery}</div>
                          <div className="text-[9px] font-black text-white/70 uppercase tracking-widest">Dominio alcanzado</div>
                        </div>
                      </div>
                      <div className="bg-white/5 border border-white/5 rounded-[2rem] p-6 space-y-4">
                        <div className="flex -space-x-2">
                           {activeWs.documents.map((doc, idx) => (
                             <div key={idx} className="w-8 h-8 rounded-full border-2 border-[#0F1115] bg-white/10 flex items-center justify-center text-[8px] font-black text-white/60 uppercase">
                               {doc.split('.').pop()}
                             </div>
                           ))}
                           <div className="w-8 h-8 rounded-full border-2 border-[#0F1115] bg-primary flex items-center justify-center text-[8px] font-black text-white">+1</div>
                        </div>
                        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                           <motion.div 
                             className="h-full bg-primary" 
                             initial={{ width: 0 }}
                             animate={{ width: `${activeWs.masteryPercentage}%` }}
                             transition={{ duration: 1 }}
                           />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}


'use client';

// React
// External packages
// Next
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { useState } from 'react';

import {
  AlertCircle,
  ArrowRight,
  Check,
  ChevronLeft,
  RotateCcw,
  Timer,
  Trophy,
  X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

// Components
import { Button } from '@repo/ui/components/ui/button';

export default function QuizGamePage() {
  const params = useParams();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<'playing' | 'completed'>(
    'playing',
  );

  const workspaceId = params.id as string;

  // Mock data for quiz
  const questions = [
    {
      id: 1,
      question: '¿Cuál de los siguientes huesos pertenece al esqueleto axial?',
      options: ['Fémur', 'Esternón', 'Tibia', 'Húmero'],
      correctIndex: 1,
      explanation:
        'El esqueleto axial incluye el cráneo, la columna vertebral y la caja torácica (donde está el esternón).',
    },
    {
      id: 2,
      question:
        '¿Qué tipo de articulación permite el mayor rango de movimiento?',
      options: [
        'Sinartrosis',
        'Anfiartrosis',
        'Diartrosis (Sinovial)',
        'Suturas',
      ],
      correctIndex: 2,
      explanation:
        'Las diartrosis o articulaciones sinoviales, como la del hombro, permiten movimientos amplios.',
    },
    {
      id: 3,
      question: 'La médula ósea roja es responsable de:',
      options: [
        'Almacenar grasa',
        'Producir células sanguíneas',
        'Proteger nervios',
        'Absorber calcio',
      ],
      correctIndex: 1,
      explanation:
        'La hematopoyesis (producción de células sanguíneas) ocurre en la médula ósea roja.',
    },
  ];

  const currentQuestion = questions[currentQuestionIndex];
  const [shake, setShake] = useState(false);

  const handleOptionSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
  };

  const handleSubmitAnswer = () => {
    setIsAnswered(true);
    if (selectedOption === currentQuestion?.correctIndex) {
      setScore((prev) => prev + 1);
      // Trigger success animation logic here if needed (e.g. confetti)
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setShake(false);
    } else {
      setGameState('completed');
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setGameState('playing');
    setShake(false);
  };

  if (gameState === 'completed') {
    const percentage = Math.round((score / questions.length) * 100);
    const correctAnswers = score;
    const incorrectAnswers = questions.length - score;

    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center max-w-2xl mx-auto space-y-8 text-center p-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 10 }}
          className={`w-32 h-32 rounded-full flex items-center justify-center mb-4 mx-auto shadow-2xl ${
            percentage >= 70
              ? 'bg-emerald-100 text-emerald-500 shadow-emerald-500/20'
              : 'bg-orange-100 text-orange-500 shadow-orange-500/20'
          }`}
        >
          <Trophy className="w-16 h-16" />
        </motion.div>

        <div className="space-y-4">
          <h1 className="text-4xl font-black text-slate-900">
            {percentage >= 70 ? '¡Excelente Trabajo!' : 'Buen Intento'}
          </h1>
          <p className="text-slate-500 font-medium text-lg max-w-md mx-auto">
            Has completado el quiz. Aquí tienes un resumen de tu desempeño.
          </p>
        </div>

        <div className="bg-white border border-slate-100 p-8 rounded-[2rem] w-full shadow-sm">
          <div className="flex justify-center items-end gap-2 mb-2">
            <span className="text-6xl font-black text-slate-900">
              {percentage}%
            </span>
            <span className="text-xl font-bold text-slate-400 mb-2">
              Aciertos
            </span>
          </div>
          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden mb-6">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ delay: 0.5, duration: 1 }}
              className={`h-full ${percentage >= 70 ? 'bg-emerald-500' : 'bg-orange-500'}`}
            />
          </div>
          <div className="flex justify-between mt-4 text-xs font-bold uppercase tracking-widest text-slate-400">
            <span>{correctAnswers} Correctas</span>
            <span>{incorrectAnswers} Incorrectas</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full pt-6">
          <Button
            onClick={restartQuiz}
            variant="outline"
            className="flex-1 h-14 rounded-2xl border-slate-200 text-slate-600 font-bold hover:bg-slate-50 hover:text-slate-900 transition-colors"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Repetir Quiz
          </Button>
          <Link
            href={`/dashboard/workspaces/${workspaceId}`}
            className="flex-1 w-full block"
          >
            <Button className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold shadow-xl shadow-primary/20 transition-all active:scale-95">
              Volver al Workspace
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!currentQuestion) return null;

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-10 pt-4 px-4 md:px-0 relative">
      {/* Confetti / Feedback Overlay could be triggered here */}

      {/* Header */}
      <div className="flex items-center justify-between">
        <Link
          href={`/dashboard/workspaces/${workspaceId}`}
          className="group flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors font-bold text-sm"
        >
          <div className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-slate-100 flex items-center justify-center transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </div>
          <span>Salir</span>
        </Link>
        <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-wider bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
          <Timer className="w-4 h-4" />
          <span>Tiempo: 05:23</span>
        </div>
      </div>

      {/* Progress Bar moved below header */}
      <div className="space-y-2">
        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
          <span>Pregunta {currentQuestionIndex + 1}</span>
          <span>{questions.length} Total</span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden w-full">
          <motion.div
            initial={{ width: 0 }}
            animate={{
              width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
            }}
            className="h-full bg-primary transition-all duration-500 ease-out"
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="space-y-8">
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight">
          {currentQuestion.question}
        </h2>

        <div className="grid gap-3">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedOption === index;
            const isCorrect = index === currentQuestion.correctIndex;
            const showResult = isAnswered;

            let cardClass =
              'bg-white border-2 border-slate-100 hover:border-slate-200 hover:bg-slate-50 text-slate-600';
            if (showResult) {
              if (isCorrect)
                cardClass =
                  'bg-emerald-50 border-emerald-200 text-emerald-800 ring-2 ring-emerald-100 shadow-lg shadow-emerald-500/10';
              else if (isSelected && !isCorrect)
                cardClass =
                  'bg-red-50 border-red-200 text-red-800 opacity-80 ring-2 ring-red-100';
              else
                cardClass =
                  'bg-slate-50 border-slate-100 text-slate-400 opacity-50';
            } else if (isSelected) {
              cardClass =
                'bg-primary/5 border-primary text-primary ring-2 ring-primary/20';
            }

            return (
              <motion.button
                key={index}
                whileTap={!isAnswered ? { scale: 0.98 } : {}}
                animate={
                  showResult && isCorrect
                    ? { scale: [1, 1.05, 1], transition: { duration: 0.4 } }
                    : showResult && isSelected && !isCorrect && shake
                      ? {
                          x: [0, -10, 10, -10, 10, 0],
                          transition: { duration: 0.4 },
                        }
                      : {}
                }
                onClick={() => handleOptionSelect(index)}
                disabled={isAnswered}
                className={`w-full p-5 rounded-2xl text-left font-bold transition-all duration-200 flex items-center justify-between group ${cardClass}`}
              >
                <span className="text-lg">{option}</span>
                <AnimatePresence>
                  {showResult && isCorrect && (
                    <motion.div
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="bg-emerald-100 p-1 rounded-full"
                    >
                      <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                    </motion.div>
                  )}
                  {showResult && isSelected && !isCorrect && (
                    <motion.div
                      initial={{ scale: 0, rotate: 45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="bg-red-100 p-1 rounded-full"
                    >
                      <X className="w-5 h-5 text-red-500 shrink-0" />
                    </motion.div>
                  )}
                </AnimatePresence>
                {!showResult && isSelected && (
                  <div className="w-4 h-4 rounded-full bg-primary shrink-0" />
                )}
                {!showResult && !isSelected && (
                  <div className="w-4 h-4 rounded-full border-2 border-slate-200 group-hover:border-slate-300 shrink-0" />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Explanation / Footer */}
      <div className="min-h-[140px]">
        <AnimatePresence mode="wait">
          {isAnswered ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-blue-50/50 border border-blue-100 p-6 rounded-3xl space-y-4"
            >
              <div className="flex items-center gap-2 text-blue-600 font-black text-xs uppercase tracking-widest mb-1">
                <AlertCircle className="w-4 h-4" />
                Explicación
              </div>
              <p className="text-blue-900 font-medium leading-relaxed text-sm md:text-base">
                {currentQuestion.explanation}
              </p>
              <div className="flex justify-end pt-2">
                <Button
                  onClick={handleNextQuestion}
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold px-8 py-6 shadow-lg shadow-blue-500/20 transition-all active:scale-95"
                >
                  {currentQuestionIndex < questions.length - 1
                    ? 'Siguiente Pregunta'
                    : 'Ver Resultados'}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </motion.div>
          ) : (
            <div className="flex justify-end pt-4">
              <Button
                onClick={handleSubmitAnswer}
                disabled={selectedOption === null}
                className="h-14 px-10 rounded-2xl font-bold bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20 disabled:opacity-50 disabled:shadow-none transition-all active:scale-95"
              >
                Confirmar Respuesta
              </Button>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

'use client';

// React
// External packages
// Next
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { useEffect, useState } from 'react';

import {
  AlertCircle,
  ArrowRight,
  Brain,
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

import { apiFetchClient } from '@/lib/api-client';

export default function QuizGamePage() {
  const params = useParams();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<'playing' | 'completed'>(
    'playing',
  );
  const [quiz, setQuiz] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const workspaceId = params.id as string;
  const quizId = params.quizId as string;

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const data = await apiFetchClient<any>(`/quizzes/${quizId}`);
        setQuiz(data);
      } catch (error) {
        console.error('Error loading quiz:', error);
      } finally {
        setIsLoading(false);
      }
    }

    if (quizId) {
      loadData();
    }
  }, [quizId]);

  // Mock data for quiz
  const questions = quiz?.questions || [];

  const currentQuestion = questions[currentQuestionIndex];
  const [shake, setShake] = useState(false);

  const handleOptionSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
  };

  const handleSubmitAnswer = () => {
    setIsAnswered(true);
    if (selectedOption === currentQuestion?.correctAnswer) {
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

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4 animate-pulse">
        <div className="w-20 h-20 bg-muted rounded-full" />
        <div className="h-6 w-48 bg-muted rounded-lg" />
        <div className="h-4 w-32 bg-muted rounded-lg" />
      </div>
    );
  }

  if (!quiz || questions.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-6 text-center px-4">
        <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center text-muted-foreground">
          <Brain className="w-10 h-10 opacity-20" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold">Sin preguntas disponibles</h2>
          <p className="text-muted-foreground">
            Este quiz no tiene preguntas o no se pudo cargar.
          </p>
        </div>
        <Link href={`/dashboard/workspaces/${workspaceId}`}>
          <Button variant="outline">Volver</Button>
        </Link>
      </div>
    );
  }

  if (gameState === 'completed') {
    const percentage = Math.round((score / questions.length) * 100);
    const correctAnswers = score;
    const incorrectAnswers = questions.length - score;

    return (
      <div className="min-h-screen flex flex-col items-center justify-center max-w-2xl mx-auto space-y-8 text-center p-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
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
          <h1 className="text-4xl font-black text-foreground">
            {percentage >= 70 ? '¡Excelente Trabajo!' : 'Buen Intento'}
          </h1>
          <p className="text-muted-foreground font-medium text-lg max-w-md mx-auto">
            Has completado el quiz. Aquí tienes un resumen de tu desempeño.
          </p>
        </div>

        <div className="bg-card border border-border p-8 rounded-4xl w-full shadow-sm">
          <div className="flex justify-center items-end gap-2 mb-2">
            <span className="text-6xl font-black text-foreground">
              {percentage}%
            </span>
            <span className="text-xl font-bold text-muted-foreground mb-2">
              Aciertos
            </span>
          </div>
          <div className="w-full bg-muted h-3 rounded-full overflow-hidden mb-6">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ delay: 0.5, duration: 1 }}
              className={`h-full ${percentage >= 70 ? 'bg-emerald-500' : 'bg-orange-500'}`}
            />
          </div>
          <div className="flex justify-between mt-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
            <span>{correctAnswers} Correctas</span>
            <span>{incorrectAnswers} Incorrectas</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full pt-6">
          <Button
            onClick={restartQuiz}
            variant="outline"
            className="flex-1 h-14 rounded-2xl border-border text-muted-foreground font-bold hover:bg-muted hover:text-foreground transition-colors"
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
          className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-bold text-sm"
        >
          <div className="w-8 h-8 rounded-full bg-muted group-hover:bg-muted/80 flex items-center justify-center transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </div>
          <span>Salir</span>
        </Link>
        <div className="flex items-center gap-2 text-muted-foreground font-bold text-xs uppercase tracking-wider bg-muted px-3 py-1 rounded-full border border-border">
          <Timer className="w-4 h-4" />
          <span>Tiempo: 05:23</span>
        </div>
      </div>

      {/* Progress Bar moved below header */}
      <div className="space-y-2">
        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-muted-foreground">
          <span>Pregunta {currentQuestionIndex + 1}</span>
          <span>{questions.length} Total</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden w-full">
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
        <h2 className="text-2xl md:text-3xl font-black text-foreground leading-tight">
          {currentQuestion.question}
        </h2>

        <div className="grid gap-3">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedOption === index;
            const isCorrect = index === currentQuestion.correctAnswer;
            const showResult = isAnswered;

            let cardClass =
              'bg-card border-2 border-border hover:border-primary/50 hover:bg-muted text-foreground';
            if (showResult) {
              if (isCorrect)
                cardClass =
                  'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 ring-2 ring-emerald-500/20 shadow-lg shadow-emerald-500/10';
              else if (isSelected && !isCorrect)
                cardClass =
                  'bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400 opacity-80 ring-2 ring-red-500/20';
              else
                cardClass =
                  'bg-muted border-border text-muted-foreground opacity-50';
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
                  <div className="w-4 h-4 rounded-full border-2 border-border group-hover:border-primary/50 shrink-0" />
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
              className="bg-blue-500/10 border border-blue-500/20 p-6 rounded-3xl space-y-4"
            >
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-black text-xs uppercase tracking-widest mb-1">
                <AlertCircle className="w-4 h-4" />
                Explicación
              </div>
              <p className="text-blue-900 dark:text-blue-300 font-medium leading-relaxed text-sm md:text-base">
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

'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { useEffect, useState } from 'react';

import {
  AlertCircle,
  ArrowRight,
  Brain,
  Check,
  ChevronLeft,
  Timer,
  X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

// Components
import { Button } from '@repo/ui/components/ui/button';

import QuizAnsweredView from '@/components/dashboard/quizzes/quiz-answered-view';
import QuizBody from '@/components/dashboard/quizzes/quiz-body';
import QuizCompletedView from '@/components/dashboard/quizzes/quiz-completed-view';
import { apiFetchClient } from '@/lib/api-client';
import { Question, Quiz } from '@/types/quiz';

export default function QuizGamePage() {
  const params = useParams();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<'playing' | 'completed'>(
    'playing',
  );
  const [gameStage, setGameStage] = useState<
    'preview' | 'countdown' | 'playing'
  >('preview');
  const [countdown, setCountdown] = useState(5);
  const [timer, setTimer] = useState(0);
  const [results, setResults] = useState<(null | 'correct' | 'incorrect')[]>(
    [],
  );
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const workspaceId = params.id as string;
  const quizId = params.quizId as string;

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const data = await apiFetchClient<Quiz>(`/quizzes/${quizId}`);
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
  const questions: Question[] = quiz?.questions || [];

  // Initialize results when quiz loads
  useEffect(() => {
    if (questions.length > 0 && results.length === 0) {
      setResults(new Array(questions.length).fill(null));
    }
  }, [questions.length]);

  // Countdown logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameStage === 'countdown' && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (gameStage === 'countdown' && countdown === 0) {
      setGameStage('playing');
    }
    return () => clearInterval(interval);
  }, [gameStage, countdown]);

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameStage === 'playing' && gameState === 'playing') {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameStage, gameState]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setGameStage('countdown');
  };

  const currentQuestion = questions[currentQuestionIndex];
  const [shake, setShake] = useState(false);

  const handleOptionSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
  };

  const handleSubmitAnswer = () => {
    setIsAnswered(true);
    const isCorrect = selectedOption === currentQuestion?.correctAnswer;

    // Update results array
    const newResults = [...results];
    newResults[currentQuestionIndex] = isCorrect ? 'correct' : 'incorrect';
    setResults(newResults);

    if (isCorrect) {
      setScore((prev) => prev + 1);
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
    setGameStage('preview');
    setCountdown(5);
    setTimer(0);
    setResults(new Array(questions.length).fill(null));
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
      <QuizCompletedView
        percentage={percentage}
        correctAnswers={correctAnswers}
        incorrectAnswers={incorrectAnswers}
        restartQuiz={restartQuiz}
        workspaceId={workspaceId}
      />
    );
  }

  if (!currentQuestion) return null;

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-10 pt-4 px-4 md:px-0 relative">
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
          <span>Tiempo: {formatTime(timer)}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-muted-foreground">
          <span>Pregunta {currentQuestionIndex + 1}</span>
          <span>{questions.length} Total</span>
        </div>
        <div className="relative h-6 flex items-center">
          {/* Track background */}
          <div className="absolute left-0 right-0 h-1.5 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${((currentQuestionIndex + (isAnswered ? 1 : 0)) / questions.length) * 100}%`,
              }}
              className="h-full bg-primary transition-all duration-500 ease-out"
            />
          </div>

          {/* Checkpoints */}
          <div className="absolute left-0 right-0 flex justify-between items-center px-0.5">
            {questions.map((_, idx) => {
              const status = results[idx];
              const isActive = idx === currentQuestionIndex;
              const isPast = idx < currentQuestionIndex;

              return (
                <motion.div
                  key={idx}
                  initial={false}
                  animate={{
                    scale: status ? 1.2 : isActive ? 1.1 : 1,
                  }}
                  className={`
                    w-5 h-5 rounded-full flex items-center justify-center border-2 transition-all duration-300 z-10
                    ${
                      status === 'correct'
                        ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                        : status === 'incorrect'
                          ? 'bg-red-500 border-red-500 text-white shadow-lg shadow-red-500/20'
                          : isActive
                            ? 'bg-background border-primary ring-4 ring-primary/20 scale-110'
                            : isPast
                              ? 'bg-primary/20 border-primary/40'
                              : 'bg-background border-muted shadow-sm'
                    }
                  `}
                >
                  {status === 'correct' && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                      <Check className="w-3 h-3 stroke-[3]" />
                    </motion.div>
                  )}
                  {status === 'incorrect' && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                      <X className="w-3 h-3 stroke-[3]" />
                    </motion.div>
                  )}
                  {!status && isActive && (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="w-2 h-2 rounded-full bg-primary"
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Question Card */}
      <QuizBody
        question={currentQuestion}
        handleOptionSelect={handleOptionSelect}
        isAnswered={isAnswered}
        selectedOption={selectedOption}
        shake={shake}
      />

      {/* Explanation / Footer */}
      <div className="min-h-[140px]">
        <AnimatePresence mode="wait">
          {isAnswered ? (
            <QuizAnsweredView
              currentQuestionIndex={currentQuestionIndex}
              questions={questions}
              handleNextQuestion={handleNextQuestion}
              question={currentQuestion}
            />
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

      {/* Preview and Countdown Overlays */}
      <AnimatePresence>
        {gameStage === 'preview' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/60 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              className="text-center space-y-8 p-8 max-w-sm w-full mx-4"
            >
              <div className="p-6 bg-primary/10 rounded-3xl w-24 h-24 mx-auto flex items-center justify-center shadow-inner">
                <Brain className="w-12 h-12 text-primary animate-pulse" />
              </div>
              <div className="space-y-3">
                <h3 className="text-3xl font-black tracking-tight">
                  ¿Listo para el desafío?
                </h3>
                <p className="text-muted-foreground font-semibold text-lg">
                  {questions.length} preguntas • {quiz.name}
                </p>
              </div>
              <Button
                onClick={handleStart}
                className="h-16 w-full rounded-2xl text-xl font-black bg-primary hover:bg-primary/90 text-white shadow-2xl shadow-primary/40 transition-all hover:scale-105 active:scale-95 group"
              >
                Comenzar Quiz
                <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>
        )}

        {gameStage === 'countdown' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-xl"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={countdown}
                initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 2, opacity: 0, rotate: 20 }}
                transition={{ type: 'spring', damping: 12 }}
                className="text-9xl font-black text-primary drop-shadow-[0_0_30px_rgba(var(--primary),0.5)]"
              >
                {countdown === 0 ? 'GO!' : countdown}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

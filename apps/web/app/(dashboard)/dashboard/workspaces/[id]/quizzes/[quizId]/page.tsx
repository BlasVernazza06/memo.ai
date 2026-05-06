'use client';

import Link from 'next/link';

import { Brain } from 'lucide-react';
import { AnimatePresence } from 'motion/react';

// Components
import { Button } from '@repo/ui/components/ui/button';

import QuizHeader from '@/components/dashboard/quizzes/game/parts/quiz-header';
import QuizProgressBar from '@/components/dashboard/quizzes/game/parts/quiz-progress-bar';
import QuizBody from '@/components/dashboard/quizzes/game/quiz-body';
import QuizAnsweredView from '@/components/dashboard/quizzes/game/stages/quiz-answered-view';
import QuizCompletedView from '@/components/dashboard/quizzes/game/stages/quiz-completed-view';
import QuizGamePreview from '@/components/dashboard/quizzes/game/stages/quiz-game-preview';
// Hooks
import { useQuizGame } from '@/hooks/functionalities/use-quiz-game';

export default function QuizGamePage() {
  const {
    workspaceId,
    currentQuestionIndex,
    selectedOption,
    isAnswered,
    score,
    gameState,
    gameStage,
    countdown,
    timer,
    results,
    quiz,
    isLoading,
    questions,
    currentQuestion,
    shake,
    timerState,
    toggleTimer,
    handleStart,
    handleOptionSelect,
    handleSubmitAnswer,
    handleNextQuestion,
    restartQuiz,
  } = useQuizGame();

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
    return (
      <QuizCompletedView
        percentage={percentage}
        correctAnswers={score}
        incorrectAnswers={questions.length - score}
        restartQuiz={restartQuiz}
        workspaceId={workspaceId}
      />
    );
  }

  if (!currentQuestion) return null;

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-10 pt-4 px-4 md:px-0 relative">
      <QuizHeader
        workspaceId={workspaceId}
        timer={timer}
        timeState={timerState}
        onToggleTimer={toggleTimer}
      />

      <QuizProgressBar
        currentQuestionIndex={currentQuestionIndex}
        isAnswered={isAnswered}
        questions={questions}
        results={results}
      />

      <QuizBody
        question={currentQuestion}
        handleOptionSelect={handleOptionSelect}
        isAnswered={isAnswered}
        selectedOption={selectedOption}
        shake={shake}
      />

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

      <QuizGamePreview
        gameStage={gameStage}
        questions={questions}
        quiz={quiz}
        handleStart={handleStart}
        countdown={countdown}
      />
    </div>
  );
}

import { useParams } from 'next/navigation';

import { useEffect, useState } from 'react';

import { apiFetchClient } from '@/lib/api-client';
import { Question, Quiz } from '@/types/quiz';

export function useQuizGame() {
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
  const [timerState, setTimerState] = useState<'running' | 'paused'>('running');
  const [results, setResults] = useState<(null | 'correct' | 'incorrect')[]>(
    [],
  );
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [shake, setShake] = useState(false);

  const workspaceId = (params.id as string)?.includes('-')
    ? (params.id as string).split('-').pop()!
    : (params.id as string);
  const quizId = (params.quizId as string)?.includes('-')
    ? (params.quizId as string).split('-').pop()!
    : (params.quizId as string);

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

  const questions: Question[] = quiz?.questions || [];
  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    if (questions.length > 0 && results.length === 0) {
      setResults(new Array(questions.length).fill(null));
    }
  }, [questions.length]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameStage === 'countdown') {
      interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 0) {
            setGameStage('playing');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameStage]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (
      gameStage === 'playing' &&
      gameState === 'playing' &&
      timerState === 'running' &&
      !isAnswered
    ) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameStage, gameState, timerState, isAnswered]);

  const toggleTimer = () => {
    setTimerState((prev) => (prev === 'running' ? 'paused' : 'running'));
  };

  const handleStart = () => {
    setGameStage('countdown');
    setTimerState('running');
  };

  const handleOptionSelect = (index: number) => {
    if (isAnswered || timerState === 'paused') return;
    setSelectedOption(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || !currentQuestion || timerState === 'paused')
      return;

    setIsAnswered(true);
    const isCorrect = selectedOption === currentQuestion.correctAnswer;

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
    setTimerState('running');
    setResults(new Array(questions.length).fill(null));
    setShake(false);
  };

  return {
    workspaceId,
    quizId,
    currentQuestionIndex,
    selectedOption,
    isAnswered,
    score,
    gameState,
    gameStage,
    countdown,
    timer,
    timerState,
    results,
    quiz,
    isLoading,
    questions,
    currentQuestion,
    shake,
    handleStart,
    handleOptionSelect,
    handleSubmitAnswer,
    handleNextQuestion,
    restartQuiz,
    toggleTimer,
  };
}

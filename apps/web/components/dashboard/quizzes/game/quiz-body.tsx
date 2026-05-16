import { useMemo } from 'react';

import QuizOption from '@/components/dashboard/quizzes/game/parts/quiz-option';
import { QuizQuestionDTO } from '@repo/validators';

interface QuizBodyProps {
  question: QuizQuestionDTO;
  selectedOption: number | null;
  isAnswered: boolean;
  handleOptionSelect: (index: number) => void;
  shake?: boolean;
}

export default function QuizBody({
  question,
  selectedOption,
  isAnswered,
  handleOptionSelect,
  shake = false,
}: QuizBodyProps) {
  // Fisher-Yates shuffle algorithm for the indices
  const shuffledIndices = useMemo(() => {
    const indices = question.options.map((_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j]!, indices[i]!];
    }
    return indices;
  }, [question.options]);

  return (
    <div className="space-y-8">
      <h2 className="text-2xl md:text-3xl font-black text-foreground leading-tight">
        {question.question}
      </h2>

      <div className="grid gap-3">
        {shuffledIndices.map((originalIndex) => {
          const option = question.options[originalIndex];
          const isSelected = selectedOption === originalIndex;
          const isCorrect = originalIndex === question.correctAnswer;
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
            <QuizOption
              key={originalIndex}
              option={option}
              index={originalIndex}
              handleOptionSelect={handleOptionSelect}
              isAnswered={isAnswered}
              isSelected={isSelected}
              showResult={showResult}
              isCorrect={isCorrect}
              shake={shake}
              cardClass={cardClass}
            />
          );
        })}
      </div>
    </div>
  );
}

import QuizOption from '@/components/dashboard/quizzes/quiz-option';
import { Question } from '@/types/quiz';

export default function QuizBody({
  question,
  handleOptionSelect,
  isAnswered,
  selectedOption,
  shake,
}: {
  question: Question;
  handleOptionSelect: (index: number) => void;
  isAnswered: boolean;
  selectedOption: number | null;
  shake: boolean;
}) {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl md:text-3xl font-black text-foreground leading-tight">
        {question.question}
      </h2>

      <div className="grid gap-3">
        {question.options.map((option, index) => {
          const isSelected = selectedOption === index;
          const isCorrect = index === question.correctAnswer;
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
              key={index}
              option={option}
              index={index}
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

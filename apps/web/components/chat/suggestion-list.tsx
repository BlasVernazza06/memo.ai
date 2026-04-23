import { BookOpen, Brain, FileText, Sparkles } from 'lucide-react';

import SuggestionCard from './suggestion-card';

const SUGGESTIONS = [
  {
    icon: <BookOpen className="w-4 h-4 text-orange-500" />,
    title: 'Plan de estudio',
    text: 'Diseña un plan de estudio estructurado. Reglas: Organiza por hitos lógicos, prioriza conceptos fundamentales y asegura una progresión de dificultad coherente.',
  },
  {
    icon: <FileText className="w-4 h-4 text-blue-500" />,
    title: 'Análisis Estratégico',
    text: 'Sintetiza la información clave. Reglas: Extrae terminología esencial, relaciona ideas complejas y destaca puntos críticos para la retención.',
  },
  {
    icon: <Brain className="w-4 h-4 text-purple-500" />,
    title: 'Práctica Avanzada',
    text: 'Genera material de evaluación. Reglas: Enfócate en el razonamiento crítico, incluye retroalimentación detallada y cubre todo el espectro del tema.',
  },
  {
    icon: <Sparkles className="w-4 h-4 text-emerald-500" />,
    title: 'Simplificación Maestra',
    text: 'Explica conceptos complejos. Reglas: Desglosa tecnicismos, integra analogías del mundo real y valida la comprensión con ejemplos prácticos.',
  },
];

export default function SuggestionList({
  setInputValue,
}: {
  setInputValue: (val: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-4xl px-4">
      {SUGGESTIONS.map((suggestion, idx) => (
        <SuggestionCard
          idx={idx}
          suggestion={suggestion}
          key={idx}
          onClick={setInputValue}
        />
      ))}
    </div>
  );
}

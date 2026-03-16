'use client';

import { useState } from 'react';

import {
  ExternalLink,
  LifeBuoy,
  Mail,
  MessageCircle,
  Sparkles,
} from 'lucide-react';
import { motion } from 'motion/react';

import { Button } from '@repo/ui/components/ui/button';

import {
  HELP_CATEGORIES,
  HelpCategory,
} from '@/components/help/help-categories';
import HelpCategoryCard from '@/components/help/help-category-card';
import SearchInput from '@/components/shared/search-input';

const FAQS = [
  {
    q: '¿Cómo me ayuda la IA a organizar mi información?',
    a: 'Nuestra IA analiza automáticamente tus documentos para categorizarlos, extraer conceptos clave y facilitar búsquedas inteligentes en todo tu espacio de trabajo.',
  },
  {
    q: '¿Puedo generar resúmenes o contenido nuevo con mis notas?',
    a: "Sí, utilizando la función de 'Sparkles' puedes resumir textos largos, cambiar el tono de tus escritos o generar borradores automáticos a partir de tus ideas existentes.",
  },
  {
    q: '¿Es segura mi información al utilizar funciones de IA?',
    a: 'Totalmente. Tus datos están protegidos con cifrado de extremo a extremo y no se utilizan para entrenar modelos de lenguaje externos, garantizando tu privacidad total.',
  },
];

const SEARCH_KEYS: (keyof HelpCategory)[] = ['title', 'desc'];

export default function HelpPage() {
  const [filteredCategories, setFilteredCategories] = useState(HELP_CATEGORIES);

  return (
    <div className="max-w-6xl mx-auto py-6 space-y-12">
      {/* Search Hero Section */}
      <section className="text-center space-y-8 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest">
            <LifeBuoy className="w-4 h-4" />
            Centro de Ayuda
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-foreground tracking-tight">
            ¿Cómo podemos <span className="text-primary italic">ayudarte?</span>
          </h1>
          <p className="text-muted-foreground font-medium text-lg max-w-2xl mx-auto">
            Busca en nuestra base de conocimientos o explora las categorías para
            resolver tus dudas rápidamente.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <SearchInput
            variant="hero"
            placeholder="Ej: ¿Cómo crear flashcards?"
            data={HELP_CATEGORIES}
            onResultsChange={setFilteredCategories}
            searchKeys={SEARCH_KEYS}
          />
        </motion.div>
      </section>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((cat, i) => (
          <HelpCategoryCard key={i} index={i} {...cat} />
        ))}
      </div>

      {/* FAQs & Contact */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 pt-10">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-black text-foreground flex items-center gap-3">
            <MessageCircle className="w-6 h-6 text-primary" />
            Preguntas Frecuentes
          </h2>
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-3xl p-6 hover:border-primary/40 transition-colors shadow-sm"
              >
                <h4 className="font-bold text-foreground mb-2">{faq.q}</h4>
                <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-foreground rounded-4xl p-8 text-background relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-[60px]" />
            <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
              ¿Aún tienes dudas?
            </h3>
            <p className="text-background/70 text-sm font-medium mb-8 leading-relaxed">
              Nuestro equipo de soporte está disponible 24/7 para ayudarte con
              lo que necesites.
            </p>
            <div className="space-y-3 relative z-10">
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-2xl h-12 flex gap-2">
                <Mail className="w-4 h-4" />
                Contactar Soporte
              </Button>
              <Button
                variant="ghost"
                className="w-full text-background/60 hover:text-background hover:bg-background/10 rounded-2xl h-12 flex gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Comunidad Discord
              </Button>
            </div>
          </div>

          <div className="bg-card border border-border rounded-4xl p-8 space-y-4 shadow-sm">
            <div className="w-10 h-10 bg-primary/20 text-primary rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-foreground">Estado del Sistema</h4>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-tight">
                Todos los sistemas operativos
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

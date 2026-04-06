'use client';

import { useState } from 'react';

import {
  ArrowRight,
  ChevronRight,
  ExternalLink,
  LifeBuoy,
  Mail,
  MessageCircle,
  Sparkles,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

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
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <div className="relative min-h-screen">
      {/* Background Ornaments */}

      <div className="max-w-6xl mx-auto px-6 py-12 relative z-10 space-y-20">
        {/* Search Hero Section */}
        <section className="text-center space-y-10 py-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/8 backdrop-blur-md border border-primary/20 text-primary font-bold text-[10px] uppercase tracking-[0.25em]">
              <LifeBuoy className="w-3.5 h-3.5" />
              Centro de Ayuda
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-foreground tracking-tight leading-[1.1]">
              ¿En qué podemos <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-primary/80 to-primary/50 italic px-2">
                ayudarte hoy?
              </span>
            </h1>
            <p className="text-muted-foreground font-medium text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Explora nuestra base de conocimientos diseñada para que domines
              Memo AI en minutos.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-linear-to-r from-primary/20 to-primary/5 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition duration-500" />
              <SearchInput
                variant="hero"
                placeholder="Ej: ¿Cómo crear flashcards inteligentes?"
                data={HELP_CATEGORIES}
                onResultsChange={setFilteredCategories}
                searchKeys={SEARCH_KEYS}
              />
            </div>
          </motion.div>
        </section>

        {/* Topics Grid */}
        <section className="space-y-8">
          <div className="flex items-end justify-between px-2">
            <div className="space-y-1">
              <h2 className="text-2xl font-black tracking-tight">Categorías</h2>
              <p className="text-sm text-muted-foreground font-medium">
                Todo lo que necesitas saber, organizado.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCategories.map((cat, i) => (
              <HelpCategoryCard key={i} index={i} {...cat} />
            ))}
          </div>
        </section>

        {/* FAQs & Contact */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-10 border-t border-border/50">
          {/* FAQ Area */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-foreground flex items-center gap-3">
                <MessageCircle className="w-8 h-8 text-primary" />
                Preguntas Frecuentes
              </h2>
              <p className="text-muted-foreground font-medium">
                Respuestas rápidas a las dudas más comunes.
              </p>
            </div>

            <div className="space-y-4">
              {FAQS.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`group bg-card/40 backdrop-blur-sm border rounded-3xl overflow-hidden transition-all duration-300 ${activeFaq === i ? 'border-primary/40 ring-1 ring-primary/20 shadow-lg' : 'border-border/50 hover:border-primary/20'}`}
                >
                  <button
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    className="w-full text-left p-6 flex items-center justify-between gap-4"
                  >
                    <h4
                      className={`font-bold transition-colors ${activeFaq === i ? 'text-primary' : 'text-foreground group-hover:text-primary/80'}`}
                    >
                      {faq.q}
                    </h4>
                    <div
                      className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${activeFaq === i ? 'bg-primary text-white rotate-90' : 'bg-muted text-muted-foreground'}`}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </button>
                  <AnimatePresence>
                    {activeFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div className="px-6 pb-6 text-muted-foreground text-sm font-medium leading-relaxed border-t border-border/10 pt-4">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-5 space-y-8">
            <div className="relative group overflow-hidden bg-foreground rounded-[2.5rem] p-10 text-background shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
              {/* Animated background shape */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/30 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 animate-pulse" />

              <div className="relative z-10 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-3xl font-black tracking-tight leading-tight">
                    ¿Aún tienes dudas sin resolver?
                  </h3>
                  <p className="text-background/70 text-base font-medium leading-relaxed">
                    Nuestro equipo técnico está listo para ayudarte
                    personalmente a optimizar tu flujo de estudio.
                  </p>
                </div>

                <div className="space-y-4">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-2xl h-14 text-base flex gap-3 group/btn shadow-[0_10px_20px_-10px_rgba(var(--primary),0.5)]">
                    <Mail className="w-5 h-5" />
                    Enviar un mensaje
                    <ArrowRight className="w-4 h-4 ml-auto group-hover/btn:translate-x-1 transition-transform" />
                  </Button>

                  <Button
                    variant="ghost"
                    className="w-full text-background/60 hover:text-background hover:bg-background/10 rounded-2xl h-14 flex gap-3 text-base font-bold"
                  >
                    <ExternalLink className="w-5 h-5" />
                    Unirse a Discord
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-card/40 backdrop-blur-md border border-border/50 rounded-[2.5rem] p-8 space-y-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center shadow-inner">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                    Operativo
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-lg text-foreground">
                  Estado del Ecosistema
                </h4>
                <p className="text-sm text-muted-foreground font-medium">
                  Todos nuestros servicios de IA y almacenamiento están
                  funcionando al 100%.
                </p>
              </div>
              <Button
                variant="outline"
                className="w-full rounded-xl border-border/50 text-xs font-bold uppercase tracking-widest h-10"
              >
                Ver historial de estado
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

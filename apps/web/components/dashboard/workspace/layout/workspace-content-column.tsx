'use client';
import Link from 'next/link';

import { useState } from 'react';

import { Layers, Lock, Plus, Sparkles } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

import { Button } from '@repo/ui/components/ui/button';
import { DocumentDTO, WorkspaceDetailDTO } from '@repo/validators';

import { DeckCard } from '@/components/dashboard/flashcards/list/deck-card';
import { QuizCard } from '@/components/dashboard/quizzes/list/quiz-card';
import { EmptyTabListState } from '@/components/dashboard/workspace/shared/empty-tab-list-state';
import { AnalysisTabContent } from '@/components/dashboard/workspace/tabs/analysis-tab-content';
import { useAuth } from '@/lib/auth-provider';
import { TabData } from '@/types/workspaces';

interface WorkspaceContentColumnProps {
  activeTab: 'flashcards' | 'quizzes' | 'analysis';
  workspace: WorkspaceDetailDTO;
  primaryDoc: DocumentDTO | null | undefined;
  tabs: TabData[];
  isGenerating?: boolean;
  onGenerateMore?: (type: 'flashcards' | 'quizzes', prompt?: string) => void;
}

export function WorkspaceContentColumn({
  activeTab,
  workspace,
  primaryDoc,
  tabs,
  isGenerating = false,
  onGenerateMore,
}: WorkspaceContentColumnProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const { user } = useAuth();

  const isFreePlan = user?.plan === 'free';

  const activeTabData = tabs.find((t) => t.id === activeTab);
  const title = activeTabData?.label || '';
  const icon = activeTabData?.icon || Layers;

  return (
    <div className="lg:col-span-6 min-h-[600px] space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm font-black uppercase tracking-[0.2em] text-muted-foreground/60 flex items-center gap-3 flex-1 mr-6">
          <AnimatePresence mode="wait">
            <motion.span
              key={activeTab}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
            >
              {title}
            </motion.span>
          </AnimatePresence>
          <span className="h-px flex-1 bg-border/50" />
        </h2>
        {activeTabData?.canGenerate && (
          <Button
            onClick={() => {
              if (activeTab !== 'analysis') {
                setIsOpen(true);
              }
            }}
            disabled={isGenerating}
            variant="ghost"
            className="h-8 rounded-lg px-2 text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary/5"
          >
            <Plus className="w-3.5 h-3.5 mr-1" />
            Crear Nuevo
          </Button>
        )}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {activeTab === 'flashcards' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(workspace.flashcardDecks?.length ?? 0) > 0 ? (
                workspace.flashcardDecks?.map((deck, idx) => (
                  <DeckCard key={deck.id} deck={deck} index={idx} />
                ))
              ) : !isGenerating ? (
                <div className="col-span-full">
                  <EmptyTabListState tabName={title} icon={icon} />
                </div>
              ) : null}

              {isGenerating && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    borderColor: `${workspace.bgColor || '#7C3AED'}33`,
                    backgroundColor: `${workspace.bgColor || '#7C3AED'}08`,
                  }}
                  className="relative group h-40 rounded-3xl border-2 border-dashed flex flex-col items-center justify-center p-6 overflow-hidden"
                >
                  <div
                    className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite]"
                    style={{
                      backgroundImage: `linear-gradient(to right, transparent, ${workspace.bgColor || '#7C3AED'}0D, transparent)`,
                    }}
                  />
                  <div
                    style={{
                      backgroundColor: `${workspace.bgColor || '#7C3AED'}15`,
                    }}
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3 animate-pulse"
                  >
                    <Layers
                      style={{ color: workspace.bgColor || '#7C3AED' }}
                      className="w-6 h-6"
                    />
                  </div>
                  <div className="space-y-2 w-full max-w-[120px] flex flex-col items-center">
                    <div
                      style={{
                        backgroundColor: `${workspace.bgColor || '#7C3AED'}20`,
                      }}
                      className="h-1.5 rounded-full w-full animate-pulse"
                    />
                    <div
                      style={{
                        backgroundColor: `${workspace.bgColor || '#7C3AED'}20`,
                      }}
                      className="h-1.5 rounded-full w-2/3 animate-pulse"
                    />
                  </div>
                  <span
                    style={{ color: workspace.bgColor || '#7C3AED' }}
                    className="text-[10px] font-black uppercase tracking-widest mt-4 animate-pulse"
                  >
                    Generando...
                  </span>
                </motion.div>
              )}
            </div>
          )}

          {activeTab === 'quizzes' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(workspace.quizzes?.length ?? 0) > 0 ? (
                workspace.quizzes?.map((quiz, idx) => (
                  <QuizCard key={quiz.id} quiz={quiz} index={idx} />
                ))
              ) : !isGenerating ? (
                <div className="col-span-full">
                  <EmptyTabListState tabName={title} icon={icon} />
                </div>
              ) : null}

              {isGenerating && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    borderColor: `${workspace.bgColor || '#7C3AED'}33`,
                    backgroundColor: `${workspace.bgColor || '#7C3AED'}08`,
                  }}
                  className="relative group h-40 rounded-3xl border-2 border-dashed flex flex-col items-center justify-center p-6 overflow-hidden"
                >
                  <div
                    className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite]"
                    style={{
                      backgroundImage: `linear-gradient(to right, transparent, ${workspace.bgColor || '#7C3AED'}0D, transparent)`,
                    }}
                  />
                  <div
                    style={{
                      backgroundColor: `${workspace.bgColor || '#7C3AED'}15`,
                    }}
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3 animate-pulse"
                  >
                    <Plus
                      style={{ color: workspace.bgColor || '#7C3AED' }}
                      className="w-6 h-6"
                    />
                  </div>
                  <div className="space-y-2 w-full max-w-[120px] flex flex-col items-center">
                    <div
                      style={{
                        backgroundColor: `${workspace.bgColor || '#7C3AED'}20`,
                      }}
                      className="h-1.5 rounded-full w-full animate-pulse"
                    />
                    <div
                      style={{
                        backgroundColor: `${workspace.bgColor || '#7C3AED'}20`,
                      }}
                      className="h-1.5 rounded-full w-2/3 animate-pulse"
                    />
                  </div>
                  <span
                    style={{ color: workspace.bgColor || '#7C3AED' }}
                    className="text-[10px] font-black uppercase tracking-widest mt-4 animate-pulse"
                  >
                    Generando...
                  </span>
                </motion.div>
              )}
            </div>
          )}

          {activeTab === 'analysis' &&
            (primaryDoc?.aiSummary || workspace.customContext ? (
              <AnalysisTabContent
                summary={primaryDoc?.aiSummary || workspace.customContext || ''}
              />
            ) : (
              <EmptyTabListState tabName={title} icon={icon} />
            ))}
        </motion.div>
      </AnimatePresence>

      {/* Modern, Premium Input Prompt Dialog */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop with blurring effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-background/40 backdrop-blur-md"
            />

            {/* Modal Dialog Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-border/50 bg-background/90 p-6 shadow-2xl backdrop-blur-xl"
            >
              {/* Blurred workspace color gradient bubble */}
              <div
                className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-20 blur-2xl"
                style={{
                  backgroundColor: isFreePlan
                    ? '#F59E0B'
                    : workspace.bgColor || '#7C3AED',
                }}
              />

              {isFreePlan ? (
                <div className="space-y-6 relative z-10 text-center py-4 flex flex-col items-center">
                  <div className="w-14 h-14 bg-amber-500/10 text-amber-500 rounded-2xl flex items-center justify-center border border-amber-500/20 shadow-lg shadow-amber-500/5 animate-pulse">
                    <Lock className="w-6 h-6 text-amber-400" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-black tracking-tight text-foreground uppercase">
                      Límite Plan Gratuito
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed px-4">
                      Has alcanzado los límites de tu plan gratuito. Para crear
                      nuevas flashcards o quizzes ilimitados y potenciar tu
                      aprendizaje con IA, pásate al plan Pro.
                    </p>
                  </div>
                  <div className="w-full flex flex-col gap-2.5 pt-2">
                    <Link href="/pricing" className="w-full">
                      <Button className="w-full h-12 rounded-2xl text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 hover:opacity-95 shadow-xl shadow-orange-500/20 active:scale-95 flex items-center justify-center gap-1.5 border border-white/10">
                        <Sparkles className="w-4 h-4 fill-white" />
                        Pasar al Plan Pro
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      onClick={() => setIsOpen(false)}
                      className="h-10 rounded-2xl text-xs font-bold"
                    >
                      Volver
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 relative z-10">
                  <div className="space-y-2">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{
                        backgroundColor: `${workspace.bgColor || '#7C3AED'}15`,
                      }}
                    >
                      {activeTab === 'flashcards' ? (
                        <Layers
                          style={{ color: workspace.bgColor || '#7C3AED' }}
                          className="w-5 h-5"
                        />
                      ) : (
                        <Plus
                          style={{ color: workspace.bgColor || '#7C3AED' }}
                          className="w-5 h-5"
                        />
                      )}
                    </div>
                    <h3 className="text-lg font-bold tracking-tight text-foreground">
                      Crear Nuevo{' '}
                      {activeTab === 'flashcards'
                        ? 'Mazo de Flashcards'
                        : 'Quiz'}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Añade un tema o contexto específico si deseas guiar a la
                      IA en la generación. De lo contrario, se basará en el
                      contenido existente del workspace.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="Ej. Enfócate en el capítulo 3, o explícame la teoría de la relatividad especial..."
                      rows={4}
                      className="w-full rounded-2xl border border-border/50 bg-muted/30 p-3 text-xs outline-hidden transition-all placeholder:text-muted-foreground/50 focus:border-border focus:ring-2 focus:ring-offset-0"
                      style={
                        {
                          '--tw-ring-color': `${workspace.bgColor || '#7C3AED'}33`,
                        } as React.CSSProperties
                      }
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setIsOpen(false);
                        setPrompt('');
                      }}
                      className="h-9 rounded-xl text-xs font-semibold px-4"
                    >
                      Cancelar
                    </Button>
                    <Button
                      onClick={() => {
                        if (
                          onGenerateMore &&
                          (activeTab === 'flashcards' ||
                            activeTab === 'quizzes')
                        ) {
                          onGenerateMore(activeTab, prompt.trim() || undefined);
                        }
                        setIsOpen(false);
                        setPrompt('');
                      }}
                      className="h-9 rounded-xl text-xs font-black uppercase tracking-wider px-4 text-white hover:opacity-90 transition-all active:scale-95"
                      style={{
                        backgroundColor: workspace.bgColor || '#7C3AED',
                      }}
                    >
                      Generar
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

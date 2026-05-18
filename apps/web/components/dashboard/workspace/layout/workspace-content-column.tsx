'use client';

import { Layers, Plus } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

import { Button } from '@repo/ui/components/ui/button';
import { DocumentDTO, WorkspaceDetailDTO } from '@repo/validators';

import { DeckCard } from '@/components/dashboard/flashcards/list/deck-card';
import { QuizCard } from '@/components/dashboard/quizzes/list/quiz-card';
import { EmptyTabListState } from '@/components/dashboard/workspace/shared/empty-tab-list-state';
import { AnalysisTabContent } from '@/components/dashboard/workspace/tabs/analysis-tab-content';
import { TabData } from '@/types/workspaces';

interface WorkspaceContentColumnProps {
  activeTab: 'flashcards' | 'quizzes' | 'analysis';
  workspace: WorkspaceDetailDTO;
  primaryDoc: DocumentDTO | null | undefined;
  tabs: TabData[];
  isGenerating?: boolean;
  onGenerateMore?: (type: 'flashcards' | 'quizzes') => void;
}

export function WorkspaceContentColumn({
  activeTab,
  workspace,
  primaryDoc,
  tabs,
  isGenerating = false,
  onGenerateMore,
}: WorkspaceContentColumnProps) {
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
              if (onGenerateMore && activeTab !== 'analysis') {
                onGenerateMore(activeTab);
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
                  className="relative group h-40 rounded-3xl border-2 border-dashed border-primary/20 bg-primary/5 flex flex-col items-center justify-center p-6 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-primary/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-3 animate-pulse">
                    <Layers className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-2 w-full max-w-[120px]">
                    <div className="h-2 bg-primary/10 rounded-full w-full animate-pulse" />
                    <div className="h-2 bg-primary/10 rounded-full w-2/3 animate-pulse" />
                  </div>
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
                  className="relative group h-40 rounded-3xl border-2 border-dashed border-primary/20 bg-primary/5 flex flex-col items-center justify-center p-6 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-primary/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-3 animate-pulse">
                    <Plus className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-2 w-full max-w-[120px]">
                    <div className="h-2 bg-primary/10 rounded-full w-full animate-pulse" />
                    <div className="h-2 bg-primary/10 rounded-full w-2/3 animate-pulse" />
                  </div>
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
    </div>
  );
}

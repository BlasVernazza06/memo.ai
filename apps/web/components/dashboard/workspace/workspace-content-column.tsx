'use client';

import { Layers, Plus } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

import type { DbDocument, WorkspaceWithRelations } from '@repo/db';
import { Button } from '@repo/ui/components/ui/button';

import { DeckCard } from '@/components/dashboard/flashcards/deck-card';

import { QuizCard } from '../quizzes/quiz-card';
import { AnalysisTabContent } from './analysis-tab-content';
import { EmptyTabListState } from './empty-tab-list-state';

interface TabMetadata {
  id: 'flashcards' | 'quizzes' | 'analysis';
  label: string;
  icon: any;
  count: number | null;
}

interface WorkspaceContentColumnProps {
  activeTab: 'flashcards' | 'quizzes' | 'analysis';
  workspace: WorkspaceWithRelations;
  primaryDoc: DbDocument | null | undefined;
  tabs: TabMetadata[];
}

export function WorkspaceContentColumn({
  activeTab,
  workspace,
  primaryDoc,
  tabs,
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
        <Button
          variant="ghost"
          className="h-8 rounded-lg px-2 text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary/5"
        >
          <Plus className="w-3.5 h-3.5 mr-1" />
          Crear Nuevo
        </Button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {activeTab === 'flashcards' &&
          (workspace.flashcardDecks?.length ?? 0) > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {workspace.flashcardDecks?.map((deck, idx) => (
                <DeckCard key={deck.id} deck={deck} index={idx} />
              ))}
            </div>
          ) : activeTab === 'quizzes' &&
            (workspace.quizzes?.length ?? 0) > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {workspace.quizzes?.map((quiz, idx) => (
                <QuizCard key={quiz.id} quiz={quiz} index={idx} />
              ))}
            </div>
          ) : activeTab === 'analysis' &&
            (primaryDoc?.aiSummary || workspace.customContext) ? (
            <AnalysisTabContent
              summary={primaryDoc?.aiSummary || workspace.customContext || ''}
            />
          ) : (
            <EmptyTabListState tabName={title} icon={icon} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

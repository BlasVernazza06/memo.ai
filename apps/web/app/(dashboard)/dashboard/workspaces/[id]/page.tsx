'use client';

// React
// External packages
// Next
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { useEffect, useState } from 'react';

import {
  ArrowRight,
  BarChart3,
  Brain,
  ChevronLeft,
  Heart,
  Layers,
  Settings,
  TriangleAlert,
} from 'lucide-react';
import { motion } from 'motion/react';

import type { WorkspaceWithRelations } from '@repo/db';
// Components
import { Button } from '@repo/ui/components/ui/button';

import WorkspaceSettingsModal from '@/components/dashboard/workspace/forms/workspace-settings-modal';
import { WorkspaceContentColumn } from '@/components/dashboard/workspace/layout/workspace-content-column';
import { WorkspaceInfoColumn } from '@/components/dashboard/workspace/layout/workspace-info-column';
import { WorkspaceInsightsColumn } from '@/components/dashboard/workspace/layout/workspace-insights-column';
import WorkspaceLoading from '@/components/dashboard/workspace/shared/workspace-loading';
import { generateMoreContent } from '@/lib/actions/workspace-actions';
import { apiFetchClient } from '@/lib/api-client';

// ============================================================
// COMPONENTS
// ============================================================

export default function WorkspaceDetailPage() {
  const params = useParams();
  const rawId = params.id as string;
  const id = rawId.includes('-') ? rawId.split('-').pop() : rawId;
  const [activeTab, setActiveTab] = useState<
    'flashcards' | 'quizzes' | 'analysis'
  >('flashcards');
  const [workspace, setWorkspace] = useState<WorkspaceWithRelations | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const fetchWorkspace = async () => {
    try {
      setIsLoading(true);
      const data = await apiFetchClient<WorkspaceWithRelations>(
        `/workspaces/${id}`,
      );
      console.log('Workspace Detail Data:', data);
      setWorkspace(data);
      setIsFavorite(data.isFavorite);
    } catch (error) {
      console.error('Error fetching workspace:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchWorkspace();
    }
  }, [id]);

  const handleGenerateMore = async (
    type: 'flashcards' | 'quizzes',
    prompt?: string,
  ) => {
    try {
      setIsGenerating(true);
      await generateMoreContent(type, id as string, prompt);
      // Refrescar data
      const data = await apiFetchClient<WorkspaceWithRelations>(
        `/workspaces/${id}`,
      );
      setWorkspace(data);
    } catch (error) {
      console.error('Error generating more content:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleLike = async () => {
    if (!workspace) return;

    // Optimistic update
    const previous = isFavorite;
    const nextValue = !previous;

    setIsFavorite(nextValue);
    setWorkspace((prev) => (prev ? { ...prev, isFavorite: nextValue } : null));

    try {
      await apiFetchClient(`/workspaces/${workspace.id}/like`, {
        method: 'POST',
      });
    } catch (error) {
      console.error('Error toggling favorite:', error);
      // Rollback on error
      setIsFavorite(previous);
      setWorkspace((prev) => (prev ? { ...prev, isFavorite: previous } : null));
    }
  };

  const TABS = [
    {
      id: 'flashcards' as const,
      label: 'Flashcards',
      count: workspace?.flashcardDecks?.length || 0,
      icon: Layers,
      canGenerate: true,
    },
    {
      id: 'quizzes' as const,
      label: 'Quizzes',
      count: workspace?.quizzes?.length || 0,
      icon: Brain,
      canGenerate: true,
    },
    {
      id: 'analysis' as const,
      label: 'Análisis',
      count: workspace?.documents?.[0]?.aiSummary ? 1 : null,
      icon: BarChart3,
    },
  ];

  const primaryDoc = workspace?.documents?.[0];

  if (isLoading && !workspace) {
    return <WorkspaceLoading />;
  }

  if (!workspace) {
    return (
      <div className="relative flex flex-col items-center justify-center min-h-screen bg-background overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-rose-500/5 rounded-full blur-[100px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative z-10 flex flex-col items-center text-center px-6"
        >
          {/* Animated Icon Container */}
          <div className="relative mb-8">
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="p-8 rounded-[2.5rem] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-slate-100 relative z-10"
            >
              <div className="w-20 h-20 rounded-3xl bg-rose-50 flex items-center justify-center">
                <TriangleAlert className="w-10 h-10 text-rose-500" />
              </div>
            </motion.div>
            {/* Background Glow */}
            <div className="absolute inset-0 bg-rose-500/20 blur-3xl rounded-full opacity-30 -z-10 scale-150" />
          </div>

          {/* Text Content */}
          <h1 className="text-3xl md:text-4xl font-black text-foreground mb-3 tracking-tight">
            Workspace no encontrado
          </h1>
          <p className="text-muted-foreground text-lg max-w-md mb-10 leading-relaxed">
            Parece que el espacio de trabajo que buscas ha sido movido,
            eliminado o no tienes permisos para acceder a él.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="h-14 px-8 rounded-2xl bg-foreground text-background hover:bg-foreground/90 font-bold gap-3 shadow-xl shadow-foreground/10 transition-all active:scale-95"
              >
                Volver a Dashboard
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>

          {/* Decorative Footer */}
          <p className="mt-16 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40">
            Memo.AI • Error 404
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full">
      {/* Notion-style Cover Area */}
      <div className="relative h-72 md:h-96 w-full overflow-hidden group">
        <div
          className="w-full h-full relative"
          style={{
            backgroundColor: workspace.bgColor || '#7C3AED',
            backgroundImage: `linear-gradient(to bottom right, ${workspace.bgColor || '#7C3AED'}99, ${workspace.bgColor || '#7C3AED'}22)`,
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.2),transparent)]" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-background via-background/60 to-transparent" />
      </div>

      {/* Content Container */}
      <div className="w-full px-8 md:px-16 lg:px-24 -mt-30 relative z-10 pb-32">
        {/* Top Floating Actions Area */}
        <div className="flex items-end justify-between mb-8 group/top">
          {/* Main Icon Overlap */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="w-32 h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 bg-white rounded-[2.5rem] p-1 shadow-[0_20px_50px_rgba(0,0,0,0.15)] relative z-20 group/icon border border-white/40"
          >
            <div className="w-full h-full rounded-[2.2rem] overflow-hidden relative flex items-center justify-center bg-slate-50">
              {/* Fondo holográfico para cuando no hay imagen */}
              <div className="absolute inset-0 bg-linear-to-br from-indigo-500/10 via-sky-400/10 to-emerald-400/10" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.8),transparent)]" />
              <span className="text-5xl md:text-6xl relative z-10 transition-transform duration-500 group-hover/icon:scale-110 group-hover/icon:rotate-3">
                {workspace.icon || '📚'}
              </span>
            </div>
          </motion.div>

          <div className="flex flex-col items-end gap-6 mb-2">
            {/* Nav Actions */}
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-4 py-2 bg-background/50 backdrop-blur-md border border-border/50 rounded-xl text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-foreground transition-all shadow-sm"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                Workspaces
              </Link>
              <div className="h-6 w-px bg-border/50 mx-1" />
              <Button
                onClick={() => handleLike()}
                variant="ghost"
                className={`rounded-xl w-10 h-10 p-0 shadow-sm transition-all active:scale-90 ${
                  isFavorite
                    ? 'bg-rose-500/10 border border-rose-500/20 text-rose-500'
                    : 'bg-background/50 backdrop-blur-md border border-border/50 text-muted-foreground hover:text-rose-500'
                }`}
              >
                <Heart
                  className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`}
                />
              </Button>
              <Button
                onClick={() => setShowSettings(true)}
                variant="ghost"
                className="rounded-xl w-10 h-10 p-0 bg-background/50 backdrop-blur-md border border-border/50 text-muted-foreground hover:text-foreground shadow-sm transition-all active:scale-90"
              >
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* 3-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <WorkspaceInfoColumn
            workspace={workspace}
            primaryDoc={primaryDoc}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabs={TABS}
          />

          <WorkspaceContentColumn
            activeTab={activeTab}
            workspace={workspace}
            primaryDoc={primaryDoc}
            tabs={TABS}
            isGenerating={isGenerating}
            onGenerateMore={handleGenerateMore}
          />

          <WorkspaceInsightsColumn
            onGenerateMore={handleGenerateMore}
            isGenerating={isGenerating}
          />
        </div>
      </div>

      {/* Settings Modal */}
      <WorkspaceSettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        onSuccess={fetchWorkspace}
        workspace={workspace}
      />
    </div>
  );
}

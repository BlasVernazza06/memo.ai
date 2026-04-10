'use client';

// React
// External packages
// Next
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { useEffect, useState } from 'react';

import {
  BarChart3,
  Brain,
  ChevronLeft,
  FileText,
  Heart,
  Layers,
  Plus,
  Settings,
  Sparkles,
  Trophy,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

import type { WorkspaceWithRelations } from '@repo/db';
// Components
import { Button } from '@repo/ui/components/ui/button';

import WorkspaceSettingsModal from '@/components/dashboard/workspace-settings-modal';
import { AiChatFloat } from '@/components/dashboard/workspace/ai-chat-float';
import { WorkspaceContentColumn } from '@/components/dashboard/workspace/workspace-content-column';
import { WorkspaceInfoColumn } from '@/components/dashboard/workspace/workspace-info-column';
import { WorkspaceInsightsColumn } from '@/components/dashboard/workspace/workspace-insights-column';
import WorkspaceLoading from '@/components/dashboard/workspace/workspace-loading';
import { apiFetchClient } from '@/lib/api-client';

// ============================================================
// COMPONENTS
// ============================================================

export default function WorkspaceDetailPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<
    'flashcards' | 'quizzes' | 'analysis'
  >('flashcards');
  const [workspace, setWorkspace] = useState<WorkspaceWithRelations | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isFav, setIsFav] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const fetchWorkspace = async () => {
      try {
        setIsLoading(true);
        const data = await apiFetchClient<WorkspaceWithRelations>(
          `/workspaces/${id}`,
        );
        console.log('Workspace Detail Data:', data);
        setWorkspace(data);
        setIsFav(data.isFavorite);
      } catch (error) {
        console.error('Error fetching workspace:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchWorkspace();
    }
  }, [id]);

  const TABS = [
    {
      id: 'flashcards' as const,
      label: 'Flashcards',
      count: workspace?.flashcardDecks?.length || 0,
      icon: Layers,
    },
    {
      id: 'quizzes' as const,
      label: 'Quizzes',
      count: workspace?.quizzes?.length || 0,
      icon: Brain,
    },
    {
      id: 'analysis' as const,
      label: 'Análisis',
      count: workspace?.documents?.[0]?.aiSummary ? 1 : null,
      icon: BarChart3,
    },
  ];

  const primaryDoc = workspace?.documents?.[0];

  if (isLoading) {
    return <WorkspaceLoading />;
  }

  if (!workspace) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Workspace no encontrado</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full">
      {/* Notion-style Cover Area */}
      <div className="relative h-72 md:h-96 w-full overflow-hidden group bg-muted">
        {workspace.coverImage ? (
          <Image
            src={workspace.coverImage}
            alt="Cover"
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
            priority
          />
        ) : (
          <div className="w-full h-full bg-linear-to-tr from-primary/30 via-primary/10 to-background relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(var(--primary-rgb),0.15),transparent)]" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
          </div>
        )}
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
            className="w-32 h-32 md:w-40 md:h-40 bg-background rounded-3xl border-4 border-background shadow-2xl flex items-center justify-center text-5xl md:text-6xl relative overflow-hidden group/icon"
          >
            {primaryDoc?.thumbnailUrl ? (
              <Image
                src={primaryDoc.thumbnailUrl}
                alt="Workspace Icon"
                fill
                className="object-cover transition-transform group-hover/icon:scale-110"
              />
            ) : (
              <span className="transition-transform group-hover/icon:scale-110 duration-500">
                {workspace.icon || '📚'}
              </span>
            )}
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
                onClick={() => setIsFav(!isFav)}
                variant="ghost"
                className={`rounded-xl w-10 h-10 p-0 shadow-sm transition-all active:scale-90 ${
                  isFav
                    ? 'bg-rose-500/10 border border-rose-500/20 text-rose-500'
                    : 'bg-background/50 backdrop-blur-md border border-border/50 text-muted-foreground hover:text-rose-500'
                }`}
              >
                <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
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
          />

          <WorkspaceInsightsColumn />
        </div>
      </div>

      {/* Settings Modal */}
      <WorkspaceSettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        workspace={workspace}
      />

      {/* Floating Chat */}
      <AiChatFloat />
    </div>
  );
}

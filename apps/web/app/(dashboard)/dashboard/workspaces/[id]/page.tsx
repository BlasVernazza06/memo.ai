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

import { AiChatFloat } from '@/components/dashboard/workspace/ai-chat-float';
import { apiFetchClient } from '@/lib/api-client';

import WorkspaceSettingsModal from '../../../../../components/dashboard/workspace-settings-modal';

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
      count: null,
      icon: BarChart3,
    },
  ];

  const primaryDoc = workspace?.documents?.[0];

  if (isLoading) {
    return (
      <div className="min-h-screen  flex flex-col items-center justify-center p-6">
        <div className="flex flex-col items-center gap-8 max-w-[240px] w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-12 h-12 text-primary/40"
          >
            <Brain className="w-full h-full" />
          </motion.div>
          <div className="space-y-4 w-full text-center">
            <div className="h-px w-full bg-border/50 rounded-full overflow-hidden relative">
              <motion.div
                className="absolute top-0 left-0 h-full bg-primary/40"
                initial={{ left: '-100%', width: '50%' }}
                animate={{ left: '100%' }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em] pl-1">
              Cargando
            </p>
          </div>
        </div>
      </div>
    );
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
          {/* Left Column (3) - File Escalón & Title */}
          <div className="lg:col-span-3 space-y-8 sticky top-8">
            <div className="space-y-6">
              {/* Title Escalón */}
              <div className="space-y-2">
                <h1 className="text-3xl font-black text-foreground tracking-tight leading-tight">
                  {workspace.name}
                </h1>
                <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                  {workspace.description ||
                    'Transforma tus apuntes en conocimiento interactivo con IA.'}
                </p>
              </div>

              {/* Context Escalón */}
              {workspace.customContext && (
                <div className="p-4 bg-muted/30 rounded-2xl border border-border/50 italic text-[13px] text-muted-foreground leading-relaxed">
                  &quot;{workspace.customContext}&quot;
                </div>
              )}

              <div className="space-y-3">
                {/* File Escalón - Directly above tabs */}
                {primaryDoc && (
                  <div className="group/file relative bg-card/50 backdrop-blur-xl border border-border/40 rounded-3xl overflow-hidden shadow-sm transition-all hover:shadow-md hover:border-primary/20">
                    <div className="aspect-video relative bg-muted flex items-center justify-center overflow-hidden">
                      {primaryDoc.thumbnailUrl ? (
                        <Image
                          src={primaryDoc.thumbnailUrl}
                          alt="Preview"
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <FileText className="w-12 h-12 text-muted-foreground/30" />
                      )}
                      <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent flex items-end p-4">
                        <div className="bg-background/90 backdrop-blur-sm rounded-lg px-2 py-1 text-[8px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                          Doc. Origen
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Tabs (Vertical Stack) */}
                <div className="flex flex-col gap-1.5 bg-card/30 p-1.5 rounded-2xl border border-border/40">
                  {TABS.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all font-bold text-sm relative group ${
                          isActive
                            ? 'bg-primary text-primary-foreground shadow-sm'
                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        }`}
                      >
                        <tab.icon
                          className={`w-4 h-4 ${isActive ? '' : 'opacity-60 group-hover:opacity-100'}`}
                        />
                        <span className="flex-1 text-left">{tab.label}</span>
                        {tab.count !== null && (
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded-md ${isActive ? 'bg-white/20 text-white' : 'bg-muted/80 text-foreground'}`}
                          >
                            {tab.count}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Middle Column (6) - Card List Content */}
          <div className="lg:col-span-6 min-h-[600px] space-y-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-muted-foreground/60 flex items-center gap-3">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeTab}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                  >
                    {TABS.find((t) => t.id === activeTab)?.label}
                  </motion.span>
                </AnimatePresence>
                <span className="h-px w-12 bg-border/50" />
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
                {activeTab === 'flashcards' && (workspace.flashcardDecks?.length ?? 0) > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {workspace.flashcardDecks?.map((deck, idx) => (
                      <DeckCard key={deck.id} deck={deck} index={idx} />
                    ))}
                  </div>
                ) : activeTab === 'quizzes' && (workspace.quizzes?.length ?? 0) > 0 ? (
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {workspace.quizzes?.map((quiz, idx) => (
                      <QuizCard key={quiz.id} quiz={quiz} index={idx} />
                    ))}
                  </div>
                ) : (
                  <EmptyTabListState
                    tabName={TABS.find((t) => t.id === activeTab)?.label || ''}
                    icon={TABS.find((t) => t.id === activeTab)?.icon || Layers}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column (3) - Metrics & Intelligence */}
          <div className="lg:col-span-3 space-y-6 lg:sticky lg:top-8">
            {/* Domain Metrics */}
            <div className="bg-slate-900 border border-slate-800 text-white rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full -mr-16 -mt-16" />

              <div className="flex items-center gap-2 mb-8 opacity-40">
                <Trophy className="w-3 h-3" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                  Dominio Global
                </span>
              </div>

              <div className="flex flex-col items-center gap-6 mb-8">
                <div className="relative w-28 h-28">
                  <svg className="w-full h-full -rotate-90">
                    <circle
                      cx="56"
                      cy="56"
                      r="50"
                      className="stroke-white/5 fill-none"
                      strokeWidth="8"
                    />
                    <circle
                      cx="56"
                      cy="56"
                      r="50"
                      className="stroke-primary fill-none transition-all duration-1000"
                      strokeWidth="8"
                      strokeDasharray="314"
                      strokeDashoffset={314 * (1 - 0.68)}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center font-black text-2xl tracking-tighter">
                    68 <span className="text-xs ml-0.5 opacity-40">%</span>
                  </div>
                </div>
                <div className="text-center">
                  <p className="font-black text-lg leading-tight">
                    Buen Progreso
                  </p>
                  <p className="text-[10px] font-medium opacity-50 mt-1 uppercase tracking-widest text-balance">
                    Superando al 84% de usuarios
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-6 border-t border-white/5">
                <div className="space-y-1">
                  <p className="text-[9px] font-bold opacity-30 uppercase">
                    Material
                  </p>
                  <p className="font-black text-base">12/40</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] font-bold opacity-30 uppercase">
                    Sesiones
                  </p>
                  <p className="font-black text-base">8 Hoy</p>
                </div>
              </div>
            </div>

            {/* AI Suggestion Tip */}
            <div className="bg-card/40 backdrop-blur-xl border border-border/40 rounded-4xl p-6 relative group overflow-hidden shadow-sm hover:shadow-md transition-all">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-2xl rounded-full -mr-12 -mt-12 group-hover:bg-primary/10 transition-colors" />
              <Sparkles className="w-5 h-5 text-primary mb-4" />
              <h3 className="font-black text-xs uppercase tracking-widest mb-2">
                Memo IA Sugiere
              </h3>
              <p className="text-[13px] text-muted-foreground leading-relaxed font-medium">
                Has mejorado en <strong>Teoría de Redes</strong>. Repasemos
                estos conceptos antes de tu próximo quiz.
              </p>
            </div>
          </div>
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

function DeckCard({ deck, index }: { deck: any, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative bg-card border border-border/60 rounded-3xl p-6 hover:border-primary/30 transition-all hover:shadow-xl hover:shadow-primary/5"
    >
      <div className="flex items-start justify-between mb-6">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500">
          <Layers className="w-6 h-6" />
        </div>
        <div className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 text-[10px] font-black uppercase tracking-widest">
          {deck.cards?.length || 0} Cartas
        </div>
      </div>
      
      <div className="space-y-1 mb-6">
        <h4 className="font-black text-lg text-foreground group-hover:text-primary transition-colors">
          {deck.name}
        </h4>
        <p className="text-xs text-muted-foreground/60 font-medium line-clamp-1">
          {deck.description || 'Mazo de estudio optimizado'}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Button className="flex-1 bg-primary text-primary-foreground font-black rounded-xl h-10 gap-2 shadow-lg shadow-primary/20">
          <Brain className="w-4 h-4" />
          Estudiar
        </Button>
        <Button variant="outline" className="w-10 h-10 p-0 rounded-xl border-border/60 hover:bg-muted">
          <Settings className="w-4 h-4 text-muted-foreground" />
        </Button>
      </div>
    </motion.div>
  );
}

function QuizCard({ quiz, index }: { quiz: any, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative bg-card border border-border/60 rounded-3xl p-6 hover:border-violet-500/30 transition-all hover:shadow-xl hover:shadow-violet-500/5"
    >
      <div className="flex items-start justify-between mb-6">
        <div className="w-12 h-12 rounded-2xl bg-violet-500/10 flex items-center justify-center text-violet-500 group-hover:scale-110 transition-transform duration-500">
          <Trophy className="w-6 h-6" />
        </div>
        <div className="px-2.5 py-1 rounded-lg bg-violet-500/10 text-violet-600 text-[10px] font-black uppercase tracking-widest">
          {quiz.questions?.length || 0} Preguntas
        </div>
      </div>
      
      <div className="space-y-1 mb-6">
        <h4 className="font-black text-lg text-foreground group-hover:text-violet-500 transition-colors">
          {quiz.name}
        </h4>
        <p className="text-xs text-muted-foreground/60 font-medium line-clamp-1">
          {quiz.description || 'Evaluación de conocimientos'}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Button className="flex-1 bg-violet-500 hover:bg-violet-600 text-white font-black rounded-xl h-10 gap-2 shadow-lg shadow-violet-500/20">
          <Trophy className="w-4 h-4" />
          Comenzar
        </Button>
        <Button variant="outline" className="w-10 h-10 p-0 rounded-xl border-border/60 hover:bg-muted">
          <Settings className="w-4 h-4 text-muted-foreground" />
        </Button>
      </div>
    </motion.div>
  );
}

function EmptyTabListState({
  tabName,
  icon: Icon,
}: {
  tabName: string;
  icon: React.ElementType;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center space-y-8 bg-card/20 border border-border/40 rounded-[3rem] border-dashed">
      <div className="relative">
        <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full animate-pulse" />
        <div className="w-20 h-20 bg-background rounded-3xl shadow-xl flex items-center justify-center mx-auto border border-border/50 relative z-10">
          <Icon className="w-8 h-8 text-primary/40" />
        </div>
      </div>
      <div className="space-y-3 max-w-[280px] mx-auto">
        <h3 className="text-xl font-black text-foreground">
          Generando {tabName}
        </h3>
        <p className="text-xs text-muted-foreground/80 font-medium leading-relaxed">
          Nuestra inteligencia artificial está destilando tus documentos para
          crear este material de estudio optimizado.
        </p>
      </div>
      <Button
        variant="ghost"
        className="text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary/5 rounded-full h-10 px-8 border border-primary/10"
      >
        Configurar Generación
      </Button>
    </div>
  );
}


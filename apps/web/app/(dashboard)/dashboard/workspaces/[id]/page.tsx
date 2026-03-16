'use client';

// React
// External packages
// Next
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { useEffect, useState } from 'react';

import {
  BarChart3,
  Brain,
  ChevronLeft,
  Download,
  FileText,
  Heart,
  Layers,
  MessageSquare,
  MoreVertical,
  Plus,
  Settings,
  Sparkles,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

// Components
import { Button } from '@repo/ui/components/ui/button';

import type { WorkspaceWithRelations, DbDocument } from '@repo/db';
import SearchInput from '@/components/shared/search-input';
import { apiFetchClient } from '@/lib/api-client';

import WorkspaceSettingsModal from '../../../../../components/dashboard/workspace-settings-modal';

// ============================================================
// COMPONENTS
// ============================================================

export default function WorkspaceDetailPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<
    'docs' | 'flashcards' | 'quizzes' | 'analysis'
  >('docs');
  const [workspace, setWorkspace] = useState<WorkspaceWithRelations | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFav, setIsFav] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const fetchWorkspace = async () => {
      try {
        setIsLoading(true);
        const data = await apiFetchClient<WorkspaceWithRelations>(`/workspaces/${id}`);
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
      id: 'docs' as const,
      label: 'Documentos',
      count: workspace?.documents?.length || 0,
      icon: FileText,
    },
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <Brain className="w-12 h-12 text-primary animate-pulse" />
          <p className="text-slate-500 font-black uppercase tracking-widest text-xs">
            Cargando Workspace...
          </p>
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
    <div className="max-w-7xl mx-auto space-y-8 pb-32 pt-6 px-4 md:px-8">
      {/* Top Actions & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-[11px] font-black text-muted-foreground uppercase tracking-[0.2em]">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 hover:text-foreground transition-colors bg-card border border-border py-2.5 px-5 rounded-full shadow-sm"
          >
            <ChevronLeft className="w-4 h-4" />
            Workspaces
          </Link>
          <span className="opacity-40">/</span>
          <span className="text-foreground shrink-0">{workspace.category || 'General'}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setIsFav(!isFav)}
            variant="ghost"
            className={`rounded-full w-12 h-12 p-0 shadow-sm transition-all active:scale-95 ${
              isFav
                ? 'bg-rose-500/10 border border-rose-500/20 text-rose-500'
                : 'bg-card border border-border text-muted-foreground hover:text-rose-500'
            }`}
          >
            <Heart className={`w-5 h-5 ${isFav ? 'fill-current' : ''}`} />
          </Button>
          <Button
            onClick={() => setShowSettings(true)}
            variant="ghost"
            className="rounded-full w-12 h-12 p-0 bg-card border border-border text-muted-foreground hover:text-foreground shadow-sm transition-all active:scale-95"
          >
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Compact Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm relative overflow-hidden">
        {workspace.coverImage && (
          <div
            className="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none"
            style={{
              backgroundImage: `url(${workspace.coverImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              maskImage: 'linear-gradient(to left, black, transparent)',
              WebkitMaskImage: 'linear-gradient(to left, black, transparent)'
            }}
          />
        )}
        <div className="flex items-center gap-5 relative z-10">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-background border border-border rounded-2xl flex items-center justify-center text-3xl md:text-4xl shadow-sm shrink-0">
            {workspace.icon || '📚'}
          </div>
          <div className="space-y-1.5">
            <h1 className="text-2xl md:text-3xl font-black text-foreground tracking-tight">
              {workspace.name}
            </h1>
            <p className="text-muted-foreground font-medium text-sm md:text-base">
              {workspace.description || 'Transforma tus apuntes en conocimiento interactivo con IA.'}
            </p>
          </div>
        </div>
        <div className="shrink-0 relative z-10">
          <Button className="w-full md:w-auto bg-primary text-primary-foreground font-black rounded-xl h-12 px-6 gap-2 shadow-sm transition-all active:scale-95">
            <Sparkles className="w-4 h-4" />
            Estudiar Ahora
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Left Column - Content & Stats */}
        <div className="xl:col-span-8 space-y-8">
          {/* Navigation Pills */}
          <div className="flex flex-wrap items-center gap-2 bg-card border border-border p-2 rounded-2xl shadow-sm">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-xl transition-all duration-200 text-sm font-bold flex-1 md:flex-none justify-center ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/20'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'opacity-100' : 'opacity-70'}`} />
                <span>{tab.label}</span>
                {tab.count !== null && (
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-black ${
                    activeTab === tab.id 
                    ? 'bg-white/20 text-white' 
                    : 'bg-muted/80 text-foreground'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Tab Content Display */}
          <div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -15, filter: 'blur(4px)' }}
                transition={{ duration: 0.25 }}
                className="h-full"
              >
                {activeTab === 'docs' && (
                  <DocsList docs={workspace.documents || []} />
                )}
                {activeTab !== 'docs' && <EmptyTabState tabName={TABS.find(t => t.id === activeTab)?.label || ''} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right Column - Secondary Context */}
        <div className="xl:col-span-4 space-y-8">
          
          {/* Progress Card */}
          <div className="bg-card border border-border rounded-3xl p-8 shadow-sm flex flex-col items-center text-center relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
            <h3 className="text-foreground text-xl font-black mb-6 relative z-10">
              Dominio General
            </h3>
            <div className="relative w-36 h-36 flex items-center justify-center mb-6 z-10">
              <svg className="w-full h-full -rotate-90 drop-shadow-sm">
                <circle
                  cx="72"
                  cy="72"
                  r="60"
                  className="stroke-muted fill-none"
                  strokeWidth="12"
                />
                <circle
                  cx="72"
                  cy="72"
                  r="60"
                  className="stroke-primary fill-none transition-all duration-1000"
                  strokeWidth="12"
                  strokeDasharray="377"
                  strokeDashoffset="120"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-foreground">68%</span>
                <span className="text-[10px] text-muted-foreground font-black uppercase tracking-wider">
                  Precisión
                </span>
              </div>
            </div>
            <p className="text-muted-foreground text-sm font-medium leading-relaxed relative z-10">
              ¡Excelente ritmo! Sigue repasando tus flashcards para alcanzar el 100% de retención antes de tu examen.
            </p>
          </div>

          {/* Context Note */}
          {workspace.customContext && (
            <div className="bg-card border border-border rounded-3xl p-8 shadow-sm relative overflow-hidden group transition-all hover:border-amber-500/30">
              <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                <MessageSquare className="w-24 h-24 text-foreground" />
              </div>
              <h3 className="text-foreground text-[10px] font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5 text-amber-500" />
                Contexto Manual
              </h3>
              <p className="text-muted-foreground text-sm font-medium leading-relaxed italic relative z-10 border-l-2 border-amber-500/50 pl-4">
                &quot;{workspace.customContext}&quot;
              </p>
            </div>
          )}

          {/* AI Banner */}
          <div className="bg-foreground rounded-3xl p-8 text-background space-y-6 shadow-lg relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-primary/20 backdrop-blur-md rounded-2xl flex items-center justify-center ring-1 ring-primary/30 group-hover:scale-110 transition-transform">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-black text-lg">Asistente Activo</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <p className="text-background/50 text-[10px] font-bold uppercase tracking-widest">
                      En línea
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-background/70 text-sm font-medium leading-relaxed bg-background/5 p-5 rounded-3xl border border-background/10 backdrop-blur-sm">
                &quot;He procesado los últimos documentos. Te recomiendo empezar con el quiz de recién agregados.&quot;
              </p>
              <Button className="w-full mt-6 bg-primary hover:bg-primary/90 text-primary-foreground font-black rounded-2xl h-14 gap-2 border border-primary/50 shadow-lg shadow-primary/20 transition-all active:scale-95">
                <MessageSquare className="w-4 h-4" />
                Abrir Chat
              </Button>
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
    </div>
  );
}

function DocsList({ docs }: { docs: DbDocument[] }) {
  const [filteredDocs, setFilteredDocs] = useState(docs);

  return (
    <div className="space-y-8">
      <SearchInput
        data={docs}
        onResultsChange={setFilteredDocs}
        placeholder="Buscar documentos..."
        showButton
        buttonText="Subir"
        suffix={<Plus className="w-5 h-5 mr-1" />}
      />

      {filteredDocs.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-muted-foreground font-medium">No hay documentos aún.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredDocs.map((doc) => (
            <div
              key={doc.id}
              className="bg-card border border-border p-5 rounded-3xl flex flex-col gap-4 hover:border-primary/40 hover:bg-muted/10 transition-all cursor-pointer group shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shrink-0">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-xl h-10 w-10 text-muted-foreground hover:text-foreground hover:bg-muted"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-xl h-10 w-10 text-muted-foreground hover:text-foreground hover:bg-muted"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2 mt-auto">
                <h4 className="font-black text-foreground text-lg group-hover:text-primary transition-colors line-clamp-1">
                  {doc.name}
                </h4>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest bg-muted/50 px-3 py-1 rounded-lg">
                    {doc.type.toUpperCase()} • {doc.sizeBytes ? `${(doc.sizeBytes / 1024 / 1024).toFixed(1)} MB` : '0 MB'}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-black uppercase tracking-widest">
                      Procesado
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function EmptyTabState({ tabName }: { tabName: string }) {
  return (
    <div className="h-full flex flex-col items-center justify-center py-20 text-center space-y-6">
      <div className="w-24 h-24 bg-card rounded-full shadow-lg flex items-center justify-center mx-auto text-muted-foreground border border-border relative">
        <Sparkles className="w-10 h-10 absolute animate-pulse text-primary/50" />
        <Layers className="w-8 h-8 opacity-50" />
      </div>
      <div className="space-y-2">
        <h3 className="text-2xl font-black text-foreground">
          Generando {tabName}
        </h3>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto font-medium">
          Nuestra inteligencia artificial está destilando tus documentos para crear este material de estudio optimizado.
        </p>
      </div>
    </div>
  );
}

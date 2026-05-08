'use client';

import Image from 'next/image';

import { Download, FileText, LucideIcon } from 'lucide-react';

import type { DbDocument, WorkspaceWithRelations } from '@repo/db';
import { Button } from '@repo/ui/components/ui/button';
import { useDownloadFile } from '@/hooks/functionalities/use-download-file';

type TabId = 'flashcards' | 'quizzes' | 'analysis';

interface WorkspaceInfoColumnProps {
  workspace: WorkspaceWithRelations;
  primaryDoc: DbDocument | null | undefined;
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
  tabs: {
    id: TabId;
    label: string;
    count: number | null;
    icon: LucideIcon;
    canGenerate?: boolean;
  }[];
}

export function WorkspaceInfoColumn({
  workspace,
  primaryDoc,
  activeTab,
  setActiveTab,
  tabs,
}: WorkspaceInfoColumnProps) {
  console.log(workspace.documents?.[0]?.name);

  const { downloadFile, isDownloading } = useDownloadFile();

  const handleDownload = () => {
    if (primaryDoc) {
      downloadFile(primaryDoc.url, primaryDoc.name);
    }
  };

  return (
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
          {/* File Card - Drive Style */}
          {primaryDoc && (
            <div className="group/file relative bg-card border border-border/60 rounded-[2rem] overflow-hidden shadow-sm transition-all hover:shadow-xl hover:border-primary/30">
              {/* Header estilo Drive */}
              <div className="p-4 flex items-center gap-3 border-b border-border/40 bg-muted/5">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-red-500" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-black text-foreground truncate uppercase tracking-tight">
                    {primaryDoc.name}
                  </p>
                  <p className="text-[9px] font-bold text-muted-foreground/60 uppercase tracking-widest">
                    Documento PDF
                  </p>
                </div>
                <Button
                  variant="ghost"
                  disabled={isDownloading}
                  onClick={handleDownload}
                  className="mr-4 cursor-pointer rounded-full hover:bg-gray-200 p-2 transition-colors"
                >
                  <Download className="size-5 text-muted-foreground" />
                </Button>
              </div>

              {/* Preview Area */}
              <div className="aspect-[4/3] relative bg-muted/30 flex items-center justify-center p-4">
                {primaryDoc.thumbnailUrl ? (
                  <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl border border-border/20">
                    <Image
                      src={primaryDoc.thumbnailUrl}
                      alt={primaryDoc.name}
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover/file:scale-110"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-4 opacity-20">
                    <FileText className="w-12 h-12" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                      Cargando vista previa...
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Navigation Tabs (Vertical Stack) */}
          <div className="flex flex-col gap-1.5 bg-card/30 p-1.5 rounded-2xl border border-border/40">
            {tabs.map((tab) => {
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
  );
}

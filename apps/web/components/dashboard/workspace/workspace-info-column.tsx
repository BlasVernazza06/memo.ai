'use client';

import Image from 'next/image';

import { FileText, Layers } from 'lucide-react';

import type { DbDocument, WorkspaceWithRelations } from '@repo/db';

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
    icon: any;
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
          {/* File Escalón - Directly above tabs */}
          {primaryDoc && (
            <div className="group/file relative bg-card/50 backdrop-blur-xl border border-border/40 rounded-3xl overflow-hidden shadow-sm transition-all hover:shadow-md hover:border-primary/20">
              <div className="aspect-video relative bg-muted flex items-center justify-center overflow-hidden">
                {primaryDoc.thumbnailUrl ? (
                  <Image
                    src={
                      primaryDoc.thumbnailUrl.startsWith('data:')
                        ? primaryDoc.thumbnailUrl
                        : primaryDoc.thumbnailUrl.length > 100
                          ? `data:image/png;base64,${primaryDoc.thumbnailUrl}`
                          : primaryDoc.thumbnailUrl
                    }
                    alt={primaryDoc.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover/file:scale-105"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <FileText className="w-10 h-10 text-muted-foreground/30" />
                    <span className="text-[10px] font-bold text-muted-foreground/20 uppercase tracking-widest">
                      Sin Miniatura
                    </span>
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 via-black/40 to-transparent p-4 flex flex-col gap-1">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                    <span className="text-[8px] font-black uppercase tracking-widest text-white/90">
                      Doc. Origen
                    </span>
                  </div>
                  <p className="text-[11px] font-bold text-white truncate pr-4">
                    {primaryDoc.name}
                  </p>
                </div>
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

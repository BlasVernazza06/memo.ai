'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { useEffect, useRef, useState } from 'react';

import { Bot, ChevronLeft, User } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { z } from 'zod';

import { Button } from '@repo/ui/components/ui/button';
import { CreateWorkspaceSchema } from '@repo/validators';

import AttachmentCard from '@/components/workspace/new/attachment-card';
import InputChat from '@/components/workspace/new/input-chat';
import { LocalFile } from '@/hooks/use-file-upload';
import { apiFetchClient } from '@/lib/api-client';
import { ChatMessage } from '@/types/workspace-chat-types';

export type CreateWorkspaceInput = z.infer<typeof CreateWorkspaceSchema>;

export default function NewWorkspaceChatPage() {
  const searchParams = useSearchParams();
  const queryChatId = searchParams.get('chatId');

  const [chatId, setChatId] = useState<string | null>(queryChatId);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [pendingWorkspaceData, setPendingWorkspaceData] =
    useState<CreateWorkspaceInput | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // 1. Inicializar la sesión de chat o cargar historia
  useEffect(() => {
    const initOrLoadChat = async () => {
      try {
        // Si ya tenemos un chatId en la URL, cargamos el historial
        if (queryChatId) {
          const history = await apiFetchClient<ChatMessage[]>(
            `/chats/${queryChatId}`,
          );
          if (history && history.length > 0) {
            setMessages(history);
            return;
          }
        }

        // Si no hay chatId o el historial está vacío, creamos uno nuevo o mostramos bienvenida
        const newChat = await apiFetchClient<{ id: string }>(`/chats`, {
          method: 'POST',
          body: JSON.stringify({ type: 'creation' }),
        });
        if (newChat) {
          setChatId(newChat.id);

          setMessages([
            {
              id: '1',
              role: 'ai',
              content:
                '¡Hola! Soy Memo. Estoy listo para ayudarte a crear un nuevo workspace de estudio inteligente. 🧠\n\n¿De qué trata este nuevo proyecto? Cuéntame un poco o sube directamente el material (PDFs, vídeos o imágenes) que quieras que analicemos juntos.',
            },
          ]);
        }
      } catch (error) {
        console.error('Error initializing chat:', error);
      }
    };

    initOrLoadChat();
  }, [queryChatId]);

  const handleSend = async (content: string, files: LocalFile[]) => {
    if (!chatId) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      attachments: files.length > 0 ? files : undefined,
      content,
    };
    setMessages((prev) => [...prev, userMessage]);

    setIsAiLoading(true);
    try {
      const formData = new FormData();
      formData.append('content', content);

      if (files[0]) {
        formData.append('file', files[0].file);
      }

      const aiData = await apiFetchClient<any>(`/chats/${chatId}/messages`, {
        method: 'POST',
        body: formData,
      });

      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: aiData.content,
      };
      setMessages((prev) => [...prev, aiResponse]);

      // Si la IA devolvió data de workspace, la guardamos para que el usuario pueda confirmar
      if (aiData.data) {
        setPendingWorkspaceData(aiData.data);
      }
    } catch (error) {
      console.error('FRONTEND AI ERROR:', error);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content:
          'Lo siento, hubo un error al conectar con mis motores de IA. ¿Podrías intentarlo de nuevo?',
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleCreateWorkspace = async () => {
    if (!pendingWorkspaceData) return;

    try {
      const data = await apiFetchClient<{ id: string }>(`/workspaces`, {
        method: 'POST',
        body: JSON.stringify(pendingWorkspaceData),
      });

      router.push(`/dashboard/workspaces/${data.id}`);
    } catch (error) {
      console.error('ERROR CREATING WORKSPACE:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen max-w-4xl mx-auto py-6">
      {/* Header / Back */}
      <div className="flex items-center justify-between mb-8 shrink-0">
        <Link href="/dashboard">
          <Button
            variant="ghost"
            className="rounded-2xl gap-2 font-bold text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Volver
          </Button>
        </Link>
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-black text-foreground">
            Nuevo Workspace
          </h1>
        </div>
        <div className="w-20" /> {/* Spacer for balance */}
      </div>

      {/* Chat Area */}
      <div
        className="flex-1 overflow-y-auto px-4 space-y-8 pb-10 scrollbar-hide"
        ref={scrollRef}
      >
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`flex gap-4 max-w-[85%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div
                  className={`w-10 h-10 shrink-0 rounded-2xl flex items-center justify-center shadow-sm ${
                    message.role === 'ai'
                      ? 'bg-primary text-white'
                      : 'bg-card border border-border text-foreground'
                  }`}
                >
                  {message.role === 'ai' ? (
                    <Bot className="w-5 h-5" />
                  ) : (
                    <User className="w-5 h-5" />
                  )}
                </div>
                <div className="space-y-4">
                  {message.attachments && (
                    <div className="flex flex-wrap gap-2">
                      {message.attachments.map((file) => (
                        <AttachmentCard key={file.id} file={file} />
                      ))}
                    </div>
                  )}
                  {message.content && (
                    <div
                      className={`p-5 rounded-3xl text-sm font-medium leading-relaxed shadow-sm ${
                        message.role === 'ai'
                          ? 'bg-muted border border-transparent text-foreground rounded-tl-none'
                          : 'bg-primary text-white rounded-tr-none'
                      }`}
                    >
                      {message.content.split('\n').map((line, i) => (
                        <p key={i} className={i > 0 ? 'mt-2' : ''}>
                          {line}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
          {isAiLoading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex justify-start"
            >
              <div className="flex gap-4">
                <div className="w-10 h-10 shrink-0 rounded-2xl bg-primary text-white flex items-center justify-center shadow-sm">
                  <Bot className="w-5 h-5 animate-pulse" />
                </div>
                <div className="bg-muted border border-transparent p-4 rounded-3xl rounded-tl-none shadow-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="relative">
        <AnimatePresence>
          {pendingWorkspaceData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute -top-20 left-0 right-0 flex justify-center px-4"
            >
              <Button
                onClick={handleCreateWorkspace}
                className="bg-primary hover:bg-primary/90 text-white rounded-2xl px-8 py-6 shadow-2xl shadow-primary/30 flex items-center gap-3 font-bold group border-white/20 border cursor-pointer active:scale-95 transition-all"
              >
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
                  <span className="text-lg">✨</span>
                </div>
                Confirmar y Crear Workspace
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
        <InputChat onSend={handleSend} />
      </div>
    </div>
  );
}

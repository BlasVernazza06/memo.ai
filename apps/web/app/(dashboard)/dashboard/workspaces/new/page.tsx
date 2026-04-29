'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { useEffect, useRef, useState } from 'react';

import {
  ArrowDown,
  BookOpen,
  Bot,
  Brain,
  ChevronLeft,
  FileText,
  Sparkles,
  User,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { z } from 'zod';

import { Button } from '@repo/ui/components/ui/button';
import { CreateWorkspaceSchema } from '@repo/validators';

import AttachmentCard from '@/components/chat/attachment-card';
import InputChat from '@/components/chat/input-chat';
import SuggestionCard from '@/components/chat/suggestion-card';
import SuggestionList from '@/components/chat/suggestion-list';
import WorkspaceCreationActions from '@/components/chat/workspace-creation-actions';
import { LocalFile } from '@/hooks/use-file-upload';
import { apiFetchClient } from '@/lib/api-client';
import { useAuth } from '@/lib/auth-provider';
import { ChatMessage } from '@/types/workspace-chat-types';

export type CreateWorkspaceInput = z.infer<typeof CreateWorkspaceSchema>;

export default function NewWorkspaceChatPage() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const queryChatId = searchParams.get('chatId');

  const [chatId, setChatId] = useState<string | null>(queryChatId);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [pendingWorkspaceData, setPendingWorkspaceData] =
    useState<CreateWorkspaceInput | null>(null);
  const [lastFile, setLastFile] = useState<File | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const isInitialState = messages.length <= 1;

  // 1. Inicializar la sesión de chat o cargar historia
  useEffect(() => {
    const initOrLoadChat = async () => {
      try {
        if (queryChatId) {
          const history = await apiFetchClient<ChatMessage[]>(
            `/chats/${queryChatId}`,
          );
          if (history && history.length > 0) {
            setMessages(history);
            return;
          }
        }

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
                '¡Hola! Soy Memo. Estoy listo para ayudarte a crear un nuevo workspace de estudio inteligente. 🧠\n\n¿De qué trata este nuevo proyecto?',
            },
          ]);
        }
      } catch (error) {
        console.error('Error initializing chat:', error);
      }
    };

    initOrLoadChat();
  }, [queryChatId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, isAiLoading]);

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
        setLastFile(files[0].file);
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

      if (aiData.data) {
        setPendingWorkspaceData(aiData.data);
      }
    } catch (error) {
      console.error('FRONTEND AI ERROR:', error);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: 'Lo siento, hubo un error al conectar con mis motores de IA.',
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleCreateWorkspace = async () => {
    if (!pendingWorkspaceData) return;

    setIsCreating(true);
    try {
      const finalWorkspaceData = { ...pendingWorkspaceData };

      // 1. Si hay un archivo pendiente, subirlo a S3 ahora
      if (lastFile) {
        console.log('[NewWorkspace] Obteniendo Presigned URL...');
        const presignedData = await apiFetchClient<{
          uploadUrl: string;
          key: string;
          url: string;
        }>(
          `/storage/presigned-url?fileName=${encodeURIComponent(lastFile.name)}&contentType=${encodeURIComponent(lastFile.type)}`,
        );

        console.log('[NewWorkspace] Subiendo archivo directamente a S3...');
        await fetch(presignedData.uploadUrl, {
          method: 'PUT',
          body: lastFile,
          headers: {
            'Content-Type': lastFile.type,
          },
        });

        // Actualizar los datos del documento con la info real de S3
        if (
          finalWorkspaceData.documents &&
          finalWorkspaceData.documents.length > 0
        ) {
          finalWorkspaceData.documents = finalWorkspaceData.documents.map(
            (doc) => ({
              ...doc,
              key: presignedData.key,
              url: presignedData.url,
            }),
          );
        } else if (finalWorkspaceData.document) {
          finalWorkspaceData.document = {
            ...finalWorkspaceData.document,
            key: presignedData.key,
            url: presignedData.url,
          };
        }
      }

      console.log('[NewWorkspace] Creando registro en la base de datos...');
      const data = await apiFetchClient<{ id: string }>(`/workspaces`, {
        method: 'POST',
        body: JSON.stringify(finalWorkspaceData),
      });

      router.push(`/dashboard/workspaces/${data.id}`);
    } catch (error) {
      console.error('ERROR CREATING WORKSPACE:', error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-5xl mx-auto py-6 overflow-hidden bg-background">
      {/* Header / Back */}
      <div className="flex items-center justify-between px-4 mb-2 shrink-0">
        <Link href="/dashboard">
          <Button
            variant="ghost"
            className="rounded-2xl gap-2 font-bold text-muted-foreground hover:text-foreground hover:bg-muted transition-all active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
            Salir
          </Button>
        </Link>
        <div className="flex flex-col items-center">
          <h1 className="text-xl font-black text-foreground leading-none">
            Memo.ai
          </h1>
          <span className="text-[10px] uppercase font-bold tracking-widest text-primary mt-1">
            Creador de Workspace
          </span>
        </div>
        <div className="w-20" />
      </div>

      {/* Chat Area */}
      <div
        className="flex-1 overflow-y-auto px-4 scrollbar-hide flex flex-col pt-10"
        ref={scrollRef}
      >
        <AnimatePresence mode="wait">
          {isInitialState ? (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 flex flex-col justify-center items-center text-center pb-20 mt-auto"
            >
              <div className="space-y-4 mb-20">
                <h2 className="text-4xl md:text-5xl font-bl tracking-tighter text-foreground">
                  Hola,{' '}
                  <span className="text-primary">
                    {user?.name.split(' ')[0] || 'estudiante'}
                  </span>
                </h2>
                <h3 className="text-3xl md:text-4xl font-black tracking-tighter text-gray-700 leading-none">
                  ¿Qué te gustaría aprender hoy?
                </h3>
              </div>

              <SuggestionList setInputValue={setInputValue} />

              <button className="flex items-center gap-2 mt-12 text-[10px] font-black text-muted-foreground/30 hover:text-primary transition-colors uppercase tracking-[0.3em]">
                <ArrowDown className="w-3 h-3" />
                Define tus propias reglas
              </button>
            </motion.div>
          ) : (
            <div className="space-y-8 pb-10">
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
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <WorkspaceCreationActions
        pendingWorkspaceData={pendingWorkspaceData}
        handleCreateWorkspace={handleCreateWorkspace}
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleSend={handleSend}
        isLoading={isCreating}
      />
    </div>
  );
}

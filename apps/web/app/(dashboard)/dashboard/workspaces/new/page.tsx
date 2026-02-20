'use client';

import { useState, useRef } from "react";

import Link from "next/link";

import { Bot, User, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { ChatMessage } from "@/types/workspace-chat-types";

import { LocalFile } from "@/hooks/use-file-upload";

import { Button } from "@repo/ui/components/ui/button";
import InputChat from "@/components/workspace/new/input-chat";
import AttachmentCard from "@/components/workspace/new/attachment-card";

export default function NewWorkspaceChatPage() {
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: '1',
            role: 'ai',
            content: "¡Hola! Soy Memo. Estoy listo para ayudarte a crear un nuevo workspace de estudio inteligente. 🧠\n\n¿De qué trata este nuevo proyecto? Cuéntame un poco o sube directamente el material (PDFs, vídeos o imágenes) que quieras que analicemos juntos."
        }
    ]);
    const scrollRef = useRef<HTMLDivElement>(null);

    const handleSend = async (content: string, files: LocalFile[]) => {
        console.log("SEND BUTTON CLICKED", { content, filesCount: files.length });
        
        const userMessage: ChatMessage = {
            id: Date.now().toString(),
            role: 'user',
            attachments: files.length > 0 ? files : undefined,
            content
        };
        setMessages(prev => [...prev, userMessage]);

        try {
            const formData = new FormData();
            formData.append('userContext', content);
            
            // Si hay un archivo, lo enviamos (tomamos el primero para la demo)
            if (files[0]) {
                formData.append('file', files[0].file);
            }

            const response = await fetch('http://localhost:3000/ai/process', {
                method: 'POST',
                body: formData,
                credentials: 'include', // <--- Envía las cookies de sesión
            });

            console.log("BACKEND RESPONSE STATUS:", response.status);

            if (!response.ok) {
                const errorData = await response.text();
                console.error("errorData", errorData)
                throw new Error(`Error ${response.status}: ${errorData}`);
            }

            const aiData = await response.json();
            
            const aiResponse: ChatMessage = {
                id: (Date.now() + 1).toString(),
                role: 'ai',
                content: `¡Procesado con éxito! 🧠\n\n**Resumen:** ${aiData.summary}\n\nHe generado ${aiData.flashcards.length} flashcards y ${aiData.quizzes.length} preguntas de quiz para ti.`
            };
            setMessages(prev => [...prev, aiResponse]);

        } catch (error) {
            console.error("FRONTEND AI ERROR:", error);
            const errorMsg: ChatMessage = {
                id: (Date.now() + 1).toString(),
                role: 'ai',
                content: "Lo siento, hubo un error al conectar con mis motores de IA. ¿Podrías intentarlo de nuevo?"
            };
            setMessages(prev => [...prev, errorMsg]);
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-120px)] max-w-4xl mx-auto py-6">
            
            {/* Header / Back */}
            <div className="flex items-center justify-between mb-8 shrink-0">
                <Link href="/dashboard">
                    <Button variant="ghost" className="rounded-2xl gap-2 font-bold text-slate-400 hover:text-slate-900 transition-colors">
                        <ChevronLeft className="w-5 h-5" />
                        Volver
                    </Button>
                </Link>
                <div className="flex items-center gap-3">
                    <h1 className="text-xl font-black text-slate-900">Nuevo Workspace</h1>
                </div>
                <div className="w-20" /> {/* Spacer for balance */}
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto px-4 space-y-8 pb-10 scrollbar-hide" ref={scrollRef}>
                <AnimatePresence initial={false}>
                    {messages.map((message) => (
                        <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`flex gap-4 max-w-[85%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                <div className={`w-10 h-10 shrink-0 rounded-2xl flex items-center justify-center shadow-sm ${
                                    message.role === 'ai' 
                                    ? 'bg-primary text-white' 
                                    : 'bg-white border border-slate-200 text-slate-600'
                                }`}>
                                    {message.role === 'ai' ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
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
                                        <div className={`p-5 rounded-3xl text-sm font-medium leading-relaxed shadow-sm ${
                                            message.role === 'ai' 
                                            ? 'bg-white border border-slate-100 text-slate-700 rounded-tl-none' 
                                            : 'bg-primary text-white rounded-tr-none'
                                        }`}>
                                            {message.content.split('\n').map((line, i) => (
                                                <p key={i} className={i > 0 ? "mt-2" : ""}>{line}</p>
                                            ))}
                                        </div>
                                    )}

                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Input Area */}
            <InputChat onSend={handleSend} />
        </div>
    );
}

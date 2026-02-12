'use client';

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
    Send, 
    FileText, 
    Image as ImageIcon, 
    Video, 
    X, 
    Bot,
    User,
    ChevronLeft,
    Plus,
    Mic
} from "lucide-react";
import { Button } from "@repo/ui/components/ui/button";
import Link from "next/link";

interface Message {
    id: string;
    role: 'user' | 'ai';
    content: string;
    attachments?: Attachment[];
}

interface Attachment {
    id: string;
    name: string;
    type: 'pdf' | 'image' | 'video';
}

export default function NewWorkspaceChatPage() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'ai',
            content: "¡Hola! Soy Memo. Estoy listo para ayudarte a crear un nuevo workspace de estudio inteligente. 🧠\n\n¿De qué trata este nuevo proyecto? Cuéntame un poco o sube directamente el material (PDFs, vídeos o imágenes) que quieras que analicemos juntos."
        }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [attachments, setAttachments] = useState<Attachment[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const adjustHeight = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    const handleSend = () => {
        if (!inputValue.trim() && attachments.length === 0) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: inputValue,
            attachments: attachments.length > 0 ? [...attachments] : undefined
        };

        setMessages([...messages, newMessage]);
        setInputValue("");
        setAttachments([]);
        if (textareaRef.current) textareaRef.current.style.height = "auto";

        // Mock AI response
        setTimeout(() => {
            const aiResponse: Message = {
                id: (Date.now() + 1).toString(),
                role: 'ai',
                content: "Entendido. He procesado la información y los archivos. Estoy configurando el entorno de aprendizaje óptimo para este tema. ¿Quieres que genere algunas flashcards iniciales o prefieres empezar explorando los documentos?"
            };
            setMessages(prev => [...prev, aiResponse]);
        }, 1500);
    };

    const addMockAttachment = (type: 'pdf' | 'image' | 'video') => {
        const names = {
            pdf: "Apuntes_Clase_01.pdf",
            image: "Diagrama_Anatomia.png",
            video: "Clase_Grabada.mp4"
        };
        const newAttachment: Attachment = {
            id: Math.random().toString(),
            name: names[type],
            type
        };
        setAttachments([...attachments, newAttachment]);
    };

    const removeAttachment = (id: string) => {
        setAttachments(attachments.filter(a => a.id !== id));
    };

    return (
        <div className="flex flex-col h-[calc(100vh-120px)] max-w-4xl mx-auto py-6">
            
            {/* Header / Back */}
            <div className="flex items-center justify-between mb-8 shrink-0">
                <Link href="/dashboard/workspaces">
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

                                    {message.attachments && (
                                        <div className="flex flex-wrap gap-2">
                                            {message.attachments.map((file) => (
                                                <div key={file.id} className="bg-white border border-slate-100 p-3 rounded-2xl flex items-center gap-3 shadow-sm">
                                                    {file.type === 'pdf' && <FileText className="w-4 h-4 text-blue-500" />}
                                                    {file.type === 'image' && <ImageIcon className="w-4 h-4 text-emerald-500" />}
                                                    {file.type === 'video' && <Video className="w-4 h-4 text-red-500" />}
                                                    <span className="text-[11px] font-bold text-slate-600">{file.name}</span>
                                                </div>
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
            <div className="shrink-0 p-4">
                <div className="bg-white border border-slate-200/60 rounded-4xl shadow-2xl p-3 space-y-3 relative group">
                    <div className="absolute -inset-1 bg-linear-to-r from-primary/10 to-blue-500/10 rounded-[2.6rem] blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
                    
                    {/* Attachment Previews */}
                    <AnimatePresence>
                        {attachments.length > 0 && (
                            <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="flex flex-wrap gap-2 px-3 pb-2 border-b border-slate-50"
                            >
                                {attachments.map((file) => (
                                    <motion.div 
                                        key={file.id}
                                        layout
                                        className="bg-slate-50 border border-slate-100 p-2 pl-3 rounded-xl flex items-center gap-2 group/file"
                                    >
                                        <span className="text-[10px] font-black text-slate-500 uppercase">{file.type}</span>
                                        <span className="text-xs font-bold text-slate-700 truncate max-w-[120px]">{file.name}</span>
                                        <button 
                                            onClick={() => removeAttachment(file.id)}
                                            className="p-1 hover:bg-white rounded-lg transition-colors text-slate-400 hover:text-red-500"
                                        >
                                            <X className="w-3.5 h-3.5" />
                                        </button>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="flex items-end gap-2 px-1 relative z-10">
                        <div className="flex flex-col w-full gap-1">
                            <textarea 
                                ref={textareaRef}
                                value={inputValue}
                                onChange={(e) => {
                                    setInputValue(e.target.value);
                                    adjustHeight();
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSend();
                                    }
                                }}
                                rows={1}
                                placeholder="Escribe el nombre del workspace o cuéntame qué quieres estudiar..."
                                className="w-full bg-transparent border-none focus:ring-0 outline-none focus:outline-none resize-none px-4 py-3 text-base font-semibold text-slate-900 placeholder:text-slate-300 overflow-y-auto max-h-[200px] scrollbar-hide ease-out duration-200"
                            />
                            <div className="flex w-full justify-between items-center gap-2 px-1 pb-1">
                                <div className="flex items-center gap-1">
                                    <button 
                                        onClick={() => addMockAttachment('pdf')}
                                        className="p-2.5 hover:bg-slate-50 rounded-xl text-slate-400 hover:text-blue-500 transition-all active:scale-90"
                                        title="Adjuntar PDF"
                                    >
                                        <FileText className="w-5 h-5" />
                                    </button>
                                    <button 
                                        onClick={() => addMockAttachment('image')}
                                        className="p-2.5 hover:bg-slate-50 rounded-xl text-slate-400 hover:text-emerald-500 transition-all active:scale-90"
                                        title="Adjuntar Imagen"
                                    >
                                        <ImageIcon className="w-5 h-5" />
                                    </button>
                                    <button 
                                        onClick={() => addMockAttachment('video')}
                                        className="p-2.5 hover:bg-slate-50 rounded-xl text-slate-400 hover:text-red-500 transition-all active:scale-90"
                                        title="Adjuntar Vídeo"
                                    >
                                        <Video className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button className="p-2.5 hover:bg-slate-50 rounded-xl text-slate-300 transition-all hover:text-primary active:scale-95">
                                        <Mic className="w-5 h-5" />
                                    </button>
                                    <button 
                                        onClick={handleSend}
                                        disabled={!inputValue.trim() && attachments.length === 0}
                                        className="p-3 bg-primary text-white rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 active:scale-90 transition-all disabled:opacity-30 disabled:scale-100 disabled:shadow-none"
                                    >
                                        <Send className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <p className="text-center text-[10px] font-bold text-slate-300 uppercase tracking-widest mt-4">
                    Memo IA puede cometer errores. Verifica la información importante.
                </p>
            </div>
        </div>
    );
}

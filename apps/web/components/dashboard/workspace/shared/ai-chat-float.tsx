import { Brain, MessageSquare, X, SendHorizontal, Sparkles } from 'lucide-react';
import { Button } from '@repo/ui/components/ui/button';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

export function AiChatFloat() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 30, scale: 0.9, filter: 'blur(10px)' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-[400px] h-[550px] bg-card/60 backdrop-blur-3xl border border-border/40 rounded-[2.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)] flex flex-col overflow-hidden ring-1 ring-white/10"
          >
            {/* Header */}
            <div className="p-7 border-b border-border/30 flex items-center justify-between bg-linear-to-b from-muted/50 to-transparent">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
                    <Brain className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-background animate-pulse" />
                </div>
                <div>
                  <h3 className="font-black text-base text-foreground leading-tight">Memo AI</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Sparkles className="w-3 h-3 text-primary fill-current" />
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.15em]">Analítico y Activo</span>
                  </div>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsOpen(false)}
                className="rounded-2xl hover:bg-muted w-10 h-10 transition-transform active:scale-90"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </Button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-8 flex flex-col items-center justify-center text-center space-y-6">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
                <div className="w-20 h-20 bg-muted/50 rounded-[2rem] flex items-center justify-center relative border border-white/10">
                  <MessageSquare className="w-10 h-10 text-primary/40" />
                </div>
              </div>
              <div className="space-y-2 max-w-[280px]">
                <p className="text-foreground font-black text-lg leading-tight">
                  ¿Cómo puedo ayudarte?
                </p>
                <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                  He profundizado en tus documentos y estoy listo para resolver cualquier duda o generar nuevos ejercicios.
                </p>
              </div>
            </div>

            {/* Input Area */}
            <div className="p-6 bg-linear-to-t from-muted/40 to-transparent">
              <div className="relative group">
                <div className="absolute -inset-1 bg-linear-to-r from-primary/50 to-primary/30 rounded-3xl blur opacity-0 group-focus-within:opacity-20 transition-opacity" />
                <input 
                  type="text" 
                  placeholder="Pregúntame lo que sea..."
                  className="w-full bg-background border border-border/50 rounded-2xl pl-6 pr-16 h-16 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all shadow-inner placeholder:text-muted-foreground/40"
                />
                <Button 
                  className="absolute right-2 top-2 h-12 w-12 p-0 rounded-xl bg-foreground text-background hover:bg-foreground/90 shadow-xl shadow-black/10 transition-all active:scale-90"
                >
                  <SendHorizontal className="w-5 h-5" />
                </Button>
              </div>
              <p className="text-center mt-4 text-[9px] font-bold text-muted-foreground/40 uppercase tracking-widest">
                Potenciado por Memo Vision 1.0
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <div className="flex flex-col items-end gap-4 group">
        {!isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: 20, filter: 'blur(5px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            className="bg-foreground text-background text-[10px] font-black uppercase tracking-[0.2em] px-5 py-3 rounded-2xl shadow-2xl shadow-black/20 opacity-0 lg:group-hover:opacity-100 transition-all duration-300 pointer-events-none border border-white/10 flex items-center gap-2"
          >
            <span>Conversar con Assistant</span>
            <div className="absolute -bottom-1.5 right-8 w-3 h-3 bg-foreground rotate-45" />
          </motion.div>
        )}

        <Button 
          onClick={() => setIsOpen(!isOpen)}
          className={`h-20 w-20 md:h-16 md:w-auto md:px-8 rounded-full md:rounded-[2rem] gap-4 shadow-2xl transition-all hover:scale-105 active:scale-95 border-2 ${
            isOpen 
            ? 'bg-background hover:bg-muted text-foreground border-border/50' 
            : 'bg-foreground hover:bg-foreground/90 text-background border-white/10'
          }`}
        >
          <div className={`relative flex items-center justify-center w-10 md:w-8 h-10 md:h-8 rounded-xl ${isOpen ? 'bg-primary/10' : 'bg-primary'}`}>
            {isOpen ? (
              <X className="w-5 h-5 text-primary" />
            ) : (
              <Brain className="w-5 md:w-4 h-5 md:h-4 text-primary-foreground" />
            )}
            {!isOpen && (
              <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-4 border-foreground"></span>
              </span>
            )}
          </div>
          <span className="hidden md:flex font-black text-base tracking-tight items-center gap-3">
            {isOpen ? 'Cerrar Panel' : 'Nexus AI'}
            {!isOpen && <Sparkles className="w-4 h-4 text-primary fill-current animate-pulse" />}
          </span>
        </Button>
      </div>
    </div>
  );
}

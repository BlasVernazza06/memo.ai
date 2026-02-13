'use client';

import { motion, AnimatePresence } from "motion/react";
import { X, Trash2 } from "lucide-react";
import { Button } from "@repo/ui/components/ui/button";

interface WorkspaceSettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    workspace: {
        name: string;
        description: string | null;
        icon: string | null;
    };
}

export default function WorkspaceSettingsModal({ isOpen, onClose, workspace }: WorkspaceSettingsModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-950/40 backdrop-blur-md" 
                    />
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="bg-white rounded-[2.5rem] w-full max-w-lg shadow-2xl relative z-101 overflow-hidden"
                    >
                        <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                            <h3 className="text-xl font-black text-slate-900">Configuración del Workspace</h3>
                            <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-xl transition-colors">
                                <X className="w-5 h-5 text-slate-400" />
                            </button>
                        </div>
                        <div className="p-8 space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Nombre</label>
                                <input 
                                    className="w-full bg-slate-50 border-none rounded-2xl px-5 h-14 font-bold focus:ring-2 focus:ring-primary/20 transition-all outline-hidden" 
                                    defaultValue={workspace.name} 
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Descripción</label>
                                <textarea 
                                    className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 font-bold focus:ring-2 focus:ring-primary/20 transition-all h-24 resize-none outline-hidden" 
                                    defaultValue={workspace.description || ""} 
                                />
                            </div>
                            <div className="flex gap-4">
                                <Button className="flex-1 bg-primary text-white font-black rounded-2xl h-14" onClick={onClose}>
                                    Guardar Cambios
                                </Button>
                                <Button variant="ghost" className="bg-rose-50 text-rose-500 hover:bg-rose-100 font-black rounded-2xl h-14 px-6 md:px-8">
                                    <Trash2 className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

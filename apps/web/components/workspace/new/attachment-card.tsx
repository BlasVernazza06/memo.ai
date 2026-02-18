'use client'

import { motion } from "motion/react";
import { X } from "lucide-react";
import { LocalFile } from "@/hooks/use-file-upload";
import { getFileIcon } from "@/hooks/use-get-icon";
import { formatFileSize } from "@/hooks/use-file-size";

interface AttachmentCardProps {
    file: LocalFile;
    onRemove?: (id: string) => void;
}

export default function AttachmentCard({ file, onRemove }: AttachmentCardProps) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white shadow-lg border border-slate-100 p-2 pl-3 rounded-xl flex items-center gap-2 group/file"
        >
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center border border-slate-100 shadow-xs">
                {getFileIcon(file.type)}
            </div>
            <div className="flex flex-col min-w-0">
                <div className="flex gap-2">
                    <span className="text-[10px] font-black text-slate-400 uppercase leading-none mb-0.5">{file.type}</span>
                    <span className="text-[10px] font-black text-dark uppercase leading-none mb-0.5">{formatFileSize(file.size)}</span>
                </div>
                <span className="text-xs font-bold text-slate-700 truncate max-w-[120px] leading-tight">{file.name}</span>
            </div>
            {onRemove && (
                <button
                    type="button"
                    onClick={() => onRemove(file.id)}
                    className="p-1.5 hover:bg-white rounded-lg transition-colors text-slate-300 hover:text-rose-500 cursor-pointer"
                >
                    <X className="w-3.5 h-3.5" />
                </button>
            )}
        </motion.div>
    );
}
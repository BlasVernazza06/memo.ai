'use client';

import { motion } from "motion/react";
import { Clock, BookOpen, Award, FileText, Calendar, ChevronRight } from "lucide-react";

const ACTIVITY = [
    { action: "Estudiaste Anatomía II", date: "Hace 20 min", icon: BookOpen, color: "text-blue-500" },
    { action: "Creaste 24 flashcards", date: "Hace 2 horas", icon: Award, color: "text-purple-500" },
    { action: "Subiste Marketing.pdf", date: "Ayer, 18:30", icon: FileText, color: "text-orange-500" },
];

export function ProfileActivity() {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-slate-200/60 rounded-4xl p-8 shadow-sm"
        >
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-3 mb-8">
                <Clock className="w-6 h-6 text-blue-500" />
                Actividad
            </h3>

            <div className="space-y-2">
                {ACTIVITY.map((item, i) => (
                    <motion.div 
                        key={i} 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + i * 0.1 }}
                        className="flex items-center gap-4 group cursor-pointer p-3 hover:bg-slate-50 rounded-2xl transition-colors"
                    >
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all shrink-0">
                            <item.icon className={`w-5 h-5 ${item.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-slate-900 truncate">{item.action}</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase flex items-center gap-1.5 pt-0.5">
                                <Calendar className="w-3 h-3" />
                                {item.date}
                            </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary opacity-0 group-hover:opacity-100 transition-all" />
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

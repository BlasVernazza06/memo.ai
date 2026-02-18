'use client';

import { useState, useEffect, useRef } from "react";

import { Search, X } from "lucide-react";

import { Input } from "@repo/ui/components/ui/input";
import { Button } from "@repo/ui/components/ui/button";
import { cn } from "@repo/ui/utils";

interface SearchInputProps<T> {
    data?: T[];
    onResultsChange?: (results: T[]) => void;
    searchKeys?: (keyof T)[];
    placeholder?: string;
    className?: string;
    variant?: 'hero' | 'standard';
    showButton?: boolean;
    buttonText?: string;
    value?: string;
    onChange?: (value: string) => void;
    suffix?: React.ReactNode;
}

export default function SearchInput<T>({
    data,
    onResultsChange,
    searchKeys = [],
    placeholder = "Buscar...",
    className,
    variant = 'standard',
    showButton = false,
    buttonText = "Buscar",
    value,
    onChange,
    suffix
}: SearchInputProps<T>) {
    const [internalQuery, setInternalQuery] = useState("");
    const lastResultsRef = useRef<T[] | null>(null);
    
    const query = value !== undefined ? value : internalQuery;
    const setQuery = onChange || setInternalQuery;

    // Usamos stringify para que la referencia del array searchKeys no dispare el efecto si el contenido es igual
    const searchKeysDeps = JSON.stringify(searchKeys);

    useEffect(() => {
        if (!data || !onResultsChange) return;

        let filtered: T[];

        if (!query.trim()) {
            filtered = data;
        } else {
            const searchStr = query.toLowerCase();
            filtered = data.filter(item => {
                if (searchKeys.length > 0) {
                    return searchKeys.some(key => {
                        const val = item[key];
                        if (val === null || val === undefined) return false;
                        return String(val).toLowerCase().includes(searchStr);
                    });
                }
                return Object.values(item as object).some(val => 
                    (typeof val === 'string' || typeof val === 'number') && 
                    String(val).toLowerCase().includes(searchStr)
                );
            });
        }

        // EVITAR LOOP INFINITO: Solo notificar si el resultado es realmente diferente
        const isSameResult = lastResultsRef.current && 
                           lastResultsRef.current.length === filtered.length &&
                           lastResultsRef.current.every((val, index) => val === filtered[index]);

        if (!isSameResult) {
            lastResultsRef.current = filtered;
            onResultsChange(filtered);
        }
    }, [query, data, searchKeysDeps, onResultsChange, searchKeys]);

    const handleClear = () => setQuery("");

    if (variant === 'hero') {
        return (
            <div className={cn("relative group w-full max-w-2xl mx-auto", className)}>
                <div className="absolute -inset-1 bg-linear-to-r from-primary/20 to-blue-500/20 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-white border border-slate-200 shadow-2xl rounded-4xl p-2 flex items-center">
                    <Search className="w-6 h-6 text-slate-400 ml-4" />
                    <Input 
                        placeholder={placeholder}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="bg-transparent border-0 shadow-none h-14 text-lg focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-slate-300 font-medium flex-1 px-4"
                    />
                    {query && (
                        <button 
                            onClick={handleClear}
                            type="button"
                            className="p-2 mr-2 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    )}
                    <Button className="bg-primary hover:bg-primary/90 text-white font-bold rounded-2xl h-12 px-8 shadow-lg shadow-primary/20 active:scale-95 transition-all">
                        {buttonText}
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className={cn("bg-white border border-slate-200/60 p-3 rounded-4xl shadow-sm flex flex-col md:flex-row gap-4 items-center", className)}>
            <div className="relative flex-1 w-full flex items-center">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input 
                    placeholder={placeholder}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="pl-12 bg-transparent border-0 shadow-none h-12 focus-visible:ring-0 focus:ring-0 text-slate-900 placeholder:text-slate-400 font-medium flex-1" 
                />
                {query && (
                    <button 
                        onClick={handleClear}
                        type="button"
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>
            {(showButton || suffix) && (
                <div className="flex items-center gap-2 w-full md:w-auto md:ml-2">
                    {suffix}
                    {showButton && (
                        <Button className="bg-primary hover:bg-primary/90 text-white font-bold rounded-2xl h-11 px-6 shadow-sm active:scale-95 transition-all w-full md:w-auto">
                            {buttonText}
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
}

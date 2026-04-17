'use client';

import { useEffect, useRef, useState } from 'react';

import { Search, X } from 'lucide-react';

import { Button } from '@repo/ui/components/ui/button';
import { Input } from '@repo/ui/components/ui/input';
import { cn } from '@repo/ui/utils';

interface SearchInputProps<T> {
  data?: T[];
  onResultsChange?: (results: T[]) => void;
  searchKeys?: (keyof T)[];
  placeholder?: string;
  className?: string;
  variant?: 'hero' | 'standard' | 'compact';
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
  placeholder = 'Buscar...',
  className,
  variant = 'standard',
  showButton = false,
  buttonText = 'Buscar',
  value,
  onChange,
  suffix,
}: SearchInputProps<T>) {
  const [internalQuery, setInternalQuery] = useState('');
  const lastResultsRef = useRef<T[] | null>(null);

  const query = value !== undefined ? value : internalQuery;
  const setQuery = onChange || setInternalQuery;

  const searchKeysDeps = JSON.stringify(searchKeys);

  useEffect(() => {
    if (!data || !onResultsChange) return;

    let filtered: T[];

    if (!query.trim()) {
      filtered = data;
    } else {
      const searchStr = query.toLowerCase();
      filtered = data.filter((item) => {
        if (searchKeys.length > 0) {
          return searchKeys.some((key) => {
            const val = item[key];
            if (val === null || val === undefined) return false;
            return String(val).toLowerCase().includes(searchStr);
          });
        }
        return Object.values(item as object).some(
          (val) =>
            (typeof val === 'string' || typeof val === 'number') &&
            String(val).toLowerCase().includes(searchStr),
        );
      });
    }

    const isSameResult =
      lastResultsRef.current &&
      lastResultsRef.current.length === filtered.length &&
      lastResultsRef.current.every((val, index) => val === filtered[index]);

    if (!isSameResult) {
      lastResultsRef.current = filtered;
      onResultsChange(filtered);
    }
  }, [query, data, searchKeysDeps, onResultsChange, searchKeys]);

  const handleClear = () => setQuery('');

  if (variant === 'hero') {
    return (
      <div className={cn('relative group w-full max-w-2xl mx-auto', className)}>
        {/* Aggressive Glow Background */}
        <div className="absolute -inset-[2px] rounded-4xl bg-linear-to-r from-primary via-blue-500 to-primary opacity-40 blur-md group-hover:opacity-80 transition-opacity duration-500 animate-pulse" />
        
        {/* Animated Border Beam (Simulated with rotating gradient) */}
        <div className="absolute -inset-[1px] rounded-4xl overflow-hidden pointer-events-none">
          <div className="absolute inset-[-200%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_120deg,var(--primary)_180deg,transparent_240deg)] opacity-60" />
        </div>

        <div className="relative bg-card/80 backdrop-blur-2xl border border-white/5 shadow-[0_0_40px_-10px_rgba(var(--primary),0.3)] group-hover:shadow-[0_0_60px_-5px_rgba(var(--primary),0.4)] rounded-4xl p-2 flex items-center group overflow-hidden transition-all duration-500">
          {/* Blurreo Previo / Inset Highlight Rim */}
          <div className="absolute inset-0 rounded-4xl ring-1 ring-inset ring-white/10 pointer-events-none" />
          <div className="absolute inset-px rounded-4xl ring-1 ring-inset ring-white/5 pointer-events-none" />
          
          <Search className="w-6 h-6 text-muted-foreground ml-4 group-hover:text-primary transition-colors" />
          <Input
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-transparent border-0 shadow-none h-14 text-lg focus-visible:ring-0 focus-visible:outline-none focus:ring-0 placeholder:text-muted-foreground/30 font-medium flex-1 px-4 text-foreground"
          />
          {query && (
            <button
              onClick={handleClear}
              type="button"
              className="p-2 mr-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-2xl h-12 px-8 shadow-[0_0_20px_-5px_rgba(var(--primary),0.5)] active:scale-95 transition-all">
            {buttonText}
          </Button>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div
        className={cn(
          'bg-card border border-border p-1.5 rounded-2xl shadow-sm flex items-center transition-all duration-300 focus-within:ring-4 focus-within:ring-primary/10 focus-within:border-primary/50',
          className,
        )}
      >
        <div className="relative flex-1 w-full flex items-center">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9 bg-transparent border-0 shadow-none h-10 focus-visible:ring-0 focus-visible:outline-none focus:ring-0 text-foreground text-sm placeholder:text-muted-foreground/50 font-medium flex-1"
          />
          {query && (
            <button
              onClick={handleClear}
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'bg-card border border-border p-3 rounded-4xl shadow-sm flex flex-col md:flex-row gap-4 items-center transition-all duration-300 focus-within:ring-8 focus-within:ring-primary/5 focus-within:border-primary/30',
        className,
      )}
    >
      <div className="relative flex-1 w-full flex items-center">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-12 bg-transparent border-0 shadow-none h-12 focus-visible:ring-0 focus-visible:outline-none focus:ring-0 text-foreground placeholder:text-muted-foreground/50 font-medium flex-1"
        />
        {query && (
          <button
            onClick={handleClear}
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      {(showButton || suffix) && (
        <div className="flex items-center gap-2 w-full md:w-auto md:ml-2">
          {suffix}
          {showButton && (
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-2xl h-11 px-6 shadow-sm active:scale-95 transition-all w-full md:w-auto">
              {buttonText}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

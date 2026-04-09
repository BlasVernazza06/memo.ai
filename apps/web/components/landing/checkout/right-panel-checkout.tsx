'use client';

import { CreditCard, Loader2, Lock, ShieldCheck, Mail, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@repo/ui/components/ui/button';
import type { AuthUser } from '@/lib/auth-provider';

interface RightPanelCheckoutProps {
  user: AuthUser | null;
  planName: string;
  formattedPrice: string;
  checkoutLoading: boolean;
  error: string | null;
  handleCheckout: () => void;
}

export default function RightPanelCheckout({
  user,
  planName,
  formattedPrice,
  checkoutLoading,
  error,
  handleCheckout,
}: RightPanelCheckoutProps) {
  return (
    <div className="p-6 md:p-8 lg:p-10 flex flex-col bg-background/50 relative overflow-hidden">
      {/* Decorative gradient blur */}
      <div className="absolute top-[-20%] right-[-20%] w-64 h-64 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Payment header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <CreditCard className="w-4 h-4" />
          </div>
          <h3 className="text-lg font-bold tracking-tight">
            Checkout Seguro
          </h3>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full border border-emerald-500/20">
          <ShieldCheck className="w-3 h-3" />
          <span className="text-[9px] font-black uppercase tracking-wider">Stripe Verified</span>
        </div>
      </div>

      {/* User profile summary */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative group rounded-xl bg-card border border-border/60 p-4 mb-6 transition-all hover:border-primary/30"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-linear-to-tr from-primary/20 to-blue-600/20 flex items-center justify-center text-primary font-bold text-base border border-primary/20 shadow-inner">
            {user?.name?.[0]?.toUpperCase() || '?'}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold truncate">{user?.name || 'Invitado'}</span>
              <span className="px-1 py-0.5 rounded bg-muted text-[9px] font-bold text-muted-foreground uppercase">Tú</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-muted-foreground truncate">
              <Mail className="w-2.5 h-2.5" />
              {user?.email || 'No identificado'}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Order Summary Card */}
      <div className="flex-1 flex flex-col">
        <div className="rounded-2xl bg-muted/30 border border-border/40 p-5 lg:p-6 mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-3 opacity-5 pointer-events-none">
            <Lock className="w-16 h-16 rotate-12" />
          </div>
          
          <p className="text-[10px] font-black text-muted-foreground/60 uppercase tracking-[0.2em] mb-4">
            Resumen de compra
          </p>

          <div className="space-y-3 relative z-10">
            <div className="flex items-center justify-between text-sm">
              <div className="flex flex-col">
                <span className="font-bold text-foreground">{planName}</span>
                <span className="text-[10px] text-muted-foreground">Suscripción Mensual</span>
              </div>
              <span className="font-black text-foreground">${formattedPrice}</span>
            </div>
            
            <div className="flex items-center justify-between text-[11px] text-muted-foreground/60">
              <span>Impuestos estimados</span>
              <div className="flex items-center gap-1 underline decoration-dotted">
                Incluidos
                <Info className="w-2.5 h-2.5" />
              </div>
            </div>

            <div className="h-px bg-border/40 my-1.5" />
            
            <div className="flex items-center justify-between pt-1">
              <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">Total hoy</span>
              <div className="flex flex-col items-end">
                <span className="text-2xl lg:text-3xl font-black tracking-tight text-primary">
                  ${formattedPrice}
                </span>
                <span className="text-[9px] font-bold text-muted-foreground/40 uppercase tracking-tighter">USD Facturado ahora</span>
              </div>
            </div>
          </div>
        </div>

        {/* Error message if any */}
        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-destructive/10 border border-destructive/20 text-destructive text-xs p-3 rounded-xl mb-4 font-medium"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Checkout action */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-primary/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
          <Button
            onClick={handleCheckout}
            disabled={checkoutLoading || !user}
            size="lg"
            className="w-full h-14 rounded-xl text-sm font-black shadow-2xl transition-all hover:scale-[1.01] active:scale-[0.98] bg-primary hover:bg-primary/90 text-white shadow-primary/30 relative overflow-hidden"
          >
            {checkoutLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Validando...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Pagar y continuar
              </span>
            )}
          </Button>
        </div>

        {!user && (
          <p className="text-center text-[10px] font-bold text-destructive mt-3 uppercase tracking-widest bg-destructive/5 py-1.5 rounded-lg">
            Debes iniciar sesión para continuar
          </p>
        )}

        {/* Security badges */}
        <div className="mt-8 grid grid-cols-2 gap-3">
          <div className="flex flex-col items-center p-2.5 rounded-xl border border-border/40 bg-card/40 backdrop-blur-sm grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all">
             <ShieldCheck className="w-4 h-4 text-emerald-500 mb-1" />
             <span className="text-[8px] font-black uppercase tracking-widest">Seguro</span>
          </div>
          <div className="flex flex-col items-center p-2.5 rounded-xl border border-border/40 bg-card/40 backdrop-blur-sm grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all">
             <Lock className="w-4 h-4 text-primary mb-1" />
             <span className="text-[8px] font-black uppercase tracking-widest">SSL encryption</span>
          </div>
        </div>
        
        <p className="text-[9px] text-muted-foreground/40 text-center mt-5 font-medium max-w-[200px] mx-auto tracking-tight">
          Protegido por políticas de privacidad de memo.ai y cifrado Stripe de grado bancario.
        </p>
      </div>
    </div>
  );
}

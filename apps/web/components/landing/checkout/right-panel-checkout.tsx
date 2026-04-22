'use client';

import { CreditCard, Loader2, Lock, ShieldCheck, Mail, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@repo/ui/components/ui/button';
import type { AuthUser } from '@/lib/auth-provider';

interface RightPanelCheckoutProps {
  user: AuthUser | null;
  planName: string;
  formattedPrice: string;
  billingCycle: string;
  checkoutLoading: boolean;
  error: string | null;
  handleCheckout: () => void;
}

export default function RightPanelCheckout({
  user,
  planName,
  formattedPrice,
  billingCycle,
  checkoutLoading,
  error,
  handleCheckout,
}: RightPanelCheckoutProps) {
  return (
    <div className="p-6 md:p-8 flex flex-col bg-background/50 relative overflow-hidden">
      {/* Decorative gradient blur */}
      <div className="absolute top-[-20%] right-[-20%] w-64 h-64 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Payment header - Compact */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
            <CreditCard className="w-3.5 h-3.5" />
          </div>
          <h3 className="text-base font-bold tracking-tight">
            Pago Seguro
          </h3>
        </div>
        <div className="flex items-center gap-1 px-2 py-0.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full border border-emerald-500/10">
          <ShieldCheck className="w-2.5 h-2.5" />
          <span className="text-[8px] font-black uppercase tracking-wider">Stripe</span>
        </div>
      </div>

      {/* User profile summary - Compact */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative group rounded-xl bg-card border border-border/60 p-3 mb-4 transition-all"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-linear-to-tr from-primary/20 to-blue-600/20 flex items-center justify-center text-primary font-bold text-xs border border-primary/10 shadow-inner">
            {user?.name?.[0]?.toUpperCase() || '?'}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold truncate">{user?.name || 'Invitado'}</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground truncate leading-none">
              <Mail className="w-2 h-2" />
              {user?.email || 'No identificado'}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Order Summary Card - Compact */}
      <div className="flex-1 flex flex-col">
        <div className="rounded-2xl bg-muted/30 border border-border/40 p-4 mb-4 relative overflow-hidden">
          <p className="text-[9px] font-black text-muted-foreground/60 uppercase tracking-[0.2em] mb-3">
            Resumen
          </p>

          <div className="space-y-2 relative z-10">
            <div className="flex items-center justify-between text-xs">
              <div className="flex flex-col">
                <span className="font-bold text-foreground">{planName}</span>
                <span className="text-[9px] text-muted-foreground">
                  Suscripción {billingCycle === 'yearly' ? 'Anual' : 'Mensual'}
                </span>
              </div>
              <span className="font-black text-foreground">${formattedPrice}</span>
            </div>
            
            <div className="flex items-center justify-between text-[10px] text-muted-foreground/50">
              <span>Impuestos</span>
              <span className="font-medium">Incluidos</span>
            </div>

            <div className="h-px bg-border/40 my-1" />
            
            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Total</span>
              <div className="flex flex-col items-end">
                <span className="text-xl font-black tracking-tighter text-primary leading-none">
                  ${formattedPrice}
                </span>
                <span className="text-[8px] font-bold text-muted-foreground/40 uppercase tracking-tighter">
                  USD {billingCycle === 'yearly' ? '/ año' : '/ mes'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Error message */}
        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-destructive/10 border border-destructive/20 text-destructive text-[10px] p-2 rounded-lg mb-3 font-medium text-center"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Checkout action */}
        <div className="relative group">
          <Button
            onClick={handleCheckout}
            disabled={checkoutLoading || !user}
            size="lg"
            className="w-full h-12 rounded-xl text-xs font-black shadow-lg transition-all active:scale-[0.98] bg-primary hover:bg-primary/90 text-white shadow-primary/20"
          >
            {checkoutLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Procesando...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Lock className="w-3.5 h-3.5" />
                Confirmar Pago
              </span>
            )}
          </Button>
        </div>

        {!user && (
          <p className="text-center text-[8px] font-black text-destructive mt-2 uppercase tracking-widest py-1">
            Inicia sesión para continuar
          </p>
        )}

        {/* Security badges - Smaller */}
        <div className="mt-4 flex items-center justify-center gap-4 opacity-40 grayscale group-hover:grayscale-0 transition-all">
          <div className="flex items-center gap-1">
             <ShieldCheck className="w-3 h-3 text-emerald-500" />
             <span className="text-[8px] font-black uppercase tracking-widest">Seguro</span>
          </div>
          <div className="flex items-center gap-1">
             <Lock className="w-3 h-3 text-primary" />
             <span className="text-[8px] font-black uppercase tracking-widest">SSL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

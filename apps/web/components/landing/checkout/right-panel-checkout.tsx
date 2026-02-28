import { CreditCard, Loader2, Lock, ShieldCheck } from 'lucide-react';

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
    <div className="p-8 md:p-10 flex flex-col bg-background">
      {/* Payment header */}
      <div className="flex items-center gap-2 mb-6">
        <CreditCard className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-bold tracking-tight">
          Información de pago
        </h3>
      </div>

      {/* User info */}
      {user && (
        <div className="rounded-xl bg-muted/50 border border-border/50 p-4 mb-6">
          <p className="text-xs text-muted-foreground mb-1">Cuenta</p>
          <p className="text-sm font-medium">{user.name}</p>
          <p className="text-xs text-muted-foreground">{user.email}</p>
        </div>
      )}

      {/* Stripe Embedded Checkout placeholder */}
      <div className="flex-1 flex flex-col">
        {/* Order summary */}
        <div className="rounded-xl border border-border/50 p-5 mb-6 space-y-3">
          <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
            Resumen del pedido
          </p>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{planName} (mensual)</span>
            <span className="font-medium">${formattedPrice}</span>
          </div>
          <div className="border-t border-border/50" />
          <div className="flex items-center justify-between">
            <span className="font-semibold">Total</span>
            <span className="text-xl font-extrabold tracking-tight">
              ${formattedPrice}
              <span className="text-xs font-normal text-muted-foreground ml-1">
                /mes
              </span>
            </span>
          </div>
        </div>

        {/* Checkout button */}
        <Button
          onClick={handleCheckout}
          disabled={checkoutLoading || !user}
          className="w-full py-6 rounded-xl text-md font-bold shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] bg-primary hover:bg-primary/90 text-white shadow-primary/20"
        >
          {checkoutLoading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Redirigiendo a Stripe...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              Pagar ${formattedPrice} USD / mes
            </span>
          )}
        </Button>

        {!user && (
          <p className="text-center text-xs text-destructive mt-3">
            Debes iniciar sesión para continuar
          </p>
        )}

        {/* Trust badges */}
        <div className="mt-6 flex flex-col items-center gap-3">
          <div className="flex items-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-1.5 text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Pago seguro</span>
            </div>
            <div className="w-px h-3 bg-border" />
            <div className="flex items-center gap-1.5 text-[11px]">
              <Lock className="w-3.5 h-3.5" />
              <span>SSL 256-bit</span>
            </div>
          </div>
          <p className="text-[10px] text-muted-foreground/60 text-center max-w-xs">
            Procesado de forma segura por Stripe. memo.ai no almacena datos de
            tu tarjeta.
          </p>
        </div>
      </div>
    </div>
  );
}

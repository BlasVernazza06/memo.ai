import { motion } from 'motion/react';

export type BillingCycle = 'monthly' | 'yearly';

interface PricingBillingToggleProps {
  billingCycle: BillingCycle;
  onBillingCycleChange: (billingCycle: BillingCycle) => void;
  showDiscount?: boolean;
}

export default function PricingBillingToggle({
  billingCycle,
  onBillingCycleChange,
  showDiscount = true,
}: PricingBillingToggleProps) {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="bg-muted p-1 rounded-xl inline-flex items-center border border-border relative shadow-sm">
        <motion.div
          initial={false}
          animate={{ x: billingCycle === 'monthly' ? 0 : '100%' }}
          transition={{ type: 'spring', stiffness: 400, damping: 35 }}
          className="absolute inset-y-1 left-1 w-[calc(50%-4px)] bg-background rounded-lg shadow-sm z-0"
        />
        <button
          onClick={() => onBillingCycleChange('monthly')}
          className={`relative px-10 py-2.5 text-xs font-bold z-10 transition-colors duration-300 ${billingCycle === 'monthly' ? 'text-foreground' : 'text-muted-foreground'}`}
        >
          Mensual
        </button>
        <button
          onClick={() => onBillingCycleChange('yearly')}
          className={`relative px-10 py-2.5 text-xs font-bold z-10 transition-colors duration-300 ${billingCycle === 'yearly' ? 'text-foreground' : 'text-muted-foreground'}`}
        >
          Anual
        </button>
      </div>

      {billingCycle === 'yearly' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-2"
        >
          <div className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20">
            Ahorra un 20%
          </div>
        </motion.div>
      )}
    </div>
  );
}

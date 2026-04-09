import Link from 'next/link';

import { ArrowLeft, Lock } from 'lucide-react';

import { Button } from '@repo/ui/components/ui/button';

export default function HeaderCheckout() {
  return (
    <div className="relative z-10 border-b border-border/50">
      <div className="memo-container flex items-center justify-between py-3">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="gap-2 text-[11px] h-8 text-muted-foreground hover:text-foreground"
        >
          <Link href="/#pricing">
            <ArrowLeft className="w-3.5 h-3.5" />
            Volver
          </Link>
        </Button>
        <div className="flex items-center gap-2 text-muted-foreground text-[10px]">
          <Lock className="w-3 h-3" />
          <span>Conexión segura SSL</span>
        </div>
      </div>
    </div>
  );
}

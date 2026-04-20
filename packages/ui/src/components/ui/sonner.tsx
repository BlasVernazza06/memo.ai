'use client';

import {
  CircleCheck,
  Info,
  Loader2,
  TriangleAlert,
  XCircle,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      duration={3000}
      // Desactivamos la expansión (quita chevrons de apilado)
      expand={false}
      // Activamos el botón de cerrar X
      closeButton
      icons={{
        success: (
          <CircleCheck className="h-5 w-5 text-emerald-500 fill-emerald-500/10" />
        ),
        info: <Info className="h-5 w-5 text-blue-500" />,
        warning: <TriangleAlert className="h-5 w-5 text-amber-500" />,
        error: <XCircle className="h-5 w-5 text-rose-500" />,
        loading: <Loader2 className="h-5 w-5 animate-spin text-primary" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border/50 group-[.toaster]:shadow-2xl group-[.toaster]:rounded-[2rem] group-[.toaster]:px-6 group-[.toaster]:py-5 group-[.toaster]:gap-4',
          title:
            'group-[.toast]:font-bold group-[.toast]:text-[15px] group-[.toast]:tracking-tight',
          description:
            'group-[.toast]:text-muted-foreground group-[.toast]:text-[13px]',
          actionButton:
            'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground group-[.toast]:rounded-2xl font-bold',
          cancelButton:
            'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground group-[.toast]:rounded-2xl',
          // Estilo para el botón de cerrar X que pediste
          closeButton:
            'group-[.toast]:bg-transparent group-[.toast]:border-none group-[.toast]:hover:bg-muted group-[.toast]:transition-colors group-[.toast]:top-1/2 group-[.toast]:-translate-y-1/2 group-[.toast]:right-4',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };

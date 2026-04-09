import Image from 'next/image';
import Link from 'next/link';

import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-20 bg-background border-t border-border/40">
      <div className="memo-container px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          <div className="col-span-2 md:col-span-1 space-y-6">
            <Link href="/" className="flex items-center gap-2 group transition-opacity hover:opacity-80">
              <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-border/50">
                <Image
                  src="/logo.webp"
                  alt="Memo.ai Logo"
                  width={32}
                  height={32}
                  className="object-cover"
                />
              </div>
              <span className="text-lg font-bold tracking-tight text-foreground">
                Memo<span className="text-primary">.ai</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground/80 leading-relaxed font-medium max-w-[200px]">
              La nueva era del estudio potenciado por IA.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-foreground text-[10px] uppercase tracking-widest mb-6">
              Producto
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="#features" className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium">
                  Funciones
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium">
                  Precios
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium">
                  Roadmap
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground text-[10px] uppercase tracking-widest mb-6">
              Empresa
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium">
                  Privacidad
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium">
                  Términos
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium">
                  Soporte
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1">
             <h4 className="font-bold text-foreground text-[10px] uppercase tracking-widest mb-6">
              Mantente al día
            </h4>
            <p className="text-xs text-muted-foreground font-medium mb-4">
              Suscríbete para recibir noticias y actualizaciones.
            </p>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Email" 
                className="bg-muted border border-border/60 rounded-xl px-4 py-2 text-xs w-full focus:outline-none focus:border-primary/50 transition-colors"
              />
              <button className="bg-foreground text-background text-xs font-bold px-4 py-2 rounded-xl hover:opacity-90 transition-opacity">
                →
              </button>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold text-muted-foreground/40 uppercase tracking-[0.2em]">
          <p>
            © {new Date().getFullYear()} Memo.ai · Hecho en Argentina
          </p>
          <div className="flex items-center gap-2">
            <span>Hecho con</span>
            <Heart className="size-3 text-primary/40 fill-primary/40" />
            <span>para el futuro</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

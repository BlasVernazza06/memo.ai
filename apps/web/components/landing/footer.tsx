import Image from 'next/image';
import Link from 'next/link';

import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-12 bg-background border-t border-border/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <Image
                src="/logo.webp"
                alt="Memo.ai Logo"
                width={36}
                height={36}
                className="group-hover:scale-110 transition-transform duration-300"
              />
              <span className="text-xl font-bold tracking-tight">Memo.ai</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Transforma tus apuntes en conocimiento con inteligencia
              artificial avanzada.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-primary mb-4 uppercase text-xs tracking-wider">
              Producto
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="#features"
                  className="hover:text-foreground transition-colors"
                >
                  Características
                </Link>
              </li>
              <li>
                <Link
                  href="#pricing"
                  className="hover:text-foreground transition-colors"
                >
                  Precios
                </Link>
              </li>
              <li>
                <Link
                  href="#testimonials"
                  className="hover:text-foreground transition-colors"
                >
                  Testimonios
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-primary mb-4 uppercase text-xs tracking-wider">
              Recursos
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Guías
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Soporte
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-primary mb-4 uppercase text-xs tracking-wider">
              Legal
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Privacidad
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Términos
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground/60">
          <p>© {new Date().getFullYear()} Memo.ai. Todos los derechos reservados.</p>
          <div className="flex items-center gap-1.5 hover:text-foreground transition-colors duration-300 cursor-default">
            <span>Hecho con</span>
            <Heart className="size-3 text-red-500 fill-red-500 animate-pulse" />
            <span>para estudiantes</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

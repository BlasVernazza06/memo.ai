import { GraduationCap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="py-12 bg-card border-t border-border/50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center">
                <Image src="/logo.webp" alt="Logo" width={60} height={60} />
              </div>
              <span className="text-xl font-bold">Memo.ai</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Transforma tus apuntes en conocimiento con inteligencia artificial.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Producto</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Características</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Precios</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Casos de uso</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Recursos</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Guías</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Soporte</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Privacidad</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Términos</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Cookies</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} StudyFlow. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
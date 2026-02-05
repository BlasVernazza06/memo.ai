import { Button } from "@repo/ui/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-8 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col items-center gap-6 text-center max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight">
          Memo AI + Shadcn/ui
        </h1>
        <p className="text-muted-foreground text-lg">
          Tu monorepo está configurado con Tailwind v4 y componentes compartidos.
        </p>
        
        <div className="flex gap-4 items-center">
          <Button variant="default" size="lg">
            Empezar ahora
          </Button>
          <Button variant="outline" size="lg">
            Documentación
          </Button>
        </div>
      </main>

      <footer className="mt-12 flex gap-6 text-sm text-muted-foreground">
        <p>© 2026 Memo AI Monorepo</p>
      </footer>
    </div>
  );
}

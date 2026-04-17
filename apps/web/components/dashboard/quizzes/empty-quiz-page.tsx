import Link from 'next/link';

import { GraduationCap } from 'lucide-react';

import { Button } from '@repo/ui/components/ui/button';

export default function EmptyQuizPage() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center bg-card/20 border border-dashed border-border rounded-[2.5rem]">
      <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-6">
        <GraduationCap className="w-10 h-10 text-muted-foreground" />
      </div>
      <h2 className="text-2xl font-bold mb-2">No hay quizzes aún</h2>
      <p className="text-muted-foreground max-w-sm mb-8">
        La IA generará cuestionarios basados en tus documentos una vez que los
        subas a un workspace.
      </p>
      <Link href="/dashboard">
        <Button className="rounded-full px-8">Explorar Workspaces</Button>
      </Link>
    </div>
  );
}

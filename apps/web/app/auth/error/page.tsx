import Link from 'next/link';
import { ShieldAlert } from 'lucide-react';

interface ErrorPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function AuthErrorPage({ searchParams }: ErrorPageProps) {
  const resolvedParams = await searchParams;
  const error = typeof resolvedParams.error === 'string' ? resolvedParams.error : 'unknown';

  let errorMessage = 'Ha ocurrido un error inesperado al intentar iniciar sesión.';
  let errorTitle = 'Error de Autenticación';

  if (error === 'state_mismatch') {
    errorTitle = 'Sesión de Login Expirada';
    errorMessage = 'La solicitud de inicio de sesión expiró o no se pudo verificar de forma segura. Por seguridad, por favor vuelve a intentarlo.';
  } else if (error === 'user_cancelled') {
    errorTitle = 'Inicio Cancelado';
    errorMessage = 'Has cancelado el proceso de inicio de sesión con tu proveedor.';
  } else if (error === 'configuration_error') {
    errorTitle = 'Error de Servidor';
    errorMessage = 'Los proveedores de autenticación tienen un problema de configuración en el servidor. Por favor, contacta al administrador.';
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-black p-4 text-white">
      <div className="w-full max-w-md rounded-2xl border border-slate-800/80 bg-slate-900/40 p-8 text-center backdrop-blur-xl shadow-2xl">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 text-red-500 border border-red-500/20">
          <ShieldAlert className="h-8 w-8 animate-pulse" />
        </div>
        <h1 className="mb-3 text-2xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
          {errorTitle}
        </h1>
        <p className="mb-8 text-sm text-slate-400 leading-relaxed px-2">
          {errorMessage}
        </p>
        <div className="flex flex-col gap-3">
          <Link
            href="/auth/login"
            className="flex items-center justify-center rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition-all hover:bg-blue-500 active:scale-95 shadow-lg shadow-blue-950/20"
          >
            Volver a intentar
          </Link>
          <Link
            href="/"
            className="flex items-center justify-center rounded-xl border border-slate-850 bg-slate-950/20 px-4 py-3 font-medium text-slate-300 transition-all hover:bg-slate-800"
          >
            Ir al Inicio
          </Link>
        </div>
      </div>
    </div>
  );
}

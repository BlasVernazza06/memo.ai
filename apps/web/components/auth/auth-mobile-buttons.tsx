import Link from 'next/link';

interface AuthMobileButtonsProps {
  onClose: () => void;
}

export default function AuthMobileButtons({ onClose }: AuthMobileButtonsProps) {
  return (
    <>
      <Link
        href="/auth?authForm=login"
        onClick={onClose}
        className="block text-center bg-accent hover:bg-accent-foreground/10 px-4 py-3 rounded-lg hover:bg-accent text-sm font-medium transition-colors"
      >
        Iniciar Sesión
      </Link>
      <Link
        href="/auth?authForm=register"
        onClick={onClose}
        className="block bg-primary text-center rounded-lg px-4 py-3 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
      >
        Registrarse
      </Link>
    </>
  );
}

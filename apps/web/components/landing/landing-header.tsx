'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useEffect, useState } from 'react';

import { ChevronRight, Loader2 } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

import AuthDesktopButtons from '@/components/auth/auth-desktop-buttons';
import AuthMobileButtons from '@/components/auth/auth-mobile-buttons';
import UserModalLanding from '@/components/landing/user-modal-landing';
import { useAuth } from '@/lib/auth-provider';

const navLinks = [
  {
    name: 'Características',
    href: '/#features',
  },
  {
    name: 'Precios',
    href: '/pricing',
  },
  {
    name: 'Testimonios',
    href: '/#testimonials',
  },
];

export default function Header() {
  const { user, isLoading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userModal, setUserModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);

    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href.startsWith('/#')) {
      e.preventDefault();
      const id = href.replace('/#', '');
      const element = document.getElementById(id);
      if (element) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });

        setIsOpen(false);
      }
    }
  };

  return (
    <div
      className={`
        mx-auto max-w-7xl h-14 pointer-events-auto
        transition-all duration-300 ease-in-out px-4
        ${
          scrolled || isOpen
            ? 'bg-background/80 backdrop-blur-md border border-border/40 rounded-2xl shadow-sm'
            : 'bg-transparent border-transparent'
        }
      `}
    >
      <div className="flex items-center justify-between h-full">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group transition-opacity hover:opacity-80"
        >
          <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-border/50 shadow-xs">
            <Image
              src="/logo.webp"
              alt="Memo.ai Logo"
              width={32}
              height={32}
              className="object-cover"
            />
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground">
            memo<span className="text-primary">.ai</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={(e) => handleScroll(e, link.href)}
              className="px-4 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {isLoading ? (
            <Loader2 className="size-4 animate-spin text-muted-foreground" />
          ) : user ? (
            <div className="flex items-center gap-3">
              <Link href="/dashboard" className="hidden sm:block">
                <button className="bg-primary text-xs text-primary-foreground px-4 py-1.5 rounded-lg font-bold hover:bg-primary/90 transition-all">
                  Dashboard
                </button>
              </Link>
              <div
                className="relative cursor-pointer"
                onClick={() => setUserModal(!userModal)}
              >
                <div
                  className={`size-8 rounded-full border border-border overflow-hidden transition-all ${userModal ? 'ring-2 ring-primary/20' : ''}`}
                >
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name}
                      width={32}
                      height={32}
                    />
                  ) : (
                    <div className="size-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <AnimatePresence>
                  {userModal && (
                    <UserModalLanding
                      user={user}
                      onClose={() => setUserModal(false)}
                    />
                  )}
                </AnimatePresence>
              </div>
            </div>
          ) : (
            <div className="hidden lg:block">
              <AuthDesktopButtons />
            </div>
          )}

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors active:scale-95"
          >
            <div className="w-5 h-4 flex flex-col justify-between items-end">
              <span
                className={`h-0.5 bg-foreground rounded-full transition-all duration-300 ${isOpen ? 'w-full rotate-45 translate-y-1.5' : 'w-full'}`}
              />
              <span
                className={`h-0.5 bg-primary rounded-full transition-all duration-300 ${isOpen ? 'opacity-0' : 'w-2/3'}`}
              />
              <span
                className={`h-0.5 bg-foreground rounded-full transition-all duration-300 ${isOpen ? 'w-full -rotate-45 -translate-y-2' : 'w-full'}`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden absolute top-[64px] left-4 right-4 p-4 bg-background border border-border/60 rounded-2xl shadow-xl z-50"
          >
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href)}
                  className="flex items-center justify-between p-3 px-4 rounded-xl hover:bg-muted font-medium text-sm text-foreground/80 hover:text-primary transition-all"
                >
                  {link.name}
                  <ChevronRight className="size-4 opacity-30" />
                </Link>
              ))}
              <div className="h-px bg-border/40 my-2" />
              <div className="pt-1">
                {user ? (
                  <Link
                    href="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center bg-primary text-primary-foreground py-3 rounded-xl text-sm font-bold"
                  >
                    Ir al Dashboard
                  </Link>
                ) : (
                  <AuthMobileButtons onClose={() => setIsOpen(false)} />
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

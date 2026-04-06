'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useEffect, useState } from 'react';

import { ChevronRight, Loader2, Menu, X } from 'lucide-react';
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
    href: '/#pricing',
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
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    // Lock scroll when mobile menu is open
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
        const elementPosition =
          element.getBoundingClientRect().top + window.pageYOffset;
        const elementHeight = element.offsetHeight;
        const viewportHeight = window.innerHeight;

        const offsetPosition =
          elementPosition - viewportHeight / 2 + elementHeight / 2;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });

        setIsOpen(false);
      }
    }
  };

  // Render the desktop action buttons based on auth state
  const renderDesktopActions = () => {
    if (isLoading) {
      return (
        <div className="hidden lg:flex items-center gap-4">
          <Loader2 className="size-5 animate-spin text-muted-foreground" />
        </div>
      );
    }

    if (user) {
      return (
        <div className="hidden lg:flex items-center gap-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-sm text-primary-foreground px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-3"
            >
              Dashboard
            </motion.button>
          </Link>
          <div
            className="relative cursor-pointer group/avatar"
            onClick={() => setUserModal(!userModal)}
          >
            <div
              className={`p-0.5 rounded-full border-2 transition-all ${userModal ? 'border-primary ring-4 ring-primary/10' : 'border-transparent group-hover/avatar:border-primary/30'}`}
            >
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name}
                  width={38}
                  height={38}
                  className="rounded-full object-cover"
                />
              ) : (
                <div className="size-9 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
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
      );
    }

    return (
      <div className="hidden lg:flex items-center gap-4">
        <AuthDesktopButtons />
      </div>
    );
  };

  // Render the mobile menu actions based on auth state
  const renderMobileActions = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-4">
          <Loader2 className="size-5 animate-spin text-muted-foreground" />
        </div>
      );
    }

    if (user) {
      return (
        <div className="space-y-2">
          <Link
            href="/dashboard"
            onClick={() => setIsOpen(false)}
            className="block bg-primary text-center rounded-lg px-4 py-3 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
          >
            Ir al Dashboard
          </Link>
        </div>
      );
    }

    return <AuthMobileButtons onClose={() => setIsOpen(false)} />;
  };

  return (
    <div
      className={`
                mx-auto max-w-7xl h-16 pointer-events-auto
                transition-all duration-300 ease-in-out
                ${
                  scrolled || isOpen
                    ? 'bg-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.03)] border border-white/20 rounded-2xl px-6 h-14'
                    : 'bg-transparent border-transparent rounded-none px-4'
                }
            `}
    >
      <div className="flex items-center justify-between h-full">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group relative shrink-0"
        >
          <div className="relative">
            <motion.div
              className="absolute -inset-2 bg-primary/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity"
              whileHover={{ scale: 1.2 }}
            />
            <motion.div
              whileHover={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src="/logo.webp"
                alt="Memo.ai Logo"
                width={34}
                height={34}
                className="rounded-lg relative z-10 border border-white/10 shadow-sm"
              />
            </motion.div>
          </div>
          <span className="text-xl font-black tracking-tight text-foreground/90 group-hover:text-foreground transition-colors">
            memo<span className="text-primary italic">.ai</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={(e) => handleScroll(e, link.href)}
              className="relative px-5 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-all group"
            >
              <span>{link.name}</span>
              <motion.div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary rounded-full group-hover:w-4 transition-all" />
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        {renderDesktopActions()}

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden relative z-50 p-3 rounded-2xl bg-primary/5 hover:bg-primary/10 transition-all duration-300 active:scale-90 overflow-hidden"
          aria-label="Toggle menu"
        >
          <div className="w-6 h-5 flex flex-col justify-between items-end relative overflow-hidden">
            <motion.span
              animate={
                isOpen
                  ? { rotate: 45, y: 8.5, width: '100%' }
                  : { rotate: 0, y: 0, width: '100%' }
              }
              className="h-0.5 bg-foreground rounded-full block origin-center transition-all duration-300"
            />
            <motion.span
              animate={isOpen ? { x: 50, opacity: 0 } : { x: 0, opacity: 1 }}
              className="h-0.5 w-[70%] bg-primary rounded-full block transition-all duration-300"
            />
            <motion.span
              animate={
                isOpen
                  ? { rotate: -45, y: -8.5, width: '100%' }
                  : { rotate: 0, y: 0, width: '100%' }
              }
              className="h-0.5 bg-foreground rounded-full block origin-center transition-all duration-300"
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="lg:hidden fixed inset-0 bg-white/40 backdrop-blur-md z-[-1] pointer-events-auto"
            />

            {/* Menu Container */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="lg:hidden absolute top-[70px] left-4 right-4 p-6 bg-white/70 dark:bg-slate-950/80 backdrop-blur-3xl border border-white/40 dark:border-white/10 rounded-[2.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] z-40 overflow-hidden"
            >
              <div className="absolute inset-0 bg-linear-to-b from-primary/5 to-transparent pointer-events-none" />
              <nav className="flex flex-col gap-2 relative z-10">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, type: 'spring' }}
                  >
                    <Link
                      href={link.href}
                      onClick={(e) => handleScroll(e, link.href)}
                      className="flex items-center justify-between p-4 px-6 rounded-2xl hover:bg-primary/5 group transition-all"
                    >
                      <span className="text-lg font-black text-foreground/80 group-hover:text-primary italic tracking-tight transition-colors">
                        {link.name}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-primary/0 group-hover:bg-primary/10 flex items-center justify-center transition-all">
                        <ChevronRight className="size-4 text-primary opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                      </div>
                    </Link>
                  </motion.div>
                ))}

                <div className="h-px bg-black/5 my-2 mx-2" />

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.05 }}
                  className="pt-1"
                >
                  {renderMobileActions()}
                </motion.div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

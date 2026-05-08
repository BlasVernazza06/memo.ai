'use client';

export function HeroBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{ 
          backgroundImage: `radial-gradient(circle at 1px 1px, #1A1C20 1px, transparent 0)`,
          backgroundSize: '48px 48px',
          maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)'
        }} 
      />
    </div>
  );
}

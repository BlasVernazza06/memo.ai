# Design Principles: Simple & Sophisticated (Memo AI)

This document outlines the core design aesthetic for the Memo AI project, focusing on a premium, clear, and concise user interface.

## 🎨 Aesthetic Core
- **Minimalist Sophistication**: Avoid excessive glows, heavy gradients, or "noisy" glassmorphism.
- **Clarity & Precision**: Every element must have a clear purpose. If it doesn't add value, remove it.
- **Premium Feel**: Achieved through whitespace, deliberate typography, and subtle micro-interactions.

## 🛠 Component Guidelines

### Cards & Containers
- **Borders**: Use subtle borders (`border-border/40` to `border-border/60`). Avoid high contrast.
- **Backgrounds**: Flat `bg-card` or very subtle `bg-muted/30`. Use `backdrop-blur` sparingly.
- **Corners**: Large but professional (`rounded-2xl` or `rounded-3xl`). Avoid extreme `rounded-4xl` unless necessary for hero elements.
- **Shadows**: Soft, low-alpha shadows.
  - Default: `shadow-sm`
  - Hover: `hover:shadow-xl hover:shadow-primary/5` (very subtle primary tint).

### Interactive Elements
- **Hover States**: Prefer a slight translate (e.g., `-translate-y-1`) and a subtle border color shift over large glows.
- **Scale**: Use minor scaling (`active:scale-[0.995]`) for tactile feedback.
- **Transitions**: Fast but smooth (`duration-200` to `duration-300`).

### Typography
- **Weights**: Use `font-bold` and `font-medium` for hierarchy. Reserve `font-black` for major headings.
- **Case**: Use uppercase with `tracking-wider` or `tracking-tighter` for labels and status badges (text size `[9px]` to `[10px]`).
- **Color**: Use `text-foreground` for titles and `text-muted-foreground/80` for descriptions.

### Icons & Badges
- **Icons**: Enclose icons in clean, themed containers (e.g., `w-10 h-10 rounded-xl bg-primary/10`).
- **Status Badges**: Small, pill-shaped, with a solid indicator dot (e.g., `bg-emerald-500`).

## 🚫 Avoid
- **Excessive Glow**: No large `drop-shadow` with primary colors unless it's a very specific "active" state.
- **Nested Gradients**: Keep backgrounds simple to ensure readability.
- **Placeholder Stats**: Always aim to display real, meaningful numbers.
- **Visual Noise**: Avoid decorative dots or patterns that distract from the main content.

---
*Refer to `apps/web/components/dashboard/workspace-card.tsx` for the gold standard implementation of this style.*

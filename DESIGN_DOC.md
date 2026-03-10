# AppInit Design Document

> A comprehensive design system for the AppInit CLI & Web Experience
> Built on the **Fibonacci Golden Ratio (φ = 1.618)** for visual harmony

---

## 1. Design Philosophy

### The Golden Ratio Foundation

Every visual decision is anchored to **φ (1.618034...)** — the mathematical sequence that governs natural beauty.

```
1 → 1 → 2 → 3 → 5 → 8 → 13 → 21 → 34 → 55 → 89 → 144...
```

| Principle | Application |
|-----------|-------------|
| **Spacing** | Margins/padding derived from Fibonacci: `4, 8, 13, 21, 34, 55px` |
| **Typography** | Font sizes scale φ: `13 → 21 → 34 → 55px` |
| **Layout** | Content areas follow 61.8% / 38.2% split |
| **Timing** | Animation durations: `100 → 160 → 260 → 420ms` |
| **Containers** | Border radius sequence: `8 → 13 → 21 → 34px` |

---

## 2. Color System

### Dark Mode (Primary)

```css
/* Background Layers */
--bg-void:     #000000;    /* True black base */
--bg-deep:     #0a0a0a;    /* Surface level 1 */
--bg-elevated: #0d0d0d;    /* Surface level 2 */

/* Blue Accent Spectrum */
--blue-900: #1e3a8a;
--blue-800: #1e40af;
--blue-600: #2563eb;       /* Primary accent */
--blue-400: #60a5fa;       /* Interactive states */

/* Neutrals */
--zinc-900: #18181b;
--zinc-800: #27272a;
--zinc-500: #71717a;
--zinc-400: #a1a1aa;
--zinc-200: #e4e4e7;
```

### Light Mode (Secondary)

```css
--bg-base:    #fafaf9;     /* Stone-50 */
--bg-surface: #ffffff;
--text-primary: #1c1917;   /* Stone-900 */
--text-muted:   #57534e;   /* Stone-600 */
--accent:       #4f46e5;   /* Indigo-600 */
```

### Semantic Colors

| Purpose | Dark Mode | Light Mode |
|---------|-----------|------------|
| Success | `#34d399` (emerald-400) | `#10b981` (emerald-500) |
| Warning | `#fbbf24` (amber-400) | `#f59e0b` (amber-500) |
| Error | `#f87171` (red-400) | `#ef4444` (red-500) |
| Info | `#60a5fa` (blue-400) | `#3b82f6` (blue-500) |

---

## 3. Typography Scale

Based on **φ-modular scale** (base: 13px, ratio: 1.618)

```
Caption:  10px   (tracking: 0.2em, weight: 700)
Body:     14px   (line-height: 1.6)
Large:    16px   (line-height: 1.5)
H4:       21px   (tracking: -0.01em)
H3:       26px   (tracking: -0.02em)
H2:       34px   (tracking: -0.02em, weight: 900)
H1:       55px   (tracking: -0.04em, weight: 900)
Hero:     70px   (tracking: -0.05em, weight: 900)
```

### Font Stack

```css
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', 'SF Mono', monospace;
```

---

## 4. Spacing System (Fibonacci-Based)

```
--space-1:  4px     /* φ⁰ × 4 ≈ 4 */
--space-2:  8px     /* φ¹ × 4 ≈ 6 → round to 8 */
--space-3:  13px    /* φ² × 4 ≈ 10 → Fibonacci */
--space-4:  21px    /* φ³ × 4 ≈ 17 → Fibonacci */
--space-5:  34px    /* Fibonacci */
--space-6:  55px    /* Fibonacci */
--space-7:  89px    /* Fibonacci */
--space-8:  144px   /* Fibonacci */
```

### Layout Application

```
┌─────────────────────────────────────────────────────────┐
│                     Section (py: 89px)                  │
│  ┌───────────────────────────────────────────────────┐  │
│  │               Container (max-w: 1400px)           │  │
│  │  ┌─────────────────────────────────────────────┐  │  │
│  │  │         Content Area (gap: 34px)            │  │  │
│  │  │  ┌─────────────────┐  ┌─────────────────┐   │  │  │
│  │  │  │  Card (p: 21px) │  │  Card (p: 21px) │   │  │  │
│  │  │  │  ┌───────────┐  │  │  ┌───────────┐  │   │  │  │
│  │  │  │  │ Icon 55px │  │  │  │ Icon 55px │  │   │  │  │
│  │  │  │  └───────────┘  │  │  └───────────┘  │   │  │  │
│  │  │  │  gap: 13px      │  │  gap: 13px      │   │  │  │
│  │  │  │  Text (21px)    │  │  Text (21px)    │   │  │  │
│  │  │  └─────────────────┘  └─────────────────┘   │  │  │
│  │  └─────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

---

## 5. Golden Ratio Layout Grid

### Primary Layout: 61.8% / 38.2%

```
┌──────────────────────────────┬──────────────────┐
│                              │                  │
│       Main Content           │    Side Panel    │
│         (61.8%)              │     (38.2%)      │
│                              │                  │
└──────────────────────────────┴──────────────────┘
```

### Three-Column Grid

```
┌────────────────┬────────────────────────┬────────────────┐
│    Aside       │       Main             │    Aside       │
│    (1fr)       │   (minmax(760px))      │    (1fr)       │
└────────────────┴────────────────────────┴────────────────┘

CSS: grid-template-columns: 1fr minmax(0, 760px) 1fr;
```

---

## 6. Micro-Interactions Specification

### 6.1 Button Interactions

```css
/* Hover State */
transform: translateY(-2px);
box-shadow: 0 14px 36px rgba(30, 58, 138, 0.45);
transition: all 300ms cubic-bezier(0.34, 1.56, 0.64, 1);

/* Active State */
transform: translateY(0);
transition: all 100ms ease-out;
```

### 6.2 Card Hover Effects

```tsx
// 1. Lift + Border Glow
<article className="
  transition-all duration-500 
  hover:-translate-y-1 
  hover:border-blue-800/60
">

// 2. Icon Morph Animation
<div className="transition-all duration-300 group-hover:opacity-0">
  <StaticIcon />
</div>
<div className="
  scale-75 opacity-0 
  transition-all duration-300 
  group-hover:scale-125 group-hover:opacity-100
">
  <AnimatedIcon />
</div>

// 3. Background Glow Reveal
<div className="
  absolute -right-10 -bottom-10 
  h-40 w-40 rounded-full 
  opacity-0 blur-[80px] 
  transition-opacity duration-700 
  group-hover:opacity-35 
  bg-blue-900
"/>
```

### 6.3 Copy Command Interaction

```
User clicks copy button
├── Button scale: 1 → 1.1 (100ms)
├── Icon: Copy → Check (with zoom-in + spin animation)
├── Button bg: zinc-800 → emerald-600/30 (300ms)
├── Ripple effect from click origin
└── Auto-reset after 2000ms
```

### 6.4 Shimmer/Shine Effect

```css
/* Horizontal shine sweep on hover */
.shine-effect {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to right,
    transparent,
    rgba(255, 255, 255, 0.05),
    transparent
  );
  transform: skewX(-12deg);
  transition: left 1000ms;
}

.group:hover .shine-effect {
  left: 100%;
}
```

### 6.5 Ping Indicator (Live Status)

```tsx
<span className="
  flex h-2 w-2 
  animate-ping 
  rounded-full 
  bg-blue-500
"/>
```

---

## 7. Animation Timing (φ-Based)

| Action | Duration | Easing |
|--------|----------|--------|
| Instant feedback | `100ms` | `ease-out` |
| Micro-interaction | `160ms` | `ease-in-out` |
| State change | `260ms` | `ease-out` |
| Expansion/Collapse | `420ms` | `cubic-bezier(0.34, 1.56, 0.64, 1)` |
| Page transition | `680ms` | `ease-in-out` |
| Background glow | `700ms` | `ease-out` |
| Shine sweep | `1000ms` | `linear` |

### Easing Curves

```css
--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
--ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
--ease-snap: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

---

## 8. Component Anatomy

### 8.1 Template Card Structure

```
┌─────────────────────────────────────────┐
│  ┌─────────────────────┐                │ ← rounded-3xl (24px)
│  │                     │                │
│  │    Icon Container   │ ← 80px × 80px  │
│  │    (animated)       │    rounded-3xl │
│  │                     │                │
│  └─────────────────────┘                │
│                                         │
│  Template Name                          │ ← text-xl font-bold
│                                         │   mb-2 (8px)
│  Description text that explains         │ ← text-sm text-zinc-400
│  what this template provides.           │   mb-4 (16px)
│                                         │
│  ┌─────┐ ┌─────┐ ┌─────┐                │
│  │ tag │ │ tag │ │ tag │                │ ← Tags row, gap-2
│  └─────┘ └─────┘ └─────┘                │
│                                         │
│              ○ (glow on hover)          │ ← blur-[80px]
└─────────────────────────────────────────┘
  padding: 24px (p-6)
  border: 1px zinc-800
```

### 8.2 Command Box Structure

```
┌─────────────────────────────────────────────────────────┐
│ ┌─────────────────────────────────────────────────┬───┐ │
│ │  ❯ npx @dhruvinjs/appinit my-test-app           │ ⎘ │ │
│ │                                                 │   │ │
│ └─────────────────────────────────────────────────┴───┘ │
│         ↑ shimmer sweep animation on hover              │
└─────────────────────────────────────────────────────────┘
  outer: p-3 sm:p-5, rounded-2xl sm:rounded-3xl
  glow: absolute -inset-2, blur-2xl, opacity-10 → 30 on hover
  border: border-white/5 → border-white/10 on hover
```

### 8.3 Stats Badge Structure

```
┌─────────────────────────┐
│  USED TO SCAFFOLD       │ ← text-[10px] tracking-[0.2em]
│                         │
│  3+ projects            │ ← text-2xl font-black
└─────────────────────────┘
  p-6, rounded-3xl, backdrop-blur-xl
  border: border-white/5
  bg: bg-zinc-900/40
```

---

## 9. Background Effects Layer

### Gradient Orbs

```tsx
<div className="pointer-events-none fixed inset-0 overflow-hidden">
  {/* Top-left warm glow */}
  <div className="
    absolute -top-[10%] -left-[10%] 
    h-[50%] w-[50%] 
    rounded-full blur-[140px]
    bg-blue-600/10
  "/>
  
  {/* Bottom-right cool glow */}
  <div className="
    absolute -right-[10%] -bottom-[10%] 
    h-[50%] w-[50%] 
    rounded-full blur-[140px]
    bg-blue-900/10
  "/>
  
  {/* Dot grid overlay */}
  <div className="
    absolute inset-0 
    bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] 
    bg-size-[24px_24px] 
    opacity-[0.03]
  "/>
</div>
```

### Hero Section Radial

```css
background: radial-gradient(
  900px 500px at 20% -10%,
  rgba(59, 130, 246, 0.14),
  transparent
),
radial-gradient(
  800px 400px at 90% 0%,
  rgba(14, 165, 233, 0.10),
  transparent
);
```

---

## 10. CLI Visual Design

### Terminal Output Styling

```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│   ██████╗ ██████╗ ██████╗ ██╗███╗   ██╗██╗████████╗     │
│  ██╔══██╗██╔══██╗██╔══██╗██║████╗  ██║██║╚══██╔══╝     │
│  ███████║██████╔╝██████╔╝██║██╔██╗ ██║██║   ██║        │
│  ██╔══██║██╔═══╝ ██╔═══╝ ██║██║╚██╗██║██║   ██║        │
│  ██║  ██║██║     ██║     ██║██║ ╚████║██║   ██║        │
│  ╚═╝  ╚═╝╚═╝     ╚═╝     ╚═╝╚═╝  ╚═══╝╚═╝   ╚═╝        │
│                                                          │
│  ✔ Project: my-backend-api                               │
│  ✔ Template: Express.js + WebSocket                      │
│  ✔ Language: TypeScript                                  │
│  ✔ Database: PostgreSQL (Prisma)                         │
│                                                          │
│  ⠋ Generating project structure...                       │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

### Chalk Color Mapping

| Element | Chalk Function | Hex Equivalent |
|---------|----------------|----------------|
| Success checkmark | `chalk.green('✔')` | `#22c55e` |
| Spinner | `chalk.cyan()` | `#06b6d4` |
| Error | `chalk.red.bold()` | `#ef4444` |
| Prompt highlight | `chalk.blue.bold()` | `#3b82f6` |
| Dim text | `chalk.gray()` | `#71717a` |
| File paths | `chalk.yellow()` | `#eab308` |

### Ora Spinner Animation

```javascript
const spinner = ora({
  text: 'Generating project structure...',
  spinner: 'dots',
  color: 'cyan',
}).start();
```

---

## 11. Responsive Breakpoints

Golden ratio-influenced breakpoints:

```css
--bp-sm:  640px;   /* Mobile landscape */
--bp-md:  768px;   /* Tablet */
--bp-lg:  1024px;  /* Desktop */
--bp-xl:  1280px;  /* Large desktop */
--bp-2xl: 1536px;  /* Ultra-wide */
```

### Mobile-First Scaling

```
Mobile (< 640px):
├── Single column layout
├── Hero text: 30px → 40px
├── Padding: 16px horizontal
└── Stack all cards vertically

Tablet (768px+):
├── Two-column grid for cards
├── Hero text: 50px
└── Padding: 24px horizontal

Desktop (1280px+):
├── Three-column grid
├── Side asides visible
├── Hero text: 70px
└── Full layout with 61.8% content ratio
```

---

## 12. Accessibility Requirements

### Focus States

```css
:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
  border-radius: 8px;
}
```

### Color Contrast

| Element | Foreground | Background | Ratio |
|---------|------------|------------|-------|
| Body text (dark) | `#a1a1aa` | `#0a0a0a` | 7.2:1 ✓ |
| Headings (dark) | `#ffffff` | `#0a0a0a` | 21:1 ✓ |
| Primary button | `#ffffff` | `#2563eb` | 4.7:1 ✓ |
| Muted text (dark) | `#71717a` | `#0a0a0a` | 4.5:1 ✓ |

### Motion Preferences

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 13. Implementation Checklist

### Core Components

- [ ] `BackgroundEffects` — Gradient orbs + dot grid
- [ ] `HeroSection` — Command box with copy interaction
- [ ] `TemplateCard` — Hover lift + icon morph + glow
- [ ] `FlagsSection` — Expandable flag groups
- [ ] `Navbar` — Scroll-aware with theme toggle

### Micro-Interactions

- [ ] Copy button state animation
- [ ] Card hover lift effect
- [ ] Icon morph on hover
- [ ] Shimmer sweep effect
- [ ] Background glow reveal
- [ ] Theme toggle transition
- [ ] Scroll-to-section smooth behavior

### CLI Enhancements

- [ ] ASCII art banner
- [ ] Colored output with Chalk
- [ ] Spinner animations with Ora
- [ ] Progress indicators
- [ ] Success/error states

---

## 14. Design Tokens Export

```json
{
  "spacing": {
    "1": "4px",
    "2": "8px", 
    "3": "13px",
    "4": "21px",
    "5": "34px",
    "6": "55px",
    "7": "89px",
    "8": "144px"
  },
  "radius": {
    "sm": "8px",
    "md": "13px",
    "lg": "21px",
    "xl": "24px",
    "2xl": "34px"
  },
  "duration": {
    "instant": "100ms",
    "micro": "160ms",
    "normal": "260ms",
    "expand": "420ms",
    "slow": "680ms",
    "glow": "700ms",
    "sweep": "1000ms"
  },
  "fontSizes": {
    "xs": "10px",
    "sm": "13px",
    "base": "14px",
    "lg": "16px",
    "xl": "21px",
    "2xl": "26px",
    "3xl": "34px",
    "4xl": "55px",
    "hero": "70px"
  }
}
```

---

## 15. File Structure Reference

```
apps/web/
├── components/
│   ├── home/
│   │   ├── hero-section.tsx      # Command box + CTAs
│   │   ├── template-card.tsx     # Animated cards
│   │   ├── background-effects.tsx
│   │   ├── animated-icon.tsx     # Hover icon morphs
│   │   ├── navbar.tsx
│   │   ├── flags-section.tsx
│   │   ├── stacks-section.tsx
│   │   ├── constants.ts          # Card/flag data
│   │   └── types.ts
│   ├── docs/
│   │   └── docs-content.tsx
│   └── ui/
│       ├── button.tsx
│       ├── card.tsx
│       └── tabs.tsx
└── app/
    ├── page.tsx                  # Landing page
    ├── docs/page.tsx             # Documentation
    └── globals.css               # Tailwind + custom
```

---

> **Design Principle**: Every element should feel intentional. The golden ratio provides mathematical harmony, while micro-interactions create delight. Together, they make AppInit feel polished, professional, and engaging.

---

*Document Version: 1.0*
*Last Updated: March 2026*

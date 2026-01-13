# Hero Section - Visual Implementation Guide

## Element Layout and Animations

### LEFT SIDE - Text Content

```
┌─────────────────────────────────┐
│  [Welcome Badge with pulsing dot] ← welcomePulse (2.4s)
│  Hi there, I'm
│  Mantripragada                   ← nameBlue (#0A74DA)
│  Abhinav                         ← nameWhite with blue underline
│  [Final-Year CSE Student • Full-Stack Developer] ← role tags
│
│  Building practical web applications...
│  Passionate about creating systems...
│
│  [View Projects ↓]  [Contact Me]  ← buttons with hover arrow animation
│
│
│
│
│ [GitHub]  ← social icons vertical layout
│ [LinkedIn]  ← with translateY(-4px) on hover
│
└─────────────────────────────────┘
```

### RIGHT SIDE - Profile Section

```
                ┌────────────────────┐
                │ <Developer />      │ ← code-snippet top-left
                │ (floatCode 3.5s)   │
                │                    │
                │  ┌──────────────┐  │
                │  │              │  │ ← profile-placeholder (340x340)
                │  │  Profile Img │  │ ← profileGlow 3s animation
                │  │ (from assets)│  │ ← Blue circle border
                │  │              │  │ ← 2px accent border
                │  │ [🟢 Open to] │  │ ← open-to-work badge (bottom-left)
                │  │ [Work]       │  │ ← statusPulse 2s (green dot)
                │  └──────────────┘  │
                │                    │
                │      React • Node.js│ ← code-snippet top-right
                │      (floatCodeDelay)│
                │                    │
                └────────────────────┘
```

### BOTTOM - Scroll Indicator

```
                ┌──────────────────┐
                │ SCROLL TO EXPLORE│ ← centered text
                │       ┌────┐     │
                │       │░░░░│     │ ← scroll-dot with bounce animation
                │       └────┘     │
                └──────────────────┘
```

## Color Scheme

| Element | Color | Usage |
|---------|-------|-------|
| Primary Accent | #0A74DA | Name, badges, borders, hover states |
| Dark Background | #0d1117 | Main background |
| Text Primary | #c9d1d9 | Main text content |
| Text Secondary | #6e7681 | Secondary text, hover states |
| Green Status | #10b981 | "Open to Work" status dot |
| Border Color | rgba(10, 116, 218, 0.3) | Card borders, input borders |

## Animation Timeline

| Element | Animation | Duration | Delay | Loop |
|---------|-----------|----------|-------|------|
| Welcome Badge | welcomePulse | 2.4s | 0s | Infinite |
| Badge Dot | badgeDot | 1.5s | 0s | Infinite |
| Hero Text | slideInFromLeft | 0.8s | 0s | Once |
| Hero Image | slideInFromRight | 0.8s | 0s | Once |
| Code Top-Left | floatCode | 3.5s | 0s | Infinite |
| Code Top-Right | floatCodeDelay | 3.5s | 0.5s | Infinite |
| Profile Circle | profileGlow | 3s | 0s | Infinite |
| Status Dot | statusPulse | 2s | 0s | Infinite |
| Open to Work | badgeSlideUp | 0.6s | 0s | Once |
| Scroll Indicator | fadeIn | 1s | 0.5s | Once |
| Scroll Dot | scrollBounce | 1.8s | 0s | Infinite |
| Social Icons | translateY | - | - | On Hover |

## Responsive Breakpoints

### Desktop (>1200px)
- Hero content: 2 column grid (text | image)
- Profile size: 340px
- Hero title: 2.2rem - 3.8rem (clamp)
- All elements visible

### Tablet (768px - 1200px)
- Hero content: 2 column grid
- Profile size: 280px
- Hero title: 1.8rem
- Slight spacing adjustments

### Mobile (480px - 768px)
- Hero content: 1 column (stacked)
- Profile size: 250px
- Hero title: 1.4rem
- Scroll indicator hidden
- Social icons visible but repositioned
- Code snippets repositioned closer

### Small Mobile (<480px)
- Hero content: 1 column
- Profile size: 200px
- Hero title: 1.4rem
- Scroll indicator: hidden
- Social icons: hidden
- Code snippets minimal spacing

## Hover States

### Buttons
```
.btn-primary:hover {
    background: var(--hover-state);
    box-shadow: 0 0 20px rgba(10, 116, 218, 0.4);
    transform: translateY(-2px);
}

.btn-arrow:hover {
    transform: translateY(3px);
}
```

### Role Tags
```
.role-tag:hover {
    background: rgba(10, 116, 218, 0.2);
    border-color: var(--accent-blue);
}
```

### Social Icons
```
.social-icon:hover {
    color: var(--accent-blue);
    transform: translateY(-4px);
}
```

## Key CSS Properties

### Hero Section
- `display: flex`
- `min-height: 100vh`
- `perspective: 1200px` for 3D effects
- `overflow: hidden` for clean animation edges

### Animations
- Using `transform` for performance (GPU accelerated)
- Using `opacity` for fade effects
- Using `box-shadow` for glow effects
- No paint-heavy properties

### Accessibility
- ✅ Proper color contrast
- ✅ Semantic HTML tags
- ✅ ARIA labels on icons
- ✅ Keyboard navigation support
- ✅ Focus states maintained
- ✅ prefers-reduced-motion support

## File Structure

```
Portfolio/
├── index.html              ← Hero HTML structure
├── css/
│   ├── styles.css         ← Hero CSS styling (400+ lines)
│   └── animations.css     ← Hero animations (130+ lines)
├── js/
│   ├── main.js           ← Interaction logic
│   ├── three-setup.js    ← Optional 3D background
│   └── lenis-scrolltimeline.js ← Smooth scrolling
└── assets/
    └── images/
        └── profile.jpg    ← Profile image
```

## Implementation Notes

1. **Profile Image**: Using `object-fit: cover` for responsive circular display
2. **Animations**: CSS keyframes for performance, no JavaScript animations
3. **Responsive**: Mobile-first approach with breakpoints at 480px, 768px
4. **Performance**: Hardware-accelerated transforms and opacity changes
5. **Accessibility**: All elements have proper alt text and ARIA labels
6. **Browser Support**: Works in all modern browsers, graceful fallback for older versions

---

**Last Updated**: Hero Section Complete Redesign
**Status**: ✅ Production Ready

# Boostify — Brand Guide

## Font

**Inter** (Google Fonts)
- Download: https://fonts.google.com/specimen/Inter
- Logo / Headlines: **Inter Black (900)**
- Subheadings: **Inter Bold (700)**
- Body text: **Inter Regular (400)**
- Captions / Small: **Inter Medium (500)**

---

## Colors

### Primary Palette

| Name | Hex | Use |
|---|---|---|
| Navy 900 | `#0a0e27` | Logo text, headlines, primary buttons |
| Navy 800 | `#0f1538` | Dark backgrounds |
| Navy 700 | `#141c4a` | Button hover states |
| Navy 600 | `#1a2560` | Icon fills, secondary dark |
| Navy 500 | `#243080` | Accent dark |

### Secondary Palette

| Name | Hex | Use |
|---|---|---|
| Navy 300 | `#5570c8` | Decorative elements |
| Navy 200 | `#8ba0e0` | Borders, subtle accents |
| Navy 100 | `#c0cff0` | Geometric shapes, light borders |
| Navy 50 | `#e8edfa` | Background gradient end, card backgrounds |

### Accent

| Name | Hex | Use |
|---|---|---|
| Blue | `#3b82f6` | Logo dot, accent lines, links, CTAs |
| Blue Light | `#60a5fa` | Hover states, highlights |
| Blue Glow | `rgba(59, 130, 246, 0.3)` | Glow effects, shadows |

### Neutrals

| Name | Hex | Use |
|---|---|---|
| White | `#ffffff` | Primary background |
| Gray 50 | `#f8f9fc` | Alternate section background |
| Gray 100 | `#f0f1f5` | Input fields, scrollbar track |
| Gray 200 | `#e2e4eb` | Card borders, dividers |
| Gray 400 | `#9ca1b3` | Body text, descriptions |
| Gray 500 | `#6b7280` | Subtext, captions |

### Success

| Name | Hex | Use |
|---|---|---|
| Green | `#22c55e` | Success states, live dot |

---

## Background Gradient

```
Top-left: #ffffff (pure white)
Bottom-right: #e8edfa (pale blue)
CSS: linear-gradient(165deg, #ffffff 0%, #f8f9fc 40%, #e8edfa 100%)
```

---

## Logo Usage

- **"Boostify"** → Inter Black 900, color `#0a0e27`
- **"."** (dot) → color `#3b82f6`
- **Tagline** → Inter Regular 400, color `#6b7280`, letter-spacing 1px

---

## Decorative Elements

- Thin circle outlines: `1.5px solid rgba(59, 130, 246, 0.12)`
- Diamond shapes: `1.5px border, rotated 45deg`
- Cross marks: `2px lines in rgba(59, 130, 246, 0.12)`
- Small dots: `rgba(59, 130, 246, 0.15)` filled
- Accent line: `2px solid #3b82f6`

---

## Spacing

| Size | Pixels | Use |
|---|---|---|
| XS | 8px | Inner gaps |
| SM | 16px | Card padding, small gaps |
| MD | 24px | Section gaps, card padding |
| LG | 32px | Between components |
| XL | 48px | Section padding |
| 2XL | 64px | Major section spacing |
| 3XL | 120px | Section top/bottom padding |

---

## Border Radius

| Size | Use |
|---|---|
| 8px | Tags, small elements |
| 12px | Inputs, buttons, avatars |
| 14px | Primary buttons |
| 16px | Stat cards, value cards |
| 20px | Service cards, info cards |
| 24px | Project cards, main containers |
| 100px | Pill buttons, badges |

---

## Shadows

```css
--shadow-sm:  0 1px 2px rgba(10, 14, 39, 0.05)
--shadow-md:  0 4px 16px rgba(10, 14, 39, 0.08)
--shadow-lg:  0 8px 32px rgba(10, 14, 39, 0.12)
--shadow-xl:  0 20px 60px rgba(10, 14, 39, 0.15)
--shadow-glow: 0 0 40px rgba(59, 130, 246, 0.15)
```

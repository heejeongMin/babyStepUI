# Baby Care Checklist App - Design Guidelines

## Design Approach: Design System with Parenting App References

**Selected Approach:** Material Design principles adapted for parenting apps, drawing inspiration from BabyCenter and What to Expect for trust and clarity.

**Key Design Principles:**
- Trust and clarity: Professional, medical-grade information presentation
- Calm and supportive: Soothing colors that reduce parental stress
- Scannable content: Quick access to critical information
- Progress tracking: Visual indicators of baby's developmental milestones

## Core Design Elements

### A. Color Palette

**Light Mode:**
- Primary: 210 65% 50% (Soft blue - trustworthy, calming)
- Primary Hover: 210 65% 45%
- Secondary: 280 45% 60% (Gentle purple for accents)
- Background: 210 20% 98% (Soft warm white)
- Surface: 0 0% 100%
- Text Primary: 215 25% 20%
- Text Secondary: 215 15% 45%
- Success: 145 60% 45% (For completed tasks)
- Border: 215 20% 88%

**Dark Mode:**
- Primary: 210 60% 55%
- Primary Hover: 210 60% 60%
- Secondary: 280 40% 65%
- Background: 215 25% 12%
- Surface: 215 20% 16%
- Text Primary: 210 20% 95%
- Text Secondary: 210 15% 70%
- Success: 145 50% 50%
- Border: 215 20% 24%

### B. Typography

**Font Families:**
- Primary: 'Inter' (Google Fonts) - Clean, highly legible for medical information
- Headings: 'Plus Jakarta Sans' (Google Fonts) - Friendly, approachable for parent-facing content

**Type Scale:**
- Hero/Page Titles: text-4xl md:text-5xl font-bold
- Section Headers: text-2xl md:text-3xl font-semibold
- Month Titles: text-xl md:text-2xl font-semibold
- Card Headers: text-lg font-semibold
- Body Text: text-base leading-relaxed
- Captions/Labels: text-sm text-secondary

### C. Layout System

**Spacing Primitives:** Tailwind units of 2, 4, 6, 8, 12, 16, 20
- Consistent rhythm: p-6 for cards, gap-4 for lists, mb-8 for sections
- Container: max-w-7xl mx-auto px-4 md:px-6
- Section padding: py-12 md:py-16

### D. Component Library

**Navigation:**
- Sticky header with app logo, month selector dropdown, and profile icon
- Bottom tab navigation (mobile): Home, Checklists, Milestones, Resources
- Month timeline navigation: Horizontal scrollable pills showing months 0-24

**Core UI Elements:**

*Month Overview Card:*
- Large card with month number/age prominently displayed
- Quick stats: X/Y tasks completed, developmental highlights
- Background gradient overlay with relevant imagery
- CTA button: "View Details"

*Checklist Component:*
- Grouped by category (Supplements, Play, Movement, Sleep, Feeding)
- Checkbox items with expandable details
- Progress bar at category level
- Color-coded categories with icons from Heroicons

*Information Cards:*
- Icon + title + expandable description pattern
- Medical information badge for critical items
- Source citation links for credibility
- Collapsible sections for detailed information

*Milestone Tracker:*
- Visual timeline with nodes for each month
- Completed/upcoming indicator states
- Photo upload capability for memories
- Achievement badges for reached milestones

**Data Displays:**
- List views: Divided lists with alternating subtle backgrounds
- Tables: Clean borders, responsive stacking on mobile
- Stats: Large numbers with descriptive labels, enclosed in cards
- Charts: Simple progress circles and bar charts for tracking

**Forms:**
- Input fields with clear labels above
- Floating labels for material feel
- Helper text below inputs
- Error states in red-500 with icons
- Success states in green-500
- Rounded-lg borders with focus:ring treatment

**Overlays:**
- Modal dialogs: max-w-2xl with backdrop blur
- Bottom sheets (mobile): Slide up for detailed information
- Tooltips: Small, dark tooltips with arrows for explanatory text
- Toast notifications: Top-right corner for confirmations

### E. Animations

Use sparingly for meaningful interactions only:
- Checkbox completion: Gentle scale + checkmark fade-in
- Card expansion: Smooth height transition (200ms ease-in-out)
- Progress updates: Animated progress bar fill
- Tab switches: Subtle fade transition between content

## Images

**Hero Section:**
- Warm, authentic photo of parent and baby (happy, natural lighting)
- Subtle overlay gradient to ensure text readability
- Alternative: Illustrated banner with playful baby-themed graphics in soft pastels

**Month Cards:**
- Age-appropriate baby milestone photos (sitting, crawling, walking)
- Can use illustrations instead for consistency
- Icons from Heroicons for category headers (heart for health, puzzle-piece for play, etc.)

**No Image Needed:**
- Checklist pages (icon-driven)
- Settings/profile pages
- Information detail pages

## Layout Structure

**Home Screen:**
- Current month hero card with featured photo and progress summary
- Quick action buttons: "Today's Checklist", "Add Milestone", "View Resources"
- Upcoming milestones preview section
- Recent activity feed

**Month Detail View:**
- Month header with baby age and developmental stage
- Tabbed interface: Checklists, Milestones, Tips, Growth
- Sticky progress indicator showing completion percentage
- Category sections with expandable content

**Mobile-First Considerations:**
- Bottom navigation always accessible
- Swipe gestures for month navigation
- Large touch targets (min 44px height)
- Collapsible sections to reduce scrolling
- Floating action button for quick add features

This design creates a trustworthy, calming environment where parents can quickly access critical information while tracking their baby's development with confidence.
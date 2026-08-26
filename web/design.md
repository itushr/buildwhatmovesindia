# Design System Specification & Brand Guidelines

This design specification is distilled from the authentic codebase of the **RTI Information Access Portal** (Government of India).

---

## 1. Color Palette & Semantic Usage

| Token / Usage | Hex Code | Tailwind Equivalent | Context / Usage |
|---|---|---|---|
| **Primary Navy** | `#0B1C3F` / `#06152B` | `text-[#0B1C3F]`, `bg-[#0B1C3F]` | Primary headings, brand titles, gov top strip, primary buttons |
| **Action Blue** | `#2563EB` / `#1a4bba` | `text-[#2563EB]`, `bg-[#1a4bba]` | Interactive links, active states, "File an RTI" primary buttons |
| **Statutory Green** | `#0D8A44` / `#0f6b3e` | `text-[#0D8A44]`, `bg-[#0f6b3e]` | Stats numbers, "Get Information" actions, zero-fee indicators |
| **Background Slate** | `#F8FAFC` | `bg-[#f8fafc]` | Page background, action card wrappers |
| **Hero Tint Gradient** | `#EDF5FD` → `#F8FAFC` | `from-[#EDF5FD] to-[#F8FAFC]` | Hero background with subtle atmospheric gradient |
| **Border Gray** | `#E2E8F0` / `gray-200` | `border-gray-200`, `border-slate-200` | Card borders, dividers, form input borders |
| **Text Slate** | `#475569` / `#64748B` | `text-slate-600`, `text-gray-500` | Body copy, descriptions, subtitles |

---

## 2. Geometry & Corner Radii

*Rule: The portal uses institutional structured geometry — NOT exaggerated AI pills.*

- **Section / Modal Containers**: `rounded-2xl` (`16px`)
- **Action Cards & Stats Cards**: `rounded-xl` (`12px`)
- **Buttons (Primary & Secondary)**: `rounded-md` (`6px`) or `rounded-lg` (`8px`)
- **Form Inputs & Selects**: `rounded-lg` (`8px`)
- **Icon Enclosures (How It Works & Actions)**: `rounded-full` with subtle tinted backgrounds:
  - Navy/Blue: `bg-[#edf4ff] border border-blue-100`
  - Green: `bg-green-50 border border-green-100`
  - Blue: `bg-blue-50 border border-blue-100`

---

## 3. Typography & Hierarchy

- **Font Family**: Inter / Geist Sans / System Sans-Serif (`font-sans`)
- **Hero / Main Headings**: `font-extrabold tracking-tight text-[#0B1C3F]`
- **Section Headings**: `text-2xl sm:text-3xl font-extrabold text-[#0B1C3F] tracking-tight`
- **Card Headings**: `text-base sm:text-lg font-bold text-[#0B1C3F]`
- **Action Titles**: `text-xl sm:text-2xl font-bold` (Green `#0f6b3e` or Blue `#1a4bba`)
- **Body & Subtitles**: `text-xs sm:text-sm text-slate-600 font-normal leading-relaxed`

---

## 4. UI Patterns & Layout Structure

### A. The 3-Step "How It Works" Flow
- Step 1: **Search / Ask** (`SearchIcon` inside `rounded-full bg-[#edf4ff] border border-blue-100`)
- Horizontal Dashed Connector with Chevron (`strokeDasharray="5 5" stroke="#CBD5E1"`)
- Step 2: **Get Results** (`DocumentTextIcon` inside `rounded-full bg-[#edf4ff] border border-blue-100`)
- Horizontal Dashed Connector with Chevron (`strokeDasharray="5 5" stroke="#CBD5E1"`)
- Step 3: **File RTI (if needed)** (`DocumentCheckIcon` inside `rounded-full bg-[#edf4ff] border border-blue-100`)

### B. The Dual Decision Pathway (Main Actions Section)
- **Get Information Pathway (Green)**:
  - Tone: Emerald/Forest Green (`text-green-700`, `bg-green-50`, `border-green-100`)
  - Principle: Discover information already available in the public domain for **₹0 (Zero Fees)** without any formal application.
  - Button: `bg-[#0f6b3e] hover:bg-[#0c5933] text-white px-6 py-2.5 rounded-md font-medium`
- **File an RTI Pathway (Blue)**:
  - Tone: Official Navy/Blue (`text-blue-700`, `bg-blue-50`, `border-blue-100`)
  - Principle: Submit statutory request to a Public Authority under Section 6(1) with 30-day resolution timeline.
  - Button: `bg-[#1a4bba] hover:bg-[#153e9a] text-white px-6 py-2.5 rounded-md font-medium`

---

## 5. Modal & Floating Button Specification

### Pop-Up Modal Specification:
- **Card**: `bg-white border border-gray-200 rounded-2xl shadow-xl shadow-blue-950/10 p-6 sm:p-8 max-w-4xl`
- **Header**:
  - Heading: `Understanding the Portal Workflow`
  - Subtitle: `Check public records for free first. Proceed to file an official RTI only if information is not found.`
- **Body Flow**:
  - Horizontal 3-step sequence matching the exact icon and dashed-line styling of the homepage.
  - Two comparison cards (Green for Public Domain ₹0 vs Blue for Statutory RTI) matching the Main Actions section.
- **Buttons**:
  - Primary: `rounded-md bg-[#0B1C3F] hover:bg-[#06152B] text-white px-5 py-2.5 text-xs font-semibold`
  - Secondary: `rounded-md bg-[#1a4bba] hover:bg-[#153e9a] text-white px-5 py-2.5 text-xs font-semibold`
  - Outline: `rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2.5 text-xs font-semibold`

### Floating Button Specification:
- **Location**: `fixed bottom-6 right-6 z-40`
- **Style**: `bg-white hover:bg-slate-50 text-[#0B1C3F] border border-slate-300 rounded-full px-4 py-2.5 shadow-md hover:shadow-lg text-xs font-bold flex items-center gap-2.5 backdrop-blur-md`
- **Icon Avatar**: `w-5 h-5 rounded-full bg-blue-50 text-[#2563EB] border border-blue-200 flex items-center justify-center` with `HelpCircle`
- **Text**: `How the Portal Works` (English) / `पोर्टल की कार्यप्रणाली` (Hindi)

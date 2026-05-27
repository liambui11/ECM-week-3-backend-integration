# StockVibe — Premium Inventory & Product CRUD Dashboard

This is the React + TypeScript frontend for the Product CRUD database API, structured as a high-fidelity visual inventory manager. It is designed to run independently using Vite and communicate with the Express/Prisma/PostgreSQL backend on `http://localhost:3000`.

---

## 🚀 Setup & Execution

### Prerequisites
- Node.js (v18 or higher)
- Running backend API (on port 3000)

### Quick Start
To get started from the **root directory**, simply run:

```bash
# 1. Install all dependencies for both backend and frontend
npm run install-all

# 2. Run the backend Express server
npm run dev

# 3. In another terminal, run this command to start the Vite frontend dev server
npm run frontend
```

The frontend will start running on **[http://localhost:5173](http://localhost:5173)**.

---

## 📂 Project Structure

All frontend assets are located under the `frontend` folder:

```
frontend/
├── src/
│   ├── components/            # Visual components grouped by domain
│   │   ├── Category/          # Category-related widgets
│   │   │   ├── CategoryCard.tsx/.css
│   │   │   └── CategoryPanel.tsx/.css
│   │   ├── Product/           # Product-related widgets
│   │   │   ├── ProductCard.tsx/.css
│   │   │   ├── ProductFilterBar.tsx/.css
│   │   │   ├── ProductForm.tsx/.css
│   │   │   └── ProductPanel.tsx/.css
│   │   ├── OfflineBanner/     # Connectivity status bar
│   │   │   └── OfflineBanner.tsx/.css
│   │   ├── ErrorBoundary/     # Render safety boundaries
│   │   │   └── ErrorBoundary.tsx/.css
│   │   └── Toast/             # Operations success/error toast alerts
│   │       └── Toast.tsx/.css
│   ├── constants/             # Named constants & configurations (Rule #4)
│   │   └── index.ts
│   ├── hooks/                 # Custom React hooks (No business logic in UI - Rule #3)
│   │   ├── useCategories.ts
│   │   ├── useProducts.ts
│   │   └── useOffline.ts
│   ├── services/              # API Client fetch helper services
│   │   └── api.ts
│   ├── types/                 # TypeScript strict definitions (Rule #9)
│   │   └── index.ts
│   ├── App.tsx/.css           # Main dashboard layout wrapper
│   ├── index.css              # Global design systems, tokens & animation sets
│   └── main.tsx               # Mounting point
├── index.html                 # Main markup with SEO tags
├── package.json               # Dependencies list
├── tsconfig.json              # TypeScript compilation rules
├── .eslintrc.json             # Code quality linter config
└── .prettierrc                # Code formatter config
```

---

## 🎨 Visual Design Decisions

- **Rich Aesthetic Philosophy**: Standard browser defaults are replaced by Inter (for data tables/body text) and Outfit (for title headlines) loaded from Google Fonts.
- **Color System**: Curated dark HSL-based palette utilizing deep slate tones (`#0B0F19`), vibrant neon indigo/violet accents (`#6366F1`, `#A855F7`), and soft greens (`#10B981`) for prices and success states.
- **Glassmorphism**: Visual panels use subtle semi-transparent background colors combined with 1px translucent borders (`var(--border-glass)`) and backdrop filters (`blur(16px)`) to produce a highly premium, futuristic texture.
- **Micro-Animations**: All cards and buttons incorporate spring transitions (`cubic-bezier(0.4, 0, 0.2, 1)`) and subtle scaling triggers (`transform: translateY(-2px)`) to provide a tactile, responsive, and delightful interaction model.

---

## 🔧 Production Rules Verification

We strictly enforce the 10 production rules in the codebase:
1. **No file > 150 lines**: Handled by extracting large blocks into child components (e.g. splitting `ProductPanel` into `ProductForm`, `ProductFilterBar`, `ProductCard`).
2. **No function > 20 lines**: Ensured by decomposing complex handlers and render tasks into tiny helper components (e.g. `RenderImage` and `RenderInfo` in `ProductCard`).
3. **No business logic in templates/JSX**: Isolated all state, filtering, fetch calls, and rollback logic inside custom hooks (`useProducts`, `useCategories`).
4. **All magic numbers/strings → named constants**: Centralized in `src/constants/index.ts`.
5. **Consistent naming**: Used camelCase for variables/hooks and PascalCase for components.
6. **Error boundaries around major sections**: Wrapped `CategoryPanel` and `ProductPanel` individually to contain render crashes.
7. **Loading/Error/Empty states**: Handled explicitly in both list views using custom visual spinners, error bars, and search empty placeholders.
8. **Documentation**: Documented fully in this README.
9. **No TypeScript `any` types**: Banned completely in `.eslintrc.json`, every endpoint uses strict interfaces.
10. **Prettier + ESLint configured**: Configured in `.eslintrc.json` and `.prettierrc`.

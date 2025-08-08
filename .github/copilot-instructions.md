<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

This project is a performant grid built with React, TypeScript, and Vite. Focus on speed, modularity, and modern best practices.

I'm building a take-home project for a Frontend Engineer role. The goal is to create a simplified Airtable-like grid interface using React, TypeScript, and Vite.

## 🧱 Project Goal:
Build a performant, sortable, and filterable table/grid interface that can display 1000+ records efficiently.

---

## 1. Project Setup
- Scaffold a new project using **Vite + React + TypeScript**.
- Set up **Tailwind CSS** for styling (optional, but preferred).
- Folder structure:
  - `src/components/`
  - `src/services/`
  - `src/types/`
  - `public/mock-data.json` (for fake API)

---

## 2. Data Handling
- Load data from `/mock-data.json` in `public/`.
- Create a data fetching utility (`services/dataService.ts`).
- Store the data in state using `useState` or `useReducer`.

---

## 3. Table UI
- Use **react-window** to virtualize the table rows for performance.
- Display columns: `name`, `status`, `createdAt`.
- Create a reusable `DataTable` component that accepts data and renders rows.

---

## 4. Sorting and Filtering
- Add sorting for `name` and `createdAt` columns.
- Add filtering for `status` via dropdown or checkboxes.
- Use `useMemo` to optimize derived data (sorted/filtered).
- Use `useCallback` to prevent unnecessary re-renders.

---

## 5. Performance Optimizations
- Memoize the row component using `React.memo`.
- Debounce filter inputs using `useRef` and `setTimeout` or a utility.
- Ensure scrolling and rendering are smooth with 1000+ rows.

---

## 6. Testing (Optional Bonus)
- Add basic tests using **Vitest** and **React Testing Library**:
  - Sorting function returns correct order.
  - Filter function narrows down records.
  - DataTable renders expected rows.

---

## 7. Documentation
- Create a `README.md` with:
  - How to run the project
  - Key decisions made
  - Assumptions (e.g. using local JSON instead of real API)
  - Trade-offs due to time constraints

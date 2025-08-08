# Performant Grid

A modern, performant, and composable grid/table UI built with React, TypeScript, Vite, and Tailwind CSS. Inspired by Airtable, this project demonstrates frontend engineering best practices for large datasets (1000+ records).

## Features

- ⚡ **Virtualized rendering** for smooth scrolling with 1000+ rows
- 🔎 **Sorting** by name and created date
- 🧮 **Filtering** by status and name (with debounce)
- 🧱 **Composable components** for header, rows, and filter
- 🎨 **Tailwind CSS** for rapid, modern styling
- 🧪 **Unit tests** for data filtering and sorting (Vitest)

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

```bash
npm install
```

### Running the Project

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```bash
npm run build
```

### Running Tests

```bash
npm run test
```

## Project Structure

```
public/
   mock-data.json      # Sample data for the grid
src/
   components/         # UI components (DataTable, Header, Row, Filter)
   services/           # Data fetching/filtering utilities
   types/              # TypeScript types
```

## Key Decisions & Trade-offs

- **Virtualization:** Uses `@tanstack/react-virtual` for best performance. Other libraries (react-window, react-virtualized) were considered but not used.
- **Local JSON:** Data is loaded from a local file for simplicity; in production, use an API.
- **Tailwind CSS:** Chosen for speed and consistency, but can be swapped for other CSS frameworks.
- **Componentization:** Table split into header, row, and filter for reusability and clarity.
- **Testing:** Focused on core data logic (filtering, sorting) due to time constraints.

## Assumptions

- Data is static and loaded from `public/mock-data.json`.
- No backend/API integration required for this demo.
- UI/UX is optimized for desktop screens.

## How to Extend

- Add more columns or filters in `DataTableHeader` and `DataTableFilter`.
- Connect to a real API in `dataService.ts`.
- Add pagination, editing, or row selection features.

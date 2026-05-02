# NHTSA Dashboard

A vehicle data dashboard built with React and TypeScript, consuming the [NHTSA vPIC API](https://vpic.nhtsa.dot.gov/api/).

## Getting started

```bash
npm install
npm run dev
```

App runs at `http://localhost:5173`.

## Login

Two hardcoded accounts for demo purposes:

| Username | Password  | Role   |
| -------- | --------- | ------ |
| admin    | admin123  | Admin  |
| viewer   | viewer123 | Viewer |

Admins can access the User Management page. Viewers can't.

## What's inside

**Dashboard** — KPI cards showing top make, total makes, models, and vehicle types. A few charts and insights break down the data visually. You can filter everything by selecting specific makes from the dropdown.

**Vehicles** — Full table of all vehicle makes from the NHTSA database. Sortable by ID or name, searchable, and paginated. Click View button to open a detail panel with the models and vehicle types for that make.

**User Management** — Admin-only page with a dummy harcoded accounts in the table.

## Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS
- Zustand (auth, layout, selected vehicle makes state)
- TanStack Query (data fetching + caching)
- Ant Design (table, modal, select, notifications, input, form)
- Chart.js via react-chartjs-2

## Running tests

```bash
npm run test
```

15 unit tests covering the auth store, vehicle API service, and the vehicles table component.

## Build

```bash
npm run build
```

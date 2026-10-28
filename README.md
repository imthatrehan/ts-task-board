# 🗂️ TS Task Board — TypeScript + Redux Kanban

A Jira/Trello-style Kanban board converted to **TypeScript**, built with **React (Vite)**, **Redux Toolkit**, **Tailwind CSS**, and **HTML5 Drag & Drop**. Features feature-based architecture, generics-powered custom hooks, typed Redux slices, and typed error boundaries.

![Status](https://img.shields.io/badge/Status-Completed-success)
![Day](https://img.shields.io/badge/12--Week--Roadmap-Day%2010-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Redux](https://img.shields.io/badge/Redux_Toolkit-2-764ABC?logo=redux)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-38B2AC?logo=tailwind-css)

---

## 🌟 Features

### Kanban Board
- **3 Columns** — To Do, In Progress, Done
- **Drag & Drop** — HTML5 native API (no library)
- **Visual Feedback** — Dragging card fades, column highlights
- **Mobile Fallback** — `<select>` dropdown for status
- **Search** — Live filter across all columns
- **Add Task** — Input + Enter key support
- **Edit Task** — Double-click on todo, Enter to save, Escape to cancel
- **Toggle Complete** — Checkbox in each card
- **Delete Task** — Trash icon with hover reveal
- **Clear Completed** — Footer button
- **Task Counts** — Per column + footer
- **Empty State** — Drop hint when column is empty

### TypeScript Features
- **Typed Redux Slice** — `PayloadAction<T>` everywhere
- **Typed Custom Hook** — `useLocalStorage<T>` with generics
- **Typed Components** — Props, events, refs
- **Typed Error Boundary** — `Component<Props, State>`
- **Literal Unions** — `'todo' | 'in-progress' | 'done'`
- **Type-safe Selectors** — `createSelector` with inferred state

---

## 🧠 TypeScript Concepts Practiced

| Concept | Where Used |
|---------|------------|
| **`interface`** | `Task`, `TasksState`, `ColumnItem`, `HeaderProps`, `InputProps` |
| **`type`** | `Task['status']`, `RootState` (recommended) |
| **Literal Union** | `'todo' \| 'in-progress' \| 'done'` |
| **Generics** | `useLocalStorage<T>`, `loadState<T>` |
| **`PayloadAction<T>`** | Every Redux reducer |
| **`Dispatch<SetStateAction<T>>`** | `HeaderProps.setSearchInput` |
| **`ChangeEvent<HTMLInputElement>`** | `Input.tsx` |
| **`KeyboardEvent<HTMLInputElement>`** | `Input.tsx` |
| **`Component<Props, State>`** | `ErrorBoundary.tsx` |
| **`ReactNode`** | `ErrorBoundary` children |
| **`ErrorInfo`** | `componentDidCatch` |
| **`as const`** | `useLocalStorage` return tuple |
| **`import type`** | Event types, `ReactNode` |
| **`as` assertion** | `addTask` payload `as Task` |
| **Null guard** | `if (match) { ... }` |

---

## 🧠 Other Concepts Practiced

| Concept | Where Used |
|---------|------------|
| **Redux `prepare` callback** | `addTask` — ID generation |
| **`createSelector`** | Memoized filtered selectors |
| **Feature-based structure** | `features/tasks/` |
| **Dumb components** | `Input`, `EmptyState` |
| **HTML5 Drag & Drop** | 6 events handled |
| **Error Boundary** | Class component + fallback |
| **Store Subscribe** | Manual persistence |

---

## 🐛 TypeScript Debugging Drill — Solutions

### Error 1: `Property 'push' does not exist on type 'readonly Task[]'`
```typescript
// ❌ Bug
const items: readonly Task[] = [...]
items.push(task)

// ✅ Fix
const items: Task[] = [...]
items.push(task) // or items = [...items, task]
Cause: readonly array mutation block karta hai. Immer ya spread se fix.

Error 2: Type 'string' is not assignable to type '"todo" | "in-progress" | "done"'
typescript
// ❌ Bug
task.status = "complete" // 'complete' allowed nahi

// ✅ Fix
task.status = "done"
// ya:
const newStatus: Task['status'] = "done"
Cause: Literal union type — sirf defined statuses allowed.

Error 3: Object is possibly 'undefined'
typescript
// ❌ Bug
const task = state.items.find(t => t.id === id)
task.status = "done" // task undefined ho sakta hai

// ✅ Fix
const task = state.items.find(t => t.id === id)
if (task) {
  task.status = "done" // narrowed
}
Cause: Array.find returns T | undefined. Guard zaroori.

🛠️ Tech Stack
Framework: React 19 (Vite)

Language: TypeScript 5

State: Redux Toolkit + React Redux

Styling: Tailwind CSS v4

Icons: Lucide React

Fonts: Libre Caslon Condensed + Quicksand

DnD: HTML5 native API (no library)

Persistence: localStorage

📂 Project Structure
text
ts-task-board/
├── src/
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   ├── main.tsx
│   ├── MainPage.tsx
│   ├── ErrorBoundary.tsx                # Typed class component
│   ├── app/
│   │   └── store.ts                     # configureStore + subscribe
│   ├── components/
│   │   ├── Header.tsx                   # Typed props
│   │   ├── Footer.tsx
│   │   └── ui/
│   │       ├── AddTask.tsx
│   │       ├── EmptyState.tsx
│   │       └── Input.tsx                # Typed events
│   ├── features/
│   │   └── tasks/
│   │       ├── tasksSlice.ts            # Types + slice + selectors
│   │       └── components/
│   │           ├── Board.tsx            # Typed columns
│   │           └── Column.tsx           # Typed cards
│   ├── hooks/
│   │   └── useLocalStorage.ts           # Generic <T>
│   └── utils/
│       ├── formatDate.ts
│       ├── generateId.ts
│       └── storage.ts                   # Generic loadState
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
🎨 Design Highlights
Same as Day 9 — sage green accent, Libre Caslon + Quicksand, Kanban layout. TypeScript ne UI nahi badla, bas runtime errors compile-time par pakad liye.

🚀 How to Run
bash
# Clone
git clone https://github.com/imthatrehan/ts-task-board.git
cd ts-task-board

# Install
npm install

# Dev server
npm run dev

# Type check (important!)
npx tsc --noEmit

# Build
npm run build
Open http://localhost:5173# ts-task-board

# Learning App

## Application Structure

### Pages and components

- `pages/HomePage.tsx`: The home page.
- `pages/EntriesPage.tsx`: Loads the learning entries from the backend and shows them in a list. Has a form for adding entries.
- `components/LearningEntry.tsx`: A component that shows one learning entry. 
- `App.tsx`: Chooses which page to show.

### Layers

- **React** (frontend): Displays the user interface, handles user inputs.
- **Express** (backend): Handles HTTP requests from frontend, runs SQL queries, returns JSON.
- **MariaDB** (Database): Stores learning entries.

### `/entries` vs `GET /api/entries`

`/entries` is a page in browser that is handled by React Router. `GET /api/entries` is an Express endpoint that returns the entries in database as JSON.

### Why REST

The app has one clear resource, learning entries, and simple operations that map directly to HTTP methods. `GET` reads entries and `POST` creates a new entry. This keeps the API simple and easy to understand.

## State Management

- **Local state (`useState`)**: Form fields and status messages. Only Entries page uses them, so they don't need to last.
- **Shared state (Zustand)**: List of learning entries. It lives in one store, so any page or component can read the same list easily. `loadEntries()` fetches from `GET /api/entries` and calls `setEntries()` to replace the list.
- **Persistent storage (MariaDB)**: Zustand only keeps data in browser memory, so the store gets emptied when page is refreshed. MariaDB is still needed because it stores the entries permanently. New entries are saved with `POST /api/entries`, and when the page is refreshed they are loaded back into the store with GET.

## Testing and Reliability

### Validation

The backend validates every POST independently. `backend/validation.ts` contains `isValidConfidence` and `isNonBlankString` (used for topic and learned). The POST route uses these same functions. Invalid input returns HTTP 400. SQL uses parameterised queries (`?`), and `.env` is not committed.

### Automated unit tests
Run from the `backend` folder:

    npm test        # runs: node --test validation.test.ts

| Test | Result |
|------|--------|
| confidence must be an integer from 1 to 5 | pass |
| topic must be a non-blank string | pass |

To check that the test really tests something, I temporarily changed `<= 5` to `<= 10`.
The confidence test failed on `isValidConfidence(6)` (expected false, got true).
I restored the rule, and both tests pass again.

### Manual tests
Invalid requests were sent directly to Express with `curl.exe`, bypassing React.

| Input or action | Expected | Actual | Pass/Fail |
|---|---|---|---|
| Empty topic (curl) | HTTP 400, no database write | 400 `Invalid learning entry`, entry count unchanged (7) | Pass |
| Confidence = 100 (curl) | HTTP 400, no database write | 400 `Invalid learning entry`, entry count unchanged (7) | Pass |
| Missing `learned` (curl) | HTTP 400, no database write | 400 `Invalid learning entry`, entry count unchanged (7) | Pass |
| Stop Express and submit a valid form | Useful error, unchanged entry list | "Could not confirm the save…" shown, list unchanged; after restart a valid entry saved | Pass |


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://npmx.dev/package/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://npmx.dev/package/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

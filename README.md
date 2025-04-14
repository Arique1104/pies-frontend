# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
# 🧠 PIES Tracker – Frontend

A React + TypeScript frontend for the PIES (Physical, Intellectual, Emotional, Spiritual) Tracker, designed to support healing-centered leadership growth through daily check-ins, insights, and visualizations.

---

## 📦 Tech Stack
- React (TypeScript)
- Vite
- Axios
- Recharts (data visualization)
- JWT-based auth

---

## 🚀 Setup

```bash
cd pies-frontend
npm install
npm run dev
```

Make sure your `.env` (or axios baseURL config) points to the backend:
```ts
axios.defaults.baseURL = 'http://localhost:3000';
```

---

## 🧑‍🤝‍🧑 Roles

- **Individual**: Check in daily, view personal trends and suggestions
- **Leader**: Read-only access to reflection tips
- **Owner**: Full control over users, unmatched keywords, and tip engine

---

## 🔑 Features

- Role-based dashboards
- PIES check-in form (with sliders)
- Daily reflection engine with keyword-based tips
- Radar and line chart visualizations
- Responsive suggestion display logic
- Unmatched keyword review UI (for Owners)
- Tip manager with full CRUD (for Owners)
- Tip search (for all roles)

---

## 📁 File Highlights
- `src/components/PiesCheckinForm.tsx`
- `src/components/PiesRadarChart.tsx`
- `src/components/PiesSuggestions.tsx`
- `src/components/ReflectionTipsManager.tsx`
- `src/pages/IndividualDashboard.tsx`, `LeaderDashboard.tsx`, `OwnerDashboard.tsx`

---

## 🧪 Testing Locally
- Use the secret owner signup route to create an owner user
- Login as each role to test dashboards
- Enter various keywords in descriptions to see suggestion matches
## CoffeeBliss Frontend (TypeScript/Next.js)

This project is now a fully frontend, TypeScript-driven application built with [Next.js](https://nextjs.org). All backend logic and dependencies have been removed.

### Getting Started

Run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Features
- Cart and menu logic implemented in TypeScript (see `lib/CartContext.tsx` and `lib/menuData.ts`)
- No backend or API dependencies
- All calculations and state are handled client-side

### Notes
- If you previously used backend features (authentication, orders, rewards, etc.), these are no longer available.
- Remove or archive the `backend/` directory if not needed.

### Deployment
Deploy as a static frontend app (e.g., Vercel, Netlify, etc.).

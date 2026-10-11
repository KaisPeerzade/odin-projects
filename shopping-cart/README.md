# MiniStore – React Shopping Cart

A mock shopping cart built with React, React Router and Vite. Products come from the [FakeStore API](https://fakestoreapi.com/).

## Features
- Home, Shop and Cart pages with a shared navbar
- Quantity input with +/- buttons and manual typing
- Live cart item count in the navbar
- Edit quantities or remove items in the cart, with a running total
- Tests with Vitest and React Testing Library

## Run locally
```bash
npm install
npm run dev
npm test
npm run build
```

## Deploy
Deployed on Vercel. `vercel.json` rewrites all routes to `index.html` so React Router works on refresh.

Live demo: _add your Vercel link here_

# Addis Eats — Interactive React Menu (State, Filters & Form Validation)

An interactive, responsive food ordering application for **Addis Eats** built with **React** and **Vite**, featuring state management, dynamic category filtering, a running order total in Ethiopian Birr (ETB), and a live-validated TeleBirr delivery order form.

## Key Features

1. **Category Filtering (`CategoryBar.jsx` & `Menu.jsx`)**:
   - Stateless `CategoryBar` rendering category chips with active highlighting.
   - Lifted `selectedCategory` state in `Menu` deriving filtered dishes.
   - Dedicated Empty State view when a category has no dishes.

2. **Dish Quantity & Order Total (`Dish.jsx` & `Menu.jsx`)**:
   - Local `count` state inside each `Dish` card with increment and decrement controls.
   - Real-time running order total calculated and displayed in **ETB**.

3. **Controlled TeleBirr Order Form (`OrderForm.jsx`)**:
   - Managed with **one state object** (`{ name, phone, area }`).
   - Live TeleBirr phone number validation (`09xxxxxxxx` or `07xxxxxxxx`, 10 digits).
   - Delivery neighborhood selector for Addis Ababa.
   - Disabled submit button until the form is completely valid and order total > 0.
   - Instant order confirmation view upon submission.

4. **Component Architecture & Validation**:
   - `Card` container component utilizing `props.children`.
   - Full `PropTypes` validation across all components.
   - Guarded boolean conditional rendering for spicy badges (`🌶️ Spicy`).

## Project Structure

```text
module-3/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── data.js           # Addis Eats menu data with ETB prices
    ├── Card.jsx          # Reusable wrapper component using children
    ├── CategoryBar.jsx   # Stateless category filter chips
    ├── Dish.jsx          # Dish card with count state & Add/counter buttons
    ├── Menu.jsx          # Lifted category/order state, list & running ETB total
    ├── OrderForm.jsx     # Controlled TeleBirr delivery form + live validation
    ├── Header.jsx        # Branding header
    ├── App.jsx           # Root layout
    ├── App.css           # Component styles, form layout & theme
    ├── index.css         # Global resets & CSS custom properties
    └── main.jsx          # Vite React entry point
```

## Getting Started

### Installation

```bash
npm install
```

### Run Locally

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

# Addis Eats — React Menu with Props, Validation & Rendering Patterns

An extended static menu application for **Addis Eats** built with **React** and **Vite**, featuring component composition, PropTypes validation, default props, conditional rendering with boolean guards, and category filtering with empty state handling.

## Features

- **Card Wrapper Component (`Card.jsx`)**: Reusable wrapper accepting and rendering `children`.
- **Dish Component (`Dish.jsx`)**:
  - Validated with `PropTypes` (`name`, `price`, `currency`, `spicy`, `category`, `description`).
  - Default value for `currency` (`'$'`).
  - Conditional rendering of `🌶️ Spicy` badge using guarded booleans (`Boolean(spicy) && ...`).
- **Menu Component (`Menu.jsx`)**:
  - Filter dishes by category.
  - Informative empty state handling when no matching items exist in a category.
  - List rendering with stable keys (`dish.id`).
- **External Data Module (`data.js`)**: Structured menu dataset with `id`, `name`, `price`, `category`, and `spicy` flags.
- **Interactive Category Filtering**: Category selection pills allowing instant filtering and empty state preview.

## Project Structure

```text
module-3/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── data.js        # Menu dataset
    ├── Card.jsx       # Reusable container wrapper using children
    ├── Dish.jsx       # Dish card with PropTypes, defaults & conditional badge
    ├── Menu.jsx       # Category filtering, empty state & dish mapping
    ├── Header.jsx     # Branding Header component
    ├── App.jsx        # Root component composing Header and Menu
    ├── App.css        # Layout, components, badges & empty state styling
    ├── index.css      # Base design tokens, resets & typography
    └── main.jsx       # Vite React entry point
```

## Getting Started

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

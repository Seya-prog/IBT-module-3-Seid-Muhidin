# Addis Eats — Static Menu (React + Vite)

A modern, responsive static restaurant menu web application for **Addis Eats**, built with **React** and **Vite** as part of the IBT College React module in-class exercise.

## Features

- **Component-Based Architecture**:
  - `Header`: Displays restaurant branding and introductory tagline.
  - `Dish`: Reusable presentation card accepting `name` and `price` props (plus category and description).
  - `App`: Composes the components and maps over a structured menu array using unique `key`s.
- **Modern Responsive Design**: Grid-based responsive layout with tailored typography and subtle hover micro-interactions.
- **Fast Build Tooling**: Powered by Vite.

## Project Structure

```text
module-3/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx       # Application entry point
    ├── App.jsx        # Root component (dishes array & layout composition)
    ├── Header.jsx     # Branding Header component
    ├── Dish.jsx       # Reusable Dish card component
    ├── App.css        # Layout & component styling
    └── index.css      # Base styles, CSS variables & typography
```

## Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (version 18+ recommended).

### Installation

1. Clone or download the repository.
2. Install dependencies:

```bash
npm install
```

### Running the Development Server

Start the Vite development server:

```bash
npm run dev
```

Open the local URL displayed in your terminal (typically `http://localhost:5173`) in your browser.

### Building for Production

To create an optimized production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

import { useState } from 'react';
import Header from './Header';
import Menu from './Menu';
import { menuData } from './data';
import './App.css';

const categories = ['All', 'Meat', 'Vegetarian', 'Appetizers', 'Beverages', 'Desserts'];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <div className="app-layout">
      <Header />

      <main className="menu-container">
        <div className="menu-heading">
          <h2 className="section-title">Our Menu</h2>
          <p className="section-subtitle">
            All entrées are served with freshly made teff injera.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="category-filters" role="tablist" aria-label="Filter menu by category">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu with Category Filtering and Empty State */}
        <Menu dishes={menuData} selectedCategory={selectedCategory} />
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Addis Eats. Built with React & Vite.</p>
      </footer>
    </div>
  );
}

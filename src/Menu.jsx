import { useState, useMemo, useRef, useEffect } from 'react';
import CategoryBar from './CategoryBar';
import DishList from './DishList';
import OrderForm from './OrderForm';
import { useFetch } from './hooks/useFetch';
import { useCart } from './cart/CartProvider';

const CATEGORIES = ['All', 'Meat', 'Vegetarian', 'Appetizers', 'Beverages', 'Desserts'];

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const { data: dishes, loading, error } = useFetch('/dishes.json');
  const { total, totalCount } = useCart();

  const searchInputRef = useRef(null);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  // Memoize filtered & sorted dish list for performance
  const filteredDishes = useMemo(() => {
    if (!dishes) return [];

    let result = dishes;

    if (selectedCategory && selectedCategory.toLowerCase() !== 'all') {
      result = result.filter(
        (dish) =>
          dish.category &&
          dish.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (dish) =>
          dish.name.toLowerCase().includes(q) ||
          (dish.description && dish.description.toLowerCase().includes(q))
      );
    }

    return result;
  }, [dishes, selectedCategory, searchQuery]);

  return (
    <section className="menu-section" aria-label="Addis Eats Interactive Menu">
      {/* Auto-focused Search Field */}
      <div className="search-bar-container">
        <input
          ref={searchInputRef}
          type="search"
          className="form-input search-input"
          placeholder="🔍 Search dishes by name or ingredients..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search menu items"
        />
      </div>

      {/* Category Bar Chips */}
      <CategoryBar
        categories={CATEGORIES}
        selectedCategory={selectedCategory}
        onSelect={(cat) => setSelectedCategory(cat)}
      />

      {/* Running Order Status Bar */}
      <div className="running-total-bar">
        <div className="running-total-info">
          <span className="running-total-label">Current Order Total:</span>
          <span className="running-total-value">
            {total.toLocaleString()} ETB
          </span>
          <span className="running-total-count">
            ({totalCount} {totalCount === 1 ? 'item' : 'items'})
          </span>
        </div>
      </div>

      {/* Early Return / Conditional UI for Loading & Error */}
      {loading ? (
        <div className="menu-status-container loading-container" role="status" aria-live="polite">
          <div className="spinner"></div>
          <p className="status-message">Loading delicious Addis Eats dishes...</p>
        </div>
      ) : error ? (
        <div className="menu-status-container error-container" role="alert">
          <div className="error-icon">⚠️</div>
          <h3 className="error-title">Failed to Load Menu</h3>
          <p className="error-message">{error}</p>
        </div>
      ) : (
        <DishList
          dishes={filteredDishes}
          selectedCategory={selectedCategory}
        />
      )}

      {/* Validated TeleBirr Delivery Form */}
      <div className="order-section-container">
        <OrderForm orderTotal={total} />
      </div>
    </section>
  );
}

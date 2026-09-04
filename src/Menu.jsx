import { useState, useEffect, useRef } from 'react';
import CategoryBar from './CategoryBar';
import DishList from './DishList';
import OrderForm from './OrderForm';
import { loadDishes } from './api';

const CATEGORIES = ['All', 'Meat', 'Vegetarian', 'Appetizers', 'Beverages', 'Desserts'];

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [orderItems, setOrderItems] = useState({});

  const searchInputRef = useRef(null);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    loadDishes(selectedCategory, { signal: controller.signal })
      .then((data) => {
        setDishes(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        setError(err.message || 'Failed to load menu dishes.');
        setLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, [selectedCategory]);

  const runningTotal = Object.values(orderItems).reduce((sum, item) => {
    return sum + item.price * item.count;
  }, 0);

  const totalItemCount = Object.values(orderItems).reduce((sum, item) => {
    return sum + item.count;
  }, 0);

  const handleAddDish = (dish) => {
    setOrderItems((prev) => ({
      ...prev,
      [dish.id]: {
        name: dish.name,
        price: dish.price,
        count: dish.count,
      },
    }));
  };

  const handleRemoveDish = (dish) => {
    setOrderItems((prev) => {
      const updated = { ...prev };
      if (dish.count <= 0) {
        delete updated[dish.id];
      } else {
        updated[dish.id] = {
          name: dish.name,
          price: dish.price,
          count: dish.count,
        };
      }
      return updated;
    });
  };

  const displayedDishes = searchQuery.trim() === ''
    ? dishes
    : dishes.filter(
        (dish) =>
          dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (dish.description && dish.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );

  return (
    <section className="menu-section" aria-label="Addis Eats Interactive Menu">
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

      <CategoryBar
        categories={CATEGORIES}
        selectedCategory={selectedCategory}
        onSelect={(cat) => setSelectedCategory(cat)}
      />

      <div className="running-total-bar">
        <div className="running-total-info">
          <span className="running-total-label">Current Order Total:</span>
          <span className="running-total-value">
            {runningTotal.toLocaleString()} ETB
          </span>
          <span className="running-total-count">
            ({totalItemCount} {totalItemCount === 1 ? 'item' : 'items'})
          </span>
        </div>
      </div>

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
          dishes={displayedDishes}
          selectedCategory={selectedCategory}
          onAddDish={handleAddDish}
          onRemoveDish={handleRemoveDish}
        />
      )}

      <div className="order-section-container">
        <OrderForm orderTotal={runningTotal} />
      </div>
    </section>
  );
}

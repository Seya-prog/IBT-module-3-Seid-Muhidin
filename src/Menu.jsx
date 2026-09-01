import { useState } from 'react';
import PropTypes from 'prop-types';
import CategoryBar from './CategoryBar';
import Dish from './Dish';
import OrderForm from './OrderForm';

const CATEGORIES = ['All', 'Meat', 'Vegetarian', 'Appetizers', 'Beverages', 'Desserts'];

export default function Menu({ dishes = [] }) {
  // Lifted category state
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Lifted order items & running total
  const [orderItems, setOrderItems] = useState({});

  // Derived filtered dishes list
  const filteredDishes =
    selectedCategory === 'All'
      ? dishes
      : dishes.filter(
          (dish) =>
            dish.category &&
            dish.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  // Derived running order total in ETB
  const runningTotal = Object.values(orderItems).reduce((sum, item) => {
    return sum + (item.price * item.count);
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

  return (
    <section className="menu-section" aria-label="Addis Eats Interactive Menu">
      {/* Category Bar Chips */}
      <CategoryBar
        categories={CATEGORIES}
        selectedCategory={selectedCategory}
        onSelect={(category) => setSelectedCategory(category)}
      />

      {/* Running Order Status Bar */}
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

      {/* Dishes List or Empty State */}
      {filteredDishes.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🍽️</div>
          <h3 className="empty-state-title">No Dishes Found</h3>
          <p className="empty-state-text">
            There are currently no items available in the &ldquo;{selectedCategory}&rdquo; category.
          </p>
        </div>
      ) : (
        <div className="dishes-grid">
          {filteredDishes.map((dish) => (
            <Dish
              key={dish.id}
              id={dish.id}
              name={dish.name}
              price={dish.price}
              currency="ETB"
              spicy={dish.spicy}
              category={dish.category}
              description={dish.description}
              onAddDish={handleAddDish}
              onRemoveDish={handleRemoveDish}
            />
          ))}
        </div>
      )}

      {/* Validated TeleBirr Delivery Form */}
      <div className="order-section-container">
        <OrderForm orderTotal={runningTotal} />
      </div>
    </section>
  );
}

Menu.propTypes = {
  dishes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      spicy: PropTypes.bool,
      category: PropTypes.string,
      description: PropTypes.string,
    })
  ).isRequired,
};

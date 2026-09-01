import PropTypes from 'prop-types';
import Dish from './Dish';

export default function Menu({ dishes = [], selectedCategory = 'All' }) {
  const filteredDishes =
    !selectedCategory || selectedCategory === 'All'
      ? dishes
      : dishes.filter(
          (dish) =>
            dish.category &&
            dish.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <section className="menu-section" aria-label="Menu Items">
      {filteredDishes.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🍽️</div>
          <h3 className="empty-state-title">No Dishes Found</h3>
          <p className="empty-state-text">
            No items available in the &ldquo;{selectedCategory}&rdquo; category.
          </p>
        </div>
      ) : (
        <div className="dishes-grid">
          {filteredDishes.map((dish) => (
            <Dish
              key={dish.id}
              name={dish.name}
              price={dish.price}
              spicy={dish.spicy}
              category={dish.category}
              description={dish.description}
            />
          ))}
        </div>
      )}
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
  selectedCategory: PropTypes.string,
};

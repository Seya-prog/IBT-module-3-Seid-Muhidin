import PropTypes from 'prop-types';
import Dish from './Dish';

export default function DishList({
  dishes = [],
  selectedCategory = 'All',
  onAddDish,
  onRemoveDish,
}) {
  if (dishes.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">🍽️</div>
        <h3 className="empty-state-title">No Dishes Found</h3>
        <p className="empty-state-text">
          There are currently no items available in the &ldquo;{selectedCategory}&rdquo; category.
        </p>
      </div>
    );
  }

  return (
    <div className="dishes-grid">
      {dishes.map((dish) => (
        <Dish
          key={dish.id}
          id={dish.id}
          name={dish.name}
          price={dish.price}
          currency="ETB"
          spicy={dish.spicy}
          category={dish.category}
          description={dish.description}
          onAddDish={onAddDish}
          onRemoveDish={onRemoveDish}
        />
      ))}
    </div>
  );
}

DishList.propTypes = {
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
  onAddDish: PropTypes.func,
  onRemoveDish: PropTypes.func,
};

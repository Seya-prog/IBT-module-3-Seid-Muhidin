import PropTypes from 'prop-types';
import Card from './Card';
import { useCartStore } from './cart/cartStore';

export default function Dish({
  id,
  name,
  price,
  currency = 'ETB',
  spicy = false,
  category = '',
  description = '',
}) {
  // Narrow selectors: only re-render when this specific dish's count changes
  const count = useCartStore((state) => state.items[id]?.count || 0);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);

  const handleIncrement = () => {
    addItem({ id, name, price, category });
  };

  const handleDecrement = () => {
    removeItem(id);
  };

  return (
    <Card className={'dish-card ' + (spicy ? 'dish-card--spicy' : '')}>
      <div className="dish-meta">
        {category ? <span className="dish-category">{category}</span> : <span />}
        {spicy ? (
          <span className="dish-badge dish-badge-spicy">🌶️ Spicy</span>
        ) : null}
      </div>

      <div className="dish-header">
        <h3 className="dish-name">{name}</h3>
        <span className="dish-price">
          {price.toLocaleString()} {currency}
        </span>
      </div>

      {description ? <p className="dish-description">{description}</p> : null}

      <div className="dish-actions">
        {count === 0 ? (
          <button
            type="button"
            className="btn-add-dish"
            onClick={handleIncrement}
          >
            + Add to Order
          </button>
        ) : (
          <div className="dish-counter-controls">
            <button
              type="button"
              className="btn-counter btn-counter-dec"
              onClick={handleDecrement}
              aria-label={'Decrease quantity of ' + name}
            >
              −
            </button>
            <span className="dish-count-display">
              {count} in order
            </span>
            <button
              type="button"
              className="btn-counter btn-counter-inc"
              onClick={handleIncrement}
              aria-label={'Increase quantity of ' + name}
            >
              +
            </button>
          </div>
        )}
      </div>
    </Card>
  );
}

Dish.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  currency: PropTypes.string,
  spicy: PropTypes.bool,
  category: PropTypes.string,
  description: PropTypes.string,
};

import { useState } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

export default function Dish({
  id,
  name,
  price,
  currency = 'ETB',
  spicy = false,
  category = '',
  description = '',
  onAddDish,
  onRemoveDish,
}) {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    const nextCount = count + 1;
    setCount(nextCount);
    if (onAddDish) {
      onAddDish({ id, name, price, count: nextCount });
    }
  };

  const handleDecrement = () => {
    if (count <= 0) return;
    const nextCount = count - 1;
    setCount(nextCount);
    if (onRemoveDish) {
      onRemoveDish({ id, name, price, count: nextCount });
    }
  };

  return (
    <Card className={`dish-card ${Boolean(spicy) ? 'dish-card--spicy' : ''}`}>
      <div className="dish-meta">
        {category ? <span className="dish-category">{category}</span> : <span />}
        {Boolean(spicy) && (
          <span className="dish-badge dish-badge-spicy">🌶️ Spicy</span>
        )}
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
              aria-label={`Decrease quantity of ${name}`}
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
              aria-label={`Increase quantity of ${name}`}
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
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  currency: PropTypes.string,
  spicy: PropTypes.bool,
  category: PropTypes.string,
  description: PropTypes.string,
  onAddDish: PropTypes.func,
  onRemoveDish: PropTypes.func,
};

import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import DishModal from './DishModal';
import { useCartStore } from './cart/cartStore';

function DishComponent({
  id,
  name,
  price,
  currency = 'ETB',
  spicy = false,
  category = '',
  description = '',
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Narrow selector: only re-renders when this specific dish's count changes
  const count = useCartStore((state) => state.items[id]?.count || 0);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);

  const handleIncrement = (e) => {
    e.stopPropagation();
    addItem({ id, name, price, category, spicy, description });
  };

  const handleDecrement = (e) => {
    e.stopPropagation();
    removeItem(id);
  };

  return (
    <>
      <Card className={'dish-card ' + (spicy ? 'dish-card--spicy' : '')}>
        <div className="dish-meta">
          {category ? <span className="dish-category">{category}</span> : <span />}
          {spicy ? <span className="dish-badge dish-badge-spicy">🌶️ Spicy</span> : null}
        </div>

        <div className="dish-header">
          <h3 className="dish-name">{name}</h3>
          <span className="dish-price">
            {price.toLocaleString()} {currency}
          </span>
        </div>

        {description ? <p className="dish-description">{description}</p> : null}

        <div className="dish-card-footer">
          <button
            type="button"
            className="btn-view-details"
            onClick={() => setIsModalOpen(true)}
            aria-label={'View details for ' + name}
          >
            View Details ↗
          </button>

          <div className="dish-actions">
            {count === 0 ? (
              <button
                type="button"
                className="btn-add-dish"
                onClick={handleIncrement}
              >
                + Add
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
                <span className="dish-count-display">{count}</span>
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
        </div>
      </Card>

      {/* Accessible Portal Modal */}
      <DishModal
        dish={{ id, name, price, category, spicy, description }}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

DishComponent.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  currency: PropTypes.string,
  spicy: PropTypes.bool,
  category: PropTypes.string,
  description: PropTypes.string,
};

export const Dish = memo(DishComponent);
export default Dish;

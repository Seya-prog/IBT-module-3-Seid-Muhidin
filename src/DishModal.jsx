import PropTypes from 'prop-types';
import Modal from './ui/Modal';
import { useCartStore } from './cart/cartStore';

export default function DishModal({ dish, isOpen, onClose }) {
  const count = useCartStore((state) => (dish ? state.items[dish.id]?.count || 0 : 0));
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);

  if (!dish) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={dish.name}>
      <div className="dish-modal-content">
        <div className="dish-modal-meta">
          <span className="dish-category">{dish.category}</span>
          {dish.spicy ? <span className="dish-badge dish-badge-spicy">🌶️ Spicy</span> : null}
        </div>

        <p className="dish-modal-description">{dish.description}</p>

        <div className="dish-modal-price-row">
          <span className="dish-modal-price-label">Price per serving:</span>
          <span className="dish-modal-price-value">{dish.price.toLocaleString()} ETB</span>
        </div>

        <div className="dish-modal-actions">
          {count === 0 ? (
            <button
              type="button"
              className="btn-add-dish btn-add-dish--modal"
              onClick={() => addItem(dish)}
            >
              + Add to Order ({dish.price.toLocaleString()} ETB)
            </button>
          ) : (
            <div className="dish-counter-controls dish-counter-controls--modal">
              <button
                type="button"
                className="btn-counter btn-counter-dec"
                onClick={() => removeItem(dish.id)}
                aria-label={'Decrease ' + dish.name}
              >
                −
              </button>
              <span className="dish-count-display">{count} in order</span>
              <button
                type="button"
                className="btn-counter btn-counter-inc"
                onClick={() => addItem(dish)}
                aria-label={'Increase ' + dish.name}
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}

DishModal.propTypes = {
  dish: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    price: PropTypes.number,
    category: PropTypes.string,
    spicy: PropTypes.bool,
    description: PropTypes.string,
  }),
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

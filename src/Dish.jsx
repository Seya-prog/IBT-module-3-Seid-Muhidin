import PropTypes from 'prop-types';
import Card from './Card';

export default function Dish({
  name,
  price,
  currency = '$',
  spicy = false,
  category = '',
  description = '',
}) {
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
          {currency}{typeof price === 'number' ? price.toFixed(2) : price}
        </span>
      </div>

      {description ? (
        <p className="dish-description">{description}</p>
      ) : null}
    </Card>
  );
}

Dish.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  currency: PropTypes.string,
  spicy: PropTypes.bool,
  category: PropTypes.string,
  description: PropTypes.string,
};

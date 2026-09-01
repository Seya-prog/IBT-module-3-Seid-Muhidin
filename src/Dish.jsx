export default function Dish({ name, price, description, category, isSpecial }) {
  const formattedPrice = typeof price === 'number' ? `$${price.toFixed(2)}` : price;

  return (
    <article className={`dish-card ${isSpecial ? 'dish-card--featured' : ''}`}>
      <div className="dish-meta">
        {category && <span className="dish-category">{category}</span>}
        {isSpecial && <span className="dish-badge">Chef's Choice</span>}
      </div>

      <div className="dish-header">
        <h3 className="dish-name">{name}</h3>
        <span className="dish-price">{formattedPrice}</span>
      </div>

      {description && <p className="dish-description">{description}</p>}
    </article>
  );
}

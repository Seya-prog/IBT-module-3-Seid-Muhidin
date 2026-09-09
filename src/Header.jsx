import { useCart } from './cart/CartProvider';

export default function Header() {
  const { total, totalCount } = useCart();

  return (
    <header className="header">
      <div className="header-container">
        <span className="header-tag">Authentic Ethiopian Cuisine</span>
        <h1 className="header-title">Addis Eats</h1>
        <p className="header-subtitle">
          Experience the finest traditional flavors of Addis Ababa, crafted with time-honored recipes and fresh ingredients.
        </p>

        {/* Live Cart Badge in Header */}
        <div className="header-cart-badge" aria-label="Cart summary">
          <span className="header-cart-icon">🛒</span>
          <span className="header-cart-count">{totalCount} {totalCount === 1 ? 'dish' : 'dishes'}</span>
          <span className="header-cart-divider">•</span>
          <span className="header-cart-total">{total.toLocaleString()} ETB</span>
        </div>

        <div className="header-divider">
          <span className="divider-line"></span>
          <span className="divider-icon">◆</span>
          <span className="divider-line"></span>
        </div>
      </div>
    </header>
  );
}

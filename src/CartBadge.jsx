import { useCartStore, selectTotalCount, selectTotal } from './cart/cartStore';

export default function CartBadge() {
  // Narrow selector: only re-renders when totalCount changes
  const totalCount = useCartStore(selectTotalCount);
  const total = useCartStore(selectTotal);

  return (
    <div className="header-cart-badge" aria-label="Cart summary">
      <span className="header-cart-icon">🛒</span>
      <span className="header-cart-count">
        {totalCount} {totalCount === 1 ? 'dish' : 'dishes'}
      </span>
      <span className="header-cart-divider">•</span>
      <span className="header-cart-total">{total.toLocaleString()} ETB</span>
    </div>
  );
}

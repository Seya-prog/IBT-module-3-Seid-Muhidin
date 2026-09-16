import CartBadge from './CartBadge';
import { useAuth } from './auth/useAuth';

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="header">
      <div className="header-container">
        <span className="header-tag">Authentic Ethiopian Cuisine</span>
        <h1 className="header-title">Addis Eats</h1>
        <p className="header-subtitle">
          Experience the finest traditional flavors of Addis Ababa, crafted with time-honored recipes and fresh ingredients.
        </p>

        {user && (
          <div className="header-user-greeting">
            Welcome back, <strong>{user.name}</strong>
          </div>
        )}

        {/* CartBadge with narrow selector */}
        <CartBadge />

        <div className="header-divider">
          <span className="divider-line"></span>
          <span className="divider-icon">◆</span>
          <span className="divider-line"></span>
        </div>
      </div>
    </header>
  );
}

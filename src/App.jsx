import { lazy, Suspense } from 'react';
import Header from './Header';
import Menu from './Menu';
import ErrorBoundary from './ErrorBoundary';
import { AuthProvider } from './auth/AuthProvider';
import './App.css';

// Lazy-loaded heavy checkout route/panel
const Checkout = lazy(() => import('./checkout/Checkout'));

function CheckoutSkeleton() {
  return (
    <div className="checkout-skeleton" aria-busy="true" aria-label="Loading checkout panel">
      <div className="skeleton-line skeleton-title"></div>
      <div className="skeleton-line skeleton-input"></div>
      <div className="skeleton-line skeleton-input"></div>
      <div className="skeleton-line skeleton-btn"></div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <div className="app-layout">
        <Header />

        <main className="menu-container">
          <div className="menu-heading">
            <h2 className="section-title">Our Menu</h2>
            <p className="section-subtitle">
              Authentic delicacies freshly prepared with traditional spices. All entrées served with fresh injera.
            </p>
          </div>

          {/* Error boundary around Menu */}
          <ErrorBoundary
            fallback={
              <div className="error-boundary-fallback" role="alert">
                <h3>⚠️ Menu Unavailable</h3>
                <p>We could not load the menu items. Please refresh or try again later.</p>
              </div>
            }
          >
            <Menu />
          </ErrorBoundary>

          {/* Error boundary around Lazy-loaded Checkout panel */}
          <div className="order-section-container">
            <ErrorBoundary
              fallback={
                <div className="error-boundary-fallback" role="alert">
                  <h3>⚠️ Checkout Unavailable</h3>
                  <p>There was a problem loading the checkout system. Please refresh the page.</p>
                </div>
              }
            >
              <Suspense fallback={<CheckoutSkeleton />}>
                <Checkout />
              </Suspense>
            </ErrorBoundary>
          </div>
        </main>

        <footer className="footer">
          <p>© {new Date().getFullYear()} Addis Eats • Made with React, Vite & Zustand • TeleBirr Delivery</p>
        </footer>
      </div>
    </AuthProvider>
  );
}

import { createContext, useContext, useReducer, useMemo } from 'react';
import PropTypes from 'prop-types';
import { cartReducer, initialCartState } from './cartReducer';

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  // Memoize total and totalCount
  const { total, totalCount } = useMemo(() => {
    const itemsList = Object.values(state.items);
    const calculatedTotal = itemsList.reduce((sum, item) => sum + item.price * item.count, 0);
    const calculatedCount = itemsList.reduce((sum, item) => sum + item.count, 0);
    return { total: calculatedTotal, totalCount: calculatedCount };
  }, [state.items]);

  // Memoize context value to optimize consumer renders
  const value = useMemo(() => ({
    items: state.items,
    dispatch,
    total,
    totalCount,
    addItem: (dish) => dispatch({ type: 'ADD_ITEM', payload: { dish } }),
    removeItem: (id) => dispatch({ type: 'REMOVE_ITEM', payload: { id } }),
    clearCart: () => dispatch({ type: 'CLEAR_CART' }),
  }), [state.items, total, totalCount]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export default CartProvider;

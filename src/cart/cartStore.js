import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set) => ({
      items: {},

      addItem: (dish) =>
        set((state) => {
          const existing = state.items[dish.id];
          const count = existing ? existing.count + 1 : 1;
          return {
            items: {
              ...state.items,
              [dish.id]: {
                id: dish.id,
                name: dish.name,
                price: dish.price,
                category: dish.category,
                count,
              },
            },
          };
        }),

      removeItem: (id) =>
        set((state) => {
          const existing = state.items[id];
          if (!existing) return state;

          const nextItems = { ...state.items };
          if (existing.count <= 1) {
            delete nextItems[id];
          } else {
            nextItems[id] = {
              ...existing,
              count: existing.count - 1,
            };
          }
          return { items: nextItems };
        }),

      clearCart: () => set({ items: {} }),
    }),
    {
      name: 'addis-eats-cart-storage',
    }
  )
);

// Narrow selector helper functions
export const selectTotalCount = (state) =>
  Object.values(state.items).reduce((sum, item) => sum + item.count, 0);

export const selectTotal = (state) =>
  Object.values(state.items).reduce((sum, item) => sum + item.price * item.count, 0);

export const selectDishCount = (id) => (state) => state.items[id]?.count || 0;

export default useCartStore;

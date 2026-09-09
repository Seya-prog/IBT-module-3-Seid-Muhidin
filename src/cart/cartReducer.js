export const initialCartState = {
  items: {},
};

export function cartReducer(state = initialCartState, action) {
  switch (action.type) {
    case 'ADD_ITEM':
    case 'add': {
      const dish = action.payload?.dish || action.payload || action.dish;
      if (!dish || !dish.id) return state;
      const existing = state.items[dish.id];
      const count = existing ? existing.count + 1 : 1;
      return {
        ...state,
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
    }
    case 'REMOVE_ITEM':
    case 'remove': {
      const id = action.payload?.id || action.payload || action.id;
      if (!id) return state;
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
      return {
        ...state,
        items: nextItems,
      };
    }
    case 'CLEAR_CART':
    case 'clear': {
      return {
        ...state,
        items: {},
      };
    }
    default:
      return state;
  }
}

export default cartReducer;

import { ActionTypes, CartType } from '@/types/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const INITIAL_STATE = {
  products: [],
  totalItems: 0,
  totalPrice: 0,
};

export const useCartStore = create(
  persist<CartType & ActionTypes>(
    (set, get) => ({
      products: INITIAL_STATE.products,
      totalItems: INITIAL_STATE.totalItems,
      totalPrice: INITIAL_STATE.totalPrice,
      addToCart(item) {
        set((state) => ({
          products: [...state.products, item],
          totalItems: state.totalItems + item.quantity,
          totalPrice: state.totalPrice + item.price,
        }));
      },
      removeFromCart(item) {
        const indexOfItemToRemove = get().products.findIndex(
          (product) => product.id === item.id
        );
        if (indexOfItemToRemove !== -1) {
          const updatedProducts = [...get().products];
          const removedItem = updatedProducts.splice(indexOfItemToRemove, 1)[0];

          set((state) => ({
            products: updatedProducts,
            totalItems: state.totalItems - removedItem.quantity,
            totalPrice: state.totalPrice - removedItem.price,
          }));
        }
      },
    }),
    { name: 'cart', skipHydration: true }
  )
);

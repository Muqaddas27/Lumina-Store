
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product, User, UserRole, Order } from '../types';
import { MOCK_USER } from '../lib/constants';

interface AppState {
  user: User | null;
  cart: CartItem[];
  orders: Order[];
  wishlist: Product[];
  isCartOpen: boolean;
  
  // Auth actions
  login: (email: string) => void;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  
  // Cart actions
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  
  // Wishlist actions
  toggleWishlist: (product: Product) => void;
  
  // Order actions
  placeOrder: (order: Order) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      cart: [],
      orders: [],
      wishlist: [],
      isCartOpen: false,

      login: (email: string) => set({ user: { ...MOCK_USER, email } }),
      logout: () => set({ user: null }),
      updateProfile: (updates) => set((state) => ({
        user: state.user ? { ...state.user, ...updates } : null,
      })),

      addToCart: (product) => set((state) => {
        const existingItem = state.cart.find((item) => item.id === product.id);
        if (existingItem) {
          return {
            cart: state.cart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          };
        }
        return { cart: [...state.cart, { ...product, quantity: 1 }] };
      }),

      removeFromCart: (productId) => set((state) => ({
        cart: state.cart.filter((item) => item.id !== productId),
      })),

      updateQuantity: (productId, quantity) => set((state) => ({
        cart: state.cart.map((item) =>
          item.id === productId ? { ...item, quantity: Math.max(0, quantity) } : item
        ).filter(item => item.quantity > 0),
      })),

      clearCart: () => set({ cart: [] }),
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

      toggleWishlist: (product) => set((state) => {
        const exists = state.wishlist.find(p => p.id === product.id);
        if (exists) {
          return { wishlist: state.wishlist.filter(p => p.id !== product.id) };
        }
        return { wishlist: [...state.wishlist, product] };
      }),

      placeOrder: (order) => set((state) => ({
        orders: [order, ...state.orders],
        cart: [],
      })),
    }),
    {
      name: 'lumina-storage-v2',
    }
  )
);

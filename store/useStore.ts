
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product, User, UserRole, Order } from '../types';
import { MOCK_USER, INITIAL_PRODUCTS } from '../lib/constants';

// Mock orders for admin dashboard
const MOCK_ORDERS: Order[] = [
  {
    id: 'LUM-5421',
    userId: MOCK_USER.id,
    items: [
      { ...INITIAL_PRODUCTS[0], quantity: 2 },
      { ...INITIAL_PRODUCTS[1], quantity: 1 },
    ],
    total: INITIAL_PRODUCTS[0].price * 2 + INITIAL_PRODUCTS[1].price,
    status: 'PROCESSING',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    paymentMethod: 'credit_card',
    shippingAddress: {
      fullName: 'Ahmed Hassan',
      street: '123 Main Street',
      city: 'Karachi',
      zipCode: '75500',
      country: 'Pakistan',
    },
  },
  {
    id: 'LUM-5420',
    userId: 'user-2',
    items: [
      { ...INITIAL_PRODUCTS[2], quantity: 1 },
    ],
    total: INITIAL_PRODUCTS[2].price,
    status: 'DELIVERED',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    paymentMethod: 'debit_card',
    shippingAddress: {
      fullName: 'Fatima Khan',
      street: '456 Oak Avenue',
      city: 'Lahore',
      zipCode: '54000',
      country: 'Pakistan',
    },
  },
  {
    id: 'LUM-5419',
    userId: 'user-3',
    items: [
      { ...INITIAL_PRODUCTS[3], quantity: 3 },
    ],
    total: INITIAL_PRODUCTS[3].price * 3,
    status: 'SHIPPED',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    paymentMethod: 'credit_card',
    shippingAddress: {
      fullName: 'Ali Raza',
      street: '789 Elm Street',
      city: 'Islamabad',
      zipCode: '44000',
      country: 'Pakistan',
    },
  },
  {
    id: 'LUM-5418',
    userId: 'user-4',
    items: [
      { ...INITIAL_PRODUCTS[4], quantity: 1 },
      { ...INITIAL_PRODUCTS[5], quantity: 2 },
    ],
    total: INITIAL_PRODUCTS[4].price + INITIAL_PRODUCTS[5].price * 2,
    status: 'PENDING',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    paymentMethod: 'credit_card',
    shippingAddress: {
      fullName: 'Zainab Ahmed',
      street: '321 Pine Road',
      city: 'Rawalpindi',
      zipCode: '46000',
      country: 'Pakistan',
    },
  },
  {
    id: 'LUM-5417',
    userId: 'user-5',
    items: [
      { ...INITIAL_PRODUCTS[6], quantity: 1 },
    ],
    total: INITIAL_PRODUCTS[6].price,
    status: 'DELIVERED',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    paymentMethod: 'debit_card',
    shippingAddress: {
      fullName: 'Hassan Malik',
      street: '654 Maple Lane',
      city: 'Multan',
      zipCode: '60000',
      country: 'Pakistan',
    },
  },
];

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
      orders: MOCK_ORDERS,
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


import { Product, Category, User, UserRole } from '../types';
import { PRODUCT_CATALOG } from './products-data';

export const CATEGORIES: Category[] = [
  { id: '1', name: 'Electronics', slug: 'electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=800' },
  { id: '2', name: 'Fashion', slug: 'fashion', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=800' },
  { id: '3', name: 'Home & Living', slug: 'home', image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&q=80&w=800' },
  { id: '4', name: 'Accessories', slug: 'accessories', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800' },
  { id: '5', name: 'Food', slug: 'food', image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=800' },
];

// Large product catalog with 180 products across all categories
// 30 Electronics, 30 Fashion, 30 Home & Living, 30 Accessories, 60 Food
export const INITIAL_PRODUCTS: Product[] = PRODUCT_CATALOG;

export const MOCK_USER: User = {
  id: 'u1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  role: UserRole.ADMIN,
  image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};

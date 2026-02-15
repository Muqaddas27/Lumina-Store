
import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { INITIAL_PRODUCTS } from '../lib/constants';
import { Product } from '../types';
import SafeImage from '../components/SafeImage';

const AdminView: React.FC = () => {
  const { user } = useStore();
  const location = useLocation();

  if (user?.role !== 'ADMIN') {
    return (
      <div className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-6 py-20 text-center">
        <h2 className="text-2xl font-bold text-red-600">Access Denied</h2>
        <p className="text-gray-500 mt-2">You need administrator privileges to view this page.</p>
        <Link to="/" className="text-indigo-600 mt-4 block underline">Return to Shop</Link>
      </div>
    );
  }

  const navItems = [
    { label: 'Overview', path: '/admin' },
    { label: 'Products', path: '/admin/products' },
    { label: 'Orders', path: '/admin/orders' },
    { label: 'Customers', path: '/admin/users' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-6 py-10 overflow-x-hidden">
      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        {/* Sidebar */}
        <nav className="w-full md:w-64 space-y-2 flex-shrink-0">
          <h2 className="text-xs sm:text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest px-4 mb-4">Admin Console</h2>
          {navItems.map((item) => (
            <Link 
              key={item.path}
              to={item.path}
              className={`block px-4 py-3 rounded-xl font-medium transition-all ${location.pathname === item.path ? 'bg-indigo-600 dark:bg-indigo-700 text-white shadow-lg' : 'text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-700 hover:text-indigo-600 dark:hover:text-indigo-400'}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Content */}
        <div className="flex-1 bg-white dark:bg-gray-800 rounded-2xl md:rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 md:p-8 min-h-[600px]">
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/products" element={<AdminProducts />} />
            <Route path="/orders" element={<AdminOrders />} />
            <Route path="/users" element={<AdminCustomers />} />
            <Route path="*" element={<div className="py-20 text-center text-gray-500 dark:text-gray-400 italic">This module is coming soon in the next update.</div>} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const stats = [
    { label: 'Total Revenue', value: '$24,560', change: '+12%', color: 'bg-green-100 text-green-700' },
    { label: 'Active Orders', value: '142', change: '+5%', color: 'bg-indigo-100 text-indigo-700' },
    { label: 'New Customers', value: '28', change: '+18%', color: 'bg-blue-100 text-blue-700' },
    { label: 'Stock Alerts', value: '4', change: '-2%', color: 'bg-red-100 text-red-700' }
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((s, idx) => (
          <div key={idx} className="p-6 rounded-2xl border border-gray-100 bg-gray-50">
            <p className="text-sm font-medium text-gray-500">{s.label}</p>
            <div className="flex items-baseline justify-between mt-2">
              <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${s.color}`}>{s.change}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="border border-gray-100 rounded-2xl p-6 bg-gray-50">
        <h3 className="font-bold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[1,2,3].map(i => (
            <div key={i} className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold">New order #LUM-5421</p>
                  <p className="text-xs text-gray-500">2 minutes ago</p>
                </div>
              </div>
              <span className="text-sm font-bold text-gray-900">$129.00</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AdminProducts = () => {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  const handleDelete = (productId: string) => {
    setProducts(products.filter(p => p.id !== productId));
    setDeleteConfirm(null);
    alert('Product deleted successfully!');
  };

  const handleEditSave = (updatedProduct: Product) => {
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    setEditingProduct(null);
    alert('Product updated successfully!');
  };

  const handleAddProduct = (newProduct: Product) => {
    setProducts([newProduct, ...products]);
    setIsAddingProduct(false);
    alert('Product added successfully!');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Manage Inventory</h1>
        <button 
          onClick={() => setIsAddingProduct(true)}
          className="px-4 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 shadow-sm transition-colors"
        >
          + Add Product
        </button>
      </div>

      {isAddingProduct && (
        <ProductAddModal onSave={handleAddProduct} onClose={() => setIsAddingProduct(false)} />
      )}

      {editingProduct && (
        <ProductEditModal product={editingProduct} onSave={handleEditSave} onClose={() => setEditingProduct(null)} />
      )}

      {deleteConfirm && (
        <DeleteConfirmDialog 
          productId={deleteConfirm}
          onConfirm={() => handleDelete(deleteConfirm)}
          onCancel={() => setDeleteConfirm(null)}
        />
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="py-4 font-bold text-sm text-gray-500 uppercase tracking-wider">Product</th>
              <th className="py-4 font-bold text-sm text-gray-500 uppercase tracking-wider">Category</th>
              <th className="py-4 font-bold text-sm text-gray-500 uppercase tracking-wider">Stock</th>
              <th className="py-4 font-bold text-sm text-gray-500 uppercase tracking-wider">Price</th>
              <th className="py-4 font-bold text-sm text-gray-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-4">
                  <div className="flex items-center space-x-3">
                    <SafeImage src={p.images[0]} className="w-10 h-10 rounded-lg object-cover" alt={p.name} />
                    <span className="font-bold text-sm">{p.name}</span>
                  </div>
                </td>
                <td className="py-4 text-sm capitalize">{p.category}</td>
                <td className="py-4">
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${p.stock < 10 ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                    {p.stock} units
                  </span>
                </td>
                <td className="py-4 font-bold text-sm">${p.price}</td>
                <td className="py-4 text-right space-x-2">
                  <button 
                    onClick={() => setEditingProduct(p)}
                    className="p-2 text-gray-400 hover:text-indigo-600 transition-colors"
                    title="Edit Product"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button 
                    onClick={() => setDeleteConfirm(p.id)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    title="Delete Product"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Product Images Options with working URLs
const PRODUCT_IMAGES: Record<string, { name: string; url: string }[]> = {
  electronics: [
    { name: 'Laptop', url: 'https://via.placeholder.com/500x500/1a1a2e/ffffff?text=Laptop' },
    { name: 'Smartphone', url: 'https://via.placeholder.com/500x500/16213e/ffffff?text=Smartphone' },
    { name: 'Headphones', url: 'https://via.placeholder.com/500x500/0f3460/ffffff?text=Headphones' },
    { name: 'Tablet', url: 'https://via.placeholder.com/500x500/e94560/ffffff?text=Tablet' },
    { name: 'Camera', url: 'https://via.placeholder.com/500x500/533483/ffffff?text=Camera' },
  ],
  fashion: [
    { name: 'T-Shirt', url: 'https://via.placeholder.com/500x500/ff6b6b/ffffff?text=T-Shirt' },
    { name: 'Jeans', url: 'https://via.placeholder.com/500x500/4ecdc4/ffffff?text=Jeans' },
    { name: 'Dress', url: 'https://via.placeholder.com/500x500/ffe66d/000000?text=Dress' },
    { name: 'Sneakers', url: 'https://via.placeholder.com/500x500/95e1d3/ffffff?text=Sneakers' },
    { name: 'Jacket', url: 'https://via.placeholder.com/500x500/f38181/ffffff?text=Jacket' },
  ],
  home: [
    { name: 'Lamp', url: 'https://via.placeholder.com/500x500/aa96da/ffffff?text=Lamp' },
    { name: 'Sofa', url: 'https://via.placeholder.com/500x500/fcbad3/ffffff?text=Sofa' },
    { name: 'Bedding', url: 'https://via.placeholder.com/500x500/ffffd2/000000?text=Bedding' },
    { name: 'Kitchenware', url: 'https://via.placeholder.com/500x500/a8dadc/ffffff?text=Kitchen' },
    { name: 'Decoration', url: 'https://via.placeholder.com/500x500/f1faee/000000?text=Decor' },
  ],
  sports: [
    { name: 'Running Shoes', url: 'https://via.placeholder.com/500x500/e63946/ffffff?text=Running' },
    { name: 'Yoga Mat', url: 'https://via.placeholder.com/500x500/a8dadc/000000?text=Yoga' },
    { name: 'Dumbbell', url: 'https://via.placeholder.com/500x500/457b9d/ffffff?text=Dumbbell' },
    { name: 'Bicycle', url: 'https://via.placeholder.com/500x500/1d3557/ffffff?text=Bicycle' },
    { name: 'Football', url: 'https://via.placeholder.com/500x500/f77f00/ffffff?text=Football' },
  ],
  books: [
    { name: 'Fiction Book', url: 'https://via.placeholder.com/500x500/d62828/ffffff?text=Fiction' },
    { name: 'Tech Book', url: 'https://via.placeholder.com/500x500/f77f00/ffffff?text=Tech' },
    { name: 'Self-Help', url: 'https://via.placeholder.com/500x500/fcbf49/000000?text=Self-Help' },
    { name: 'Novel', url: 'https://via.placeholder.com/500x500/06a77d/ffffff?text=Novel' },
    { name: 'Educational', url: 'https://via.placeholder.com/500x500/003049/ffffff?text=Education' },
  ],
};

// Product Add Modal Component
const ProductAddModal: React.FC<{
  onSave: (product: Product) => void;
  onClose: () => void;
}> = ({ onSave, onClose }) => {
  const [formData, setFormData] = useState<Partial<Product>>({
    id: `prod-${Date.now()}`,
    name: '',
    slug: '',
    description: '',
    price: 0,
    category: 'electronics',
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop'],
    stock: 0,
    rating: 0,
    reviewsCount: 0,
    isFeatured: false,
  });

  const [imageUrl, setImageUrl] = useState('https://via.placeholder.com/500x500/1a1a2e/ffffff?text=Laptop');
  const currentCategory = (formData.category as string) || 'electronics';
  const availableImages = PRODUCT_IMAGES[currentCategory] || PRODUCT_IMAGES.electronics;
  const [showUploadTab, setShowUploadTab] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setImageUrl(result);
        setFormData(prev => ({
          ...prev,
          images: [result]
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? parseFloat(value) : value
    }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value;
    setFormData(prev => ({
      ...prev,
      category: newCategory
    }));
    // Reset image to first option of new category
    const defaultImage = PRODUCT_IMAGES[newCategory]?.[0]?.url || PRODUCT_IMAGES.electronics[0].url;
    setImageUrl(defaultImage);
  };

  const handleImageSelect = (newUrl: string) => {
    setImageUrl(newUrl);
    setFormData(prev => ({
      ...prev,
      images: [newUrl]
    }));
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setFormData(prev => ({
      ...prev,
      name,
      slug: generateSlug(name)
    }));
  };

  const handleSave = () => {
    if (!formData.name || !formData.description || formData.price === undefined || formData.stock === undefined) {
      alert('Please fill in all required fields');
      return;
    }

    const productToSave: Product = {
      id: formData.id || `prod-${Date.now()}`,
      name: formData.name,
      slug: formData.slug || generateSlug(formData.name),
      description: formData.description,
      price: formData.price,
      category: formData.category || 'electronics',
      images: formData.images || [imageUrl],
      stock: formData.stock,
      rating: 0,
      reviewsCount: 0,
      isFeatured: false,
    };

    onSave(productToSave);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Add New Product</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Product Name *</label>
            <input 
              type="text" 
              name="name"
              value={formData.name || ''}
              onChange={handleNameChange}
              placeholder="Enter product name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Category</label>
            <select
              name="category"
              value={formData.category || 'electronics'}
              onChange={handleCategoryChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            >
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="home">Home</option>
              <option value="sports">Sports</option>
              <option value="books">Books</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Price *</label>
            <input 
              type="number" 
              name="price"
              value={formData.price || ''}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Stock Quantity *</label>
            <input 
              type="number" 
              name="stock"
              value={formData.stock || ''}
              onChange={handleChange}
              placeholder="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Product Image</label>
            <div className="space-y-2">
              {imageUrl && (
                <SafeImage src={imageUrl} alt="Preview" className="w-full h-40 object-cover rounded-lg border border-gray-300 dark:border-gray-600" />
              )}
              
              {/* Tab Buttons */}
              <div className="flex gap-2 mb-2">
                <button
                  onClick={() => setShowUploadTab(false)}
                  className={`flex-1 py-2 px-3 rounded-lg font-bold text-sm transition-colors ${!showUploadTab ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                >
                  Gallery
                </button>
                <button
                  onClick={() => setShowUploadTab(true)}
                  className={`flex-1 py-2 px-3 rounded-lg font-bold text-sm transition-colors ${showUploadTab ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                >
                  Upload
                </button>
              </div>

              {/* Gallery Tab */}
              {!showUploadTab && (
                <select 
                  value={imageUrl}
                  onChange={(e) => handleImageSelect(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                >
                  {availableImages.map((img) => (
                    <option key={img.url} value={img.url}>{img.name}</option>
                  ))}
                </select>
              )}

              {/* Upload Tab */}
              {showUploadTab && (
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <label className="block">
                    <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400 cursor-pointer hover:underline">Click to upload image</span>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Description *</label>
            <textarea 
              name="description"
              value={formData.description || ''}
              onChange={handleChange}
              placeholder="Enter product description"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            />
          </div>
        </div>

        <div className="flex gap-2 justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-bold"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-bold"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

// Product Edit Modal Component
const ProductEditModal: React.FC<{
  product: Product;
  onSave: (product: Product) => void;
  onClose: () => void;
}> = ({ product, onSave, onClose }) => {
  const [formData, setFormData] = useState(product);
  const [imageUrl, setImageUrl] = useState(product.images[0] || '');
  const [showUploadTab, setShowUploadTab] = useState(false);
  const currentCategory = formData.category || 'electronics';
  const availableImages = PRODUCT_IMAGES[currentCategory] || PRODUCT_IMAGES.electronics;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? parseFloat(value) : value
    }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value;
    setFormData(prev => ({
      ...prev,
      category: newCategory
    }));
    // Auto-select first image of new category
    const defaultImage = PRODUCT_IMAGES[newCategory]?.[0]?.url || PRODUCT_IMAGES.electronics[0].url;
    setImageUrl(defaultImage);
    setFormData(prev => ({
      ...prev,
      images: [defaultImage]
    }));
  };

  const handleImageSelect = (newUrl: string) => {
    setImageUrl(newUrl);
    setFormData(prev => ({
      ...prev,
      images: [newUrl]
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        setImageUrl(dataUrl);
        setFormData(prev => ({
          ...prev,
          images: [dataUrl]
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Edit Product</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Product Name</label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Price</label>
            <input 
              type="number" 
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Category</label>
            <select
              name="category"
              value={formData.category || 'electronics'}
              onChange={handleCategoryChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            >
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="home">Home</option>
              <option value="sports">Sports</option>
              <option value="books">Books</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Stock</label>
            <input 
              type="number" 
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Product Image</label>
            <div className="space-y-2">
              {imageUrl && (
                <SafeImage src={imageUrl} alt="Preview" className="w-full h-40 object-cover rounded-lg border border-gray-300 dark:border-gray-600" />
              )}
              
              {/* Tab Buttons */}
              <div className="flex gap-2 mb-2">
                <button
                  onClick={() => setShowUploadTab(false)}
                  className={`flex-1 py-2 px-3 rounded-lg font-bold text-sm transition-colors ${!showUploadTab ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                >
                  Gallery
                </button>
                <button
                  onClick={() => setShowUploadTab(true)}
                  className={`flex-1 py-2 px-3 rounded-lg font-bold text-sm transition-colors ${showUploadTab ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                >
                  Upload
                </button>
              </div>

              {/* Gallery Tab */}
              {!showUploadTab && (
                <select 
                  value={imageUrl}
                  onChange={(e) => handleImageSelect(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                >
                  {availableImages.map((img) => (
                    <option key={img.url} value={img.url}>{img.name}</option>
                  ))}
                </select>
              )}

              {/* Upload Tab */}
              {showUploadTab && (
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <label className="block">
                    <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400 cursor-pointer hover:underline">Click to upload image</span>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Description</label>
            <textarea 
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            />
          </div>
        </div>

        <div className="flex gap-2 justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={() => onSave(formData)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-bold"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

// Delete Confirmation Dialog
const DeleteConfirmDialog: React.FC<{
  productId: string;
  onConfirm: () => void;
  onCancel: () => void;
}> = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-sm w-full p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Delete Product?</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">This action cannot be undone. Are you sure you want to delete this product?</p>

        <div className="flex gap-2 justify-end">
          <button 
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-bold"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-bold"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const AdminOrders = () => {
  const { orders } = useStore();
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [editingOrder, setEditingOrder] = useState<any>(null);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      PENDING: 'bg-yellow-50 text-yellow-700',
      PROCESSING: 'bg-blue-50 text-blue-700',
      SHIPPED: 'bg-indigo-50 text-indigo-700',
      DELIVERED: 'bg-green-50 text-green-700',
      CANCELLED: 'bg-red-50 text-red-700',
    };
    return colors[status] || 'bg-gray-50 text-gray-700';
  };

  const handleStatusChange = (newStatus: string) => {
    if (editingOrder) {
      setEditingOrder({ ...editingOrder, status: newStatus });
      alert(`Order status updated to ${newStatus}`);
      setEditingOrder(null);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
        <div className="flex gap-2">
          <select className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium">
            <option>All Status</option>
            <option>Pending</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
        </div>
      </div>

      {selectedOrder && (
        <OrderDetailsModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
      )}

      {editingOrder && (
        <OrderEditModal 
          order={editingOrder} 
          onStatusChange={handleStatusChange}
          onClose={() => setEditingOrder(null)} 
        />
      )}

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No orders yet</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="py-4 font-bold text-sm text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="py-4 font-bold text-sm text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="py-4 font-bold text-sm text-gray-500 uppercase tracking-wider">Items</th>
                <th className="py-4 font-bold text-sm text-gray-500 uppercase tracking-wider">Total</th>
                <th className="py-4 font-bold text-sm text-gray-500 uppercase tracking-wider">Status</th>
                <th className="py-4 font-bold text-sm text-gray-500 uppercase tracking-wider">Date</th>
                <th className="py-4 font-bold text-sm text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 font-bold text-sm text-indigo-600">{order.id}</td>
                  <td className="py-4 text-sm">{order.shippingAddress?.fullName || 'N/A'}</td>
                  <td className="py-4 text-sm">{order.items.length} items</td>
                  <td className="py-4 font-bold text-sm">${order.total.toFixed(2)}</td>
                  <td className="py-4">
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 text-sm text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="py-4 text-right space-x-2">
                    <button 
                      onClick={() => setSelectedOrder(order)}
                      className="p-2 text-gray-400 hover:text-indigo-600 transition-colors" 
                      title="View Details"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => setEditingOrder(order)}
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors" 
                      title="Edit Order"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// Order Details Modal
const OrderDetailsModal: React.FC<{ order: any; onClose: () => void }> = ({ order, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Order Details - {order.id}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Order Status</p>
              <p className="text-lg font-bold text-gray-900 dark:text-gray-100">{order.status}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Amount</p>
              <p className="text-lg font-bold text-gray-900 dark:text-gray-100">${order.total.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Payment Method</p>
              <p className="text-lg font-bold text-gray-900 dark:text-gray-100 capitalize">{order.paymentMethod.replace('_', ' ')}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Order Date</p>
              <p className="text-lg font-bold text-gray-900 dark:text-gray-100">{new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Shipping Address</h3>
            <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg text-sm text-gray-700 dark:text-gray-300">
              <p className="font-bold">{order.shippingAddress.fullName}</p>
              <p>{order.shippingAddress.street}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.zipCode}</p>
              <p>{order.shippingAddress.country}</p>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Items ({order.items.length})</h3>
            <div className="space-y-2">
              {order.items.map((item: any) => (
                <div key={item.id} className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <SafeImage src={item.images[0]} alt={item.name} className="w-8 h-8 rounded object-cover" />
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{item.name}</p>
                      <p className="text-xs text-gray-500">x{item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-bold text-sm text-gray-900 dark:text-gray-100">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-bold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Order Edit Modal
const OrderEditModal: React.FC<{ 
  order: any; 
  onStatusChange: (status: string) => void;
  onClose: () => void 
}> = ({ order, onStatusChange, onClose }) => {
  const [newStatus, setNewStatus] = useState(order.status);

  const statuses = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Update Order Status</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-2">Current Status: <span className="font-bold text-gray-900 dark:text-gray-100">{order.status}</span></p>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">New Status</label>
          <select 
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600"
          >
            {statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-2 justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-bold"
          >
            Cancel
          </button>
          <button 
            onClick={() => onStatusChange(newStatus)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-bold"
          >
            Update Status
          </button>
        </div>
      </div>
    </div>
  );
};

const AdminCustomers = () => {
  const { orders, user } = useStore();
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [messagingCustomer, setMessagingCustomer] = useState<any>(null);

  // Simulate customer list from orders
  const uniqueCustomers = Array.from(new Map(
    orders.map(order => [
      order.userId,
      {
        id: order.userId,
        name: order.shippingAddress?.fullName || 'Unknown',
        email: 'customer@example.com',
        totalOrders: orders.filter(o => o.userId === order.userId).length,
        totalSpent: orders.filter(o => o.userId === order.userId).reduce((sum, o) => sum + o.total, 0),
        joinDate: order.createdAt,
      }
    ])
  ).values());

  // Add current user as a sample customer if logged in
  const customerList = user && !uniqueCustomers.find(c => c.id === user.id) 
    ? [{
        id: user.id,
        name: user.name || 'Guest',
        email: user.email,
        totalOrders: 0,
        totalSpent: 0,
        joinDate: new Date().toISOString(),
      }, ...uniqueCustomers]
    : uniqueCustomers;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Customer Management</h1>
        <div className="flex gap-2">
          <input 
            type="text"
            placeholder="Search customers..."
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium placeholder-gray-400"
          />
        </div>
      </div>

      {selectedCustomer && (
        <CustomerProfileModal customer={selectedCustomer} onClose={() => setSelectedCustomer(null)} />
      )}

      {messagingCustomer && (
        <SendMessageModal customer={messagingCustomer} onClose={() => setMessagingCustomer(null)} />
      )}

      {customerList.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No customers yet</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="py-4 font-bold text-sm text-gray-500 uppercase tracking-wider">Customer Name</th>
                <th className="py-4 font-bold text-sm text-gray-500 uppercase tracking-wider">Email</th>
                <th className="py-4 font-bold text-sm text-gray-500 uppercase tracking-wider">Total Orders</th>
                <th className="py-4 font-bold text-sm text-gray-500 uppercase tracking-wider">Total Spent</th>
                <th className="py-4 font-bold text-sm text-gray-500 uppercase tracking-wider">Join Date</th>
                <th className="py-4 font-bold text-sm text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {customerList.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                        {customer.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
                      </div>
                      <span className="font-bold text-sm">{customer.name}</span>
                    </div>
                  </td>
                  <td className="py-4 text-sm text-gray-600">{customer.email}</td>
                  <td className="py-4">
                    <span className="text-sm font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-700">
                      {customer.totalOrders}
                    </span>
                  </td>
                  <td className="py-4 font-bold text-sm">${customer.totalSpent.toFixed(2)}</td>
                  <td className="py-4 text-sm text-gray-600">{new Date(customer.joinDate).toLocaleDateString()}</td>
                  <td className="py-4 text-right space-x-2">
                    <button 
                      onClick={() => setSelectedCustomer(customer)}
                      className="p-2 text-gray-400 hover:text-indigo-600 transition-colors" 
                      title="View Profile"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => setMessagingCustomer(customer)}
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors" 
                      title="Send Message"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// Customer Profile Modal
const CustomerProfileModal: React.FC<{ customer: any; onClose: () => void }> = ({ customer, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Customer Profile</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
            {customer.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">{customer.name}</h3>
          <p className="text-sm text-gray-500">{customer.email}</p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{customer.totalOrders}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Total Spent</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">${customer.totalSpent.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-1">Join Date</p>
          <p className="text-gray-900 dark:text-gray-100 font-bold">{new Date(customer.joinDate).toLocaleDateString()}</p>
        </div>

        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-bold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Send Message Modal
const SendMessageModal: React.FC<{ customer: any; onClose: () => void }> = ({ customer, onClose }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      alert(`Message sent to ${customer.name}!`);
      setMessage('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Send Message</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">To: <span className="font-bold text-gray-900 dark:text-gray-100">{customer.name}</span></p>
          <p className="text-xs text-gray-500">{customer.email}</p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Message</label>
          <textarea 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          />
        </div>

        <div className="flex gap-2 justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-bold"
          >
            Cancel
          </button>
          <button 
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-bold"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminView;



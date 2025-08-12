import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { AxiosError } from 'axios';
import Toast from '../components/Toast';
import { fetchMenu, addMenuItem, updateMenuItem, deleteMenuItem } from '../lib/api';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
}

interface ToastState {
  message: string;
  type: 'success' | 'error';
}

interface ApiError {
  error: string;
}

export default function Admin() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [newItem, setNewItem] = useState({ name: '', description: '', price: 0 });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastState | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    fetchMenu()
      .then(data => setMenuItems(data))
      .catch((err: unknown) => {
        const errorMsg = err instanceof AxiosError && err.response?.data?.error 
          ? err.response.data.error 
          : 'Failed to load menu items';
        setError(errorMsg);
        setToast({ message: errorMsg, type: 'error' });
        router.push('/login');
      });
  }, []);

  const handleAdd = async () => {
    try {
      const res = await addMenuItem(newItem);
      setMenuItems([...menuItems, res]);
      setNewItem({ name: '', description: '', price: 0 });
      setError(null);
      setToast({ message: 'Menu item added successfully!', type: 'success' });
    } catch (err: unknown) {
      const errorMsg = err instanceof AxiosError && err.response?.data?.error 
        ? err.response.data.error 
        : 'Failed to add item';
      setError(errorMsg);
      setToast({ message: errorMsg, type: 'error' });
    }
  };

  const handleUpdate = async (id: number) => {
    const confirm = window.confirm(`Are you sure you want to update ${newItem.name}?`);
    if (!confirm) return;

    try {
      const res = await updateMenuItem(id, newItem);
      setMenuItems(menuItems.map(item => (item.id === id ? res : item)));
      setEditingId(null);
      setNewItem({ name: '', description: '', price: 0 });
      setError(null);
      setToast({ message: 'Menu item updated successfully!', type: 'success' });
    } catch (err: unknown) {
      const errorMsg = err instanceof AxiosError && err.response?.data?.error 
        ? err.response.data.error 
        : 'Failed to update item';
      setError(errorMsg);
      setToast({ message: errorMsg, type: 'error' });
    }
  };

  const handleDelete = async (id: number, name: string) => {
    const confirm = window.confirm(`Are you sure you want to delete ${name}?`);
    if (!confirm) return;

    try {
      await deleteMenuItem(id);
      setMenuItems(menuItems.filter(item => item.id !== id));
      setError(null);
      setToast({ message: 'Menu item deleted successfully!', type: 'success' });
    } catch (err: unknown) {
      const errorMsg = err instanceof AxiosError && err.response?.data?.error 
        ? err.response.data.error 
        : 'Failed to delete item';
      setError(errorMsg);
      setToast({ message: errorMsg, type: 'error' });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToast({ message: 'Logged out successfully!', type: 'success' });
    router.push('/login');
  };

  const startEdit = (item: MenuItem) => {
    setEditingId(item.id);
    setNewItem({ name: item.name, description: item.description, price: item.price });
    setError(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-cosmic to-stardust p-6 sm:p-8"
    >
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-6 sm:p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-cosmic">Manage Menu Items</h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-400 transition-colors"
          >
            Logout
          </motion.button>
        </div>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <input
            value={newItem.name}
            onChange={e => setNewItem({ ...newItem, name: e.target.value })}
            placeholder="Item Name (e.g., Doro Wat)"
            className="p-3 rounded bg-gray-100 text-black focus:ring-2 focus:ring-nebula focus:outline-none"
          />
          <input
            value={newItem.description}
            onChange={e => setNewItem({ ...newItem, description: e.target.value })}
            placeholder="Description (e.g., Spicy chicken stew)"
            className="p-3 rounded bg-gray-100 text-black focus:ring-2 focus:ring-nebula focus:outline-none"
          />
          <input
            value={newItem.price || ''}
            onChange={e => setNewItem({ ...newItem, price: parseFloat(e.target.value) || 0 })}
            placeholder="Price (e.g., 18.00)"
            type="number"
            step="0.01"
            className="p-3 rounded bg-gray-100 text-black focus:ring-2 focus:ring-nebula focus:outline-none"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={editingId ? () => handleUpdate(editingId) : handleAdd}
            className="sm:col-span-2 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-400 transition-colors"
          >
            {editingId ? 'Update Item' : 'Add Item'}
          </motion.button>
        </div>
        <ul className="space-y-4">
          {menuItems.map(item => (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-gray-50 rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <div className="mb-2 sm:mb-0">
                <span className="font-semibold text-cosmic">{item.name}</span> - ${item.price.toFixed(2)}
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => startEdit(item)}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDelete(item.id, item.name)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </motion.button>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
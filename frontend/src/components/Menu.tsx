import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AxiosError } from 'axios';
import { fetchMenu } from '../lib/api';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
}

interface ApiError {
  error: string;
}

export default function Menu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchMenu()
      .then(data => {
        setMenuItems(data);
        setError(null);
      })
      .catch((err: unknown) => {
        const errorMsg = err instanceof AxiosError && err.response?.data?.error 
          ? err.response.data.error 
          : 'Failed to load menu. Please try again later.';
        setError(errorMsg);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="menu" className="py-16 bg-gradient-to-b from-gray-100 to-gray-200">
      <h2 className="text-4xl font-bold text-center mb-8 text-cosmic">Menu Highlights</h2>
      {loading && <p className="text-center text-gray-600">Loading menu...</p>}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {!loading && !error && menuItems.length === 0 && (
        <p className="text-center text-gray-600">No menu items available.</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
        {menuItems.map(item => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: item.id * 0.1 }}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-xl font-semibold text-cosmic">{item.name}</h3>
            <p className="text-gray-600 mt-2">{item.description}</p>
            <p className="text-yellow-500 font-bold mt-2">${item.price.toFixed(2)}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
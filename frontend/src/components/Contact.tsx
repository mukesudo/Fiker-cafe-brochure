import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchMenu } from '../lib/api';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
}

export default function Menu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMenu()
      .then(data => setMenuItems(data))
      .catch(err => {
        console.error('API error:', err.message);
        setError('Failed to load menu. Please try again later.');
      });
  }, []);

  return (
    <section id="menu" className="py-16 bg-gradient-to-b from-gray-100 to-gray-200">
      <h2 className="text-4xl font-bold text-center mb-8 text-cosmic">Menu Highlights</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
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
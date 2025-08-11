import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

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
    axios.get('http://localhost:3001/api/menu')
      .then(res => setMenuItems(res.data))
      .catch(err => {
        console.error('Axios error:', err);
        setError('Failed to load menu');
      });
  }, []);

  return (
    <section id="menu" className="py-16 bg-gray-100">
      <h2 className="text-4xl font-bold text-center mb-8 text-cosmic">Menu Highlights</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {menuItems.map(item => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded shadow"
          >
            <h3 className="text-xl font-semibold text-cosmic">{item.name}</h3>
            <p className="text-gray-600">{item.description}</p>
            <p className="text-yellow-500 font-bold">${item.price.toFixed(2)}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
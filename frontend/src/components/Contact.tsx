import { useState } from 'react';
import { motion } from 'framer-motion';
import { submitContact } from '../lib/api';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitContact(form);
      setForm({ name: '', email: '', message: '' });
      setError(null);
      alert('Message sent successfully!');
    } catch (err: any) {
      console.error('API error:', err.message);
      setError('Failed to send message. Please try again later.');
    }
  };

  return (
    <section id="contact" className="py-16 bg-stardust text-white">
      <h2 className="text-4xl font-bold text-center mb-8">Contact Us</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
        className="max-w-md mx-auto space-y-4"
      >
        <input
          type="text"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          placeholder="Name"
          className="w-full p-3 rounded-lg text-black bg-gray-100 focus:ring-2 focus:ring-nebula"
          required
        />
        <input
          type="email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          placeholder="Email"
          className="w-full p-3 rounded-lg text-black bg-gray-100 focus:ring-2 focus:ring-nebula"
          required
        />
        <textarea
          value={form.message}
          onChange={e => setForm({ ...form, message: e.target.value })}
          placeholder="Your Message"
          className="w-full p-3 rounded-lg text-black bg-gray-100 focus:ring-2 focus:ring-nebula h-32"
          required
        ></textarea>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-yellow-500 text-black px-6 py-3 rounded-lg hover:bg-yellow-400 transition-colors"
        >
          Send
        </motion.button>
      </motion.form>
    </section>
  );
}
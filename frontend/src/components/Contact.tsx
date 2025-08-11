import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/contact', form);
      setForm({ name: '', email: '', message: '' });
      setError(null);
      alert('Message sent!');
    } catch (err) {
      console.error('Axios error:', err);
      setError('Failed to send message');
    }
  };

  return (
    <section id="contact" className="py-16 bg-stardust text-white">
      <h2 className="text-4xl font-bold text-center mb-8">Contact Us</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
        className="max-w-md mx-auto"
      >
        <input
          type="text"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          placeholder="Name"
          className="w-full p-2 mb-4 rounded text-black"
          required
        />
        <input
          type="email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          placeholder="Email"
          className="w-full p-2 mb-4 rounded text-black"
          required
        />
        <textarea
          value={form.message}
          onChange={e => setForm({ ...form, message: e.target.value })}
          placeholder="Your Message"
          className="w-full p-2 mb-4 rounded text-black"
          required
        ></textarea>
        <button type="submit" className="bg-yellow-500 text-black px-6 py-3 rounded">Send</button>
      </motion.form>
    </section>
  );
}
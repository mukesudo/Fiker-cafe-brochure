import { useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { login } from '../lib/api';

export default function Login() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login(credentials);
      localStorage.setItem('token', res.token);
      router.push('/admin');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Invalid credentials. Try admin/password.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-cosmic to-stardust"
    >
      <motion.form
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full"
      >
        <h1 className="text-3xl font-bold mb-6 text-cosmic text-center">Admin Login</h1>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <input
          type="text"
          value={credentials.username}
          onChange={e => setCredentials({ ...credentials, username: e.target.value })}
          placeholder="Username"
          className="w-full p-3 mb-4 rounded bg-gray-100 text-black focus:ring-2 focus:ring-nebula"
          required
        />
        <input
          type="password"
          value={credentials.password}
          onChange={e => setCredentials({ ...credentials, password: e.target.value })}
          placeholder="Password"
          className="w-full p-3 mb-6 rounded bg-gray-100 text-black focus:ring-2 focus:ring-nebula"
          required
        />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-yellow-500 text-black px-6 py-3 rounded hover:bg-yellow-400 transition-colors"
        >
          Login
        </motion.button>
      </motion.form>
    </motion.div>
  );
}
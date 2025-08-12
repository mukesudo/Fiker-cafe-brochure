import { useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { AxiosError } from 'axios';
import { login } from '../lib/api';
import Toast from '../components/Toast';


interface ToastState {
  message: string;
  type: 'success' | 'error';
}

interface ApiError {
  error: string;
}


export default function Login() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastState | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { token } = await login(credentials);
      localStorage.setItem('token', token);
      setToast({ message: 'Login successful!', type: 'success' });
      setTimeout(() => router.push('/admin'), 1000); // Delay for toast visibility
    } catch (err: unknown) {
      const errorMsg = err instanceof AxiosError && err.response?.data?.error 
        ? err.response.data.error 
        : 'Invalid credentials';
      setError(errorMsg);
      setToast({ message: errorMsg, type: 'error' });
    }
  };

  const handleBack = () => {
    router.push('/');
  };

  return (
  <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    
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
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBack}
            className="mt-4 w-full bg-gray-500 text-white px-4 py-3 rounded-lg hover:bg-gray-400 transition-colors"
          >
            Back to Home
          </motion.button>
      </motion.form>
    </motion.div>
    </>
  );
}
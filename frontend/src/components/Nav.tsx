import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Toast from './Toast';

interface ToastState {
  message: string;
  type: 'success' | 'error';
}

export default function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, [router.pathname]); // Update on route change

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToast({ message: 'Logged out successfully!', type: 'success' });
    setIsLoggedIn(false);
    setTimeout(() => router.push('/login'), 1000); // Delay for toast visibility
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
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-cosmic text-white p-4 shadow-lg fixed top-0 left-0 right-0 z-50"
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Fiker Cafe</h1>
          <div className="flex space-x-4 items-center">
            <a href="/" className="hover:text-nebula transition-colors">Home</a>
            <a href="/#menu" className="hover:text-nebula transition-colors">Menu</a>
            <a href="/#about" className="hover:text-nebula transition-colors">About</a>
            <a href="/#contact" className="hover:text-nebula transition-colors">Contact</a>
            {isLoggedIn ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-400 transition-colors"
              >
                Logout
              </motion.button>
            ) : (
              <a
                href="/login"
                className="bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-400 transition-colors"
              >
                Login
              </a>
            )}
          </div>
        </div>
      </motion.nav>
    </>
  );
}
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
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, [router.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToast({ message: 'Logged out successfully!', type: 'success' });
    setIsLoggedIn(false);
    setTimeout(() => router.push('/login'), 1000);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
          {/* Hamburger Button for Mobile */}
          <button
            className="md:hidden text-2xl focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4 items-center">
            <link href="/" className="hover:text-nebula transition-colors">Home</link>
            <link href="/#menu" className="hover:text-nebula transition-colors">Menu</link>
            <link href="/#about" className="hover:text-nebula transition-colors">About</link>
            <link href="/#contact" className="hover:text-nebula transition-colors">Contact</link>
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
              <link
                href="/login"
                className="bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-400 transition-colors"
              >
                Login
              </link>
            )}
          </div>
        </div>
        {/* Mobile Menu */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: isMenuOpen ? 'auto' : 0, opacity: isMenuOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden bg-cosmic"
        >
          <div className="flex flex-col space-y-2 p-4">
            <link href="/" className="hover:text-nebula transition-colors" onClick={toggleMenu}>
              Home
            </link>
            <link href="/#menu" className="hover:text-nebula transition-colors" onClick={toggleMenu}>
              Menu
            </link>
            <link href="/#about" className="hover:text-nebula transition-colors" onClick={toggleMenu}>
              About
            </link>
            <link href="/#contact" className="hover:text-nebula transition-colors" onClick={toggleMenu}>
              Contact
            </link>
            {isLoggedIn ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-400 transition-colors text-left"
              >
                Logout
              </motion.button>
            ) : (
              <link
                href="/login"
                className="bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-400 transition-colors"
                onClick={toggleMenu}
              >
                Login
              </link>
            )}
          </div>
        </motion.div>
      </motion.nav>
    </>
  );
}
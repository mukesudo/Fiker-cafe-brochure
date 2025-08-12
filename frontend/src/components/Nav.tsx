import { motion } from 'framer-motion';

export default function Nav() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="navbar fixed top-0 left-0 w-full z-50 py-4"
    >
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        <a href="/" className="text-2xl font-bold text-yellow-500">Fiker Cafe</a>
        <div className="space-x-4">
          <a href="#menu" className="text-white hover:text-nebula">Menu</a>
          <a href="#about" className="text-white hover:text-nebula">About</a>
          <a href="#location" className="text-white hover:text-nebula">Location</a>
          <a href="#contact" className="text-white hover:text-nebula">Contact</a>
          <a href="/login" className="mt-6 inline-block bg-blue-500 text-white px-6 py-3 rounded">Login</a>
        </div>
      </div>
    </motion.nav>
  );
}
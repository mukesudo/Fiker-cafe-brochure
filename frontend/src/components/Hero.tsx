import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="h-screen bg-gradient-to-r from-cosmic to-stardust flex items-center justify-center text-white"
    >
      <div className="text-center">
        <h1 className="text-5xl font-bold">Fiker Cafe</h1>
        <p className="text-2xl mt-4">Sip the Stars with Every Cup</p>
        <a href="#menu" className="mt-6 inline-block bg-yellow-500 text-black px-6 py-3 rounded">View Menu</a>
      </div>
    </motion.div>
  );
}
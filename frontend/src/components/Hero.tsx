import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="h-screen bg-gradient-to-r from-cosmic via-stardust to-nebula flex items-center justify-center text-white relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url('/stars-bg.jpg')] bg-cover opacity-30"></div>
      <div className="text-center z-10">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl sm:text-6xl font-bold drop-shadow-lg"
        >
          Fiker Cafe
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-2xl mt-4 drop-shadow-md"
        >
          Sip the Stars with Every Cup
        </motion.p>
        <motion.a
          href="#menu"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 inline-block bg-yellow-500 text-black px-8 py-4 rounded-lg hover:bg-yellow-400 transition-colors shadow-lg"
        >
          View Menu
        </motion.a>
      </div>
    </motion.div>
  );
}
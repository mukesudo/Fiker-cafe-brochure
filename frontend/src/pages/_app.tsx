import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Footer from '../components/Footer';
import { MotionConfig } from 'framer-motion';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}
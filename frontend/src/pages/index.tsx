import Head from 'next/head';
import Hero from '../components/Hero';
import Menu from '../components/Menu';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Cosmic Brew Cafe</title>
        <meta name="description" content="A cozy cafe with stellar coffee and cosmic vibes" />
      </Head>
      <Hero />
      <Menu />
      <section id="about" className="py-16 text-center">
        <h2 className="text-4xl font-bold mb-4">About Fiker Cafe</h2>
        <p className="max-w-2xl mx-auto">A cozy cafe where the stars align with every sip. Enjoy artisan coffee and pastries in a galactic atmosphere.</p>
      </section>
      <section id="location" className="py-16 bg-gray-100 text-center">
        <h2 className="text-4xl font-bold mb-4">Visit Us</h2>
        <p>Addis Ababa, Ethiopia</p>
        <div className="mt-4">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.086!2d-122.419415!3d37.774929!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDUyJzI5LjciTiAxMjLCsDI1JzA5LjkiVw!5e0!3m2!1sen!2us!4v1631234567890"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </section>
      <Contact />
    </div>
  );
}
import Head from 'next/head';
import Nav from '../components/Nav';
import Hero from '../components/Hero';
import Menu from '../components/Menu';
import Contact from '../components/Contact';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Fiker Cafe</title>
        <meta name="description" content="Savor authentic Ethiopian cuisine under the stars." />
        <Link href="https://fonts.googleapis.com/css2?family=Inter&family=Poppins:wght@700&display=swap" rel="stylesheet" />
      </Head>
      <Nav />
      <Hero />
      <Menu />
      <section id="about" className="py-16 text-center bg-gradient-to-b from-cosmic to-gray-900">
        <h2 className="text-4xl font-bold mb-6 text-yellow-500">About Fiker Cafe</h2>
        <p className="max-w-2xl mx-auto text-gray-200 text-lg">
          A cozy Ethiopian cafe where the stars align with every sip. Enjoy traditional dishes, crafted with authentic spices and love.
        </p>
        <Link href="#contact" className="mt-6 inline-block bg-yellow-500 text-black px-6 py-3 rounded">Contact Us</Link>
      </section>
      <section id="location" className="py-16 bg-gray-100 text-center">
        <h2 className="text-4xl font-bold mb-6 text-cosmic">Visit Us</h2>
        <p className="text-gray-800 text-lg mb-4">Addis Ababa, Ethiopia</p>
        <div className="max-w-4xl mx-auto">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.086!2d-122.419415!3d37.774929!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDUyJzI5LjciTiAxMjLCsDI1JzA5LjkiVw!5e0!3m2!1sen!2us!4v1631234567890"
            width="100%"
            height="400"
            style={{ border: 0, borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)' }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </section>
      <Contact />
    </div>
  );
}
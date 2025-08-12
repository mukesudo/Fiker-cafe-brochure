export default function Footer() {
  return (
    <footer className="py-6 bg-cosmic text-white text-center">
      <p>&copy; 2025 Cosmic Brew Cafe. All rights reserved.</p>
      <div className="mt-2 space-x-4">
        <link href="/#menu" className="hover:text-nebula">Menu</link>
        <link href="/#about" className="hover:text-nebula">About</link>
        <link href="/#contact" className="hover:text-nebula">Contact</link>
      </div>
      <p className="mt-2">Discover authentic Ethiopian cuisine in a cosmic setting.</p>
    </footer>
  );
}
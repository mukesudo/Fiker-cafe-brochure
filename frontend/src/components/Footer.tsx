import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-6 bg-cosmic text-white text-center">
      <p>&copy; 2025 Cosmic Brew Cafe. All rights reserved.</p>
      <div className="mt-2 space-x-4">
        <Link href="/#menu" className="hover:text-nebula">Menu</Link>
        <Link href="/#about" className="hover:text-nebula">About</Link>
        <Link href="/#contact" className="hover:text-nebula">Contact</Link>
      </div>
      <p className="mt-2">Discover authentic Ethiopian cuisine in a cosmic setting.</p>
    </footer>
  );
}
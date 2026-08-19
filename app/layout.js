import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import { CartProvider } from '@/components/CartContext';

export const metadata = {
  title: 'Georgiekins — A Cozy Corner for Pet Lovers',
  description:
    'Georgiekins is a kawaii pet brand where Georgie the cat shares adorable animal facts, helpful tips, sweet stories, and cozy printables for pet lovers.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Quicksand:wght@500;600;700&family=Caveat:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-quicksand bg-white">
        <CartProvider>
          <Nav />
          <main>{children}</main>
          {/* CartDrawer is a fixed overlay — it never affects document flow */}
          <CartDrawer />
          {/* Footer sits in normal document flow — never sticky/fixed while scrolling */}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}

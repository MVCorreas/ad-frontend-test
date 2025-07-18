import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";

export default function Header() {
  return (
    <header className="bg-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-medium text-gray-600">GamerShop</span>
          </Link>

          <nav className="flex items-center space-x-8">
            <Link
              href="/cart"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <FiShoppingCart className="h-6 w-6" />
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

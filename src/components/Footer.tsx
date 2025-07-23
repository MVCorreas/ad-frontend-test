import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-neutral-700 text-white sm:mt-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
        <Link href="/" className="flex items-center">
          <Image 
            src="/ad-logo-transparent.png" 
            alt="Apply Digital Logo" 
            width={150} 
            height={50}
            className="filter brightness-125 grayscale opacity-80 hover:brightness-100 hover:grayscale-0 transition-all duration-300"
            data-test="footer-logo"
          />
        </Link>
      </div>
    </footer>
  )
}
// components/Footer.js
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-neutral text-neutral-content p-10 mt-20">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo and Description Section */}
        <div>
          <Image src="/assets/logo.svg" alt="logo" height={70} width={70} />
          <p>
            Edwin Diaz is a software and web technologies engineer, a life coach
            trainer who is also a serial entrepreneur.
          </p>
          <div className="flex space-x-4 mt-4">
            <FaFacebook className="text-white hover:text-gray-400" />
            <FaTwitter className="text-white hover:text-gray-400" />
            <FaInstagram className="text-white hover:text-gray-400" />
            <FaLinkedin className="text-white hover:text-gray-400" />
          </div>
        </div>

        {/* About Section */}
        <div>
          <h3 className="text-lg font-bold mb-2">About</h3>
          <ul>
            <li>
              <Link href="/" className="hover:text-gray-400 no-underline">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/service"
                className="hover:text-gray-400 no-underline"
              >
                Service
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-gray-400 no-underline"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Company Section */}
        <div>
          <h3 className="text-lg font-bold mb-2">Company</h3>
          <ul>
            <li>
              <Link
                href="/why-car-doctor"
                className="hover:text-gray-400 no-underline"
              >
                Why Car Doctor
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-gray-400 no-underline">
                About
              </Link>
            </li>
          </ul>
        </div>

        {/* Support Section */}
        <div>
          <h3 className="text-lg font-bold mb-2">Support</h3>
          <ul>
            <li>
              <Link
                href="/support-center"
                className="hover:text-gray-400 no-underline"
              >
                Support Center
              </Link>
            </li>
            <li>
              <Link
                href="/feedback"
                className="hover:text-gray-400 no-underline"
              >
                Feedback
              </Link>
            </li>
            <li>
              <Link
                href="/accessibility"
                className="hover:text-gray-400 no-underline"
              >
                Accessibility
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

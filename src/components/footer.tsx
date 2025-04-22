"use client"
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand Section */}
        <div className="space-y-4">
          <Image
            src="/logos/logo.png"
            alt="Alpha Ventures Logo"
            width={150}
            height={50}
            style={{ objectFit: "contain" }}
            priority
          />
          <p className="text-sm">
            Transform your online presence with scalable, high-performance websites
            built for growth.
          </p>
          <div className="flex space-x-4">
            <Link
              href="https://x.com/samuelkarcher?s=21"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              <span className="sr-only">X</span>
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </Link>
            {/* Add other socials if needed */}
          </div>
        </div>

        {/* Services Section */}
        <div>
          <h3 className="text-white font-semibold mb-4">Services</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#focus" className="hover:text-white">
                Web Design
              </Link>
            </li>
            <li>
              <Link href="#AI" className="hover:text-white">
                Business Automation
              </Link>
            </li>

          </ul>
        </div>

        {/* Company Section */}
        <div>
          <h3 className="text-white font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#about" className="hover:text-white">
                About Us
              </Link>
            </li>
            <li>
              <Link href="#Case Study" className="hover:text-white">
                Case Studies
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-white">
                Blog
              </Link>
            </li>

          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-white font-semibold mb-4">Get in Touch</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="mailto:Alphaventuresgroup.biz"
                className="hover:text-white"
              >
                Alphaventuresgroup.biz
              </a>
            </li>
            <li>
              <a href="tel:+27661879993" className="hover:text-white">
                066 187 9993
              </a>
            </li>
            <li>
            </li>
            <li>
            <Link
  href="https://api.whatsapp.com/send/?phone=27661879993&text&type=phone_number&app_absent=0&wame_ctl=1"
  className="inline-block mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm flex items-center gap-2"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Contact our team via WhatsApp"
>
  <Image
    src="/logos/whatsapp.png" // Ensure this image exists in /public/whatsapp.png
    alt="WhatsApp Logo"
    width={20}
    height={20}
    className="inline-block"
  />
  Speak to us!
</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 pt-6 border-t border-gray-700 text-center text-sm text-gray-500">
        <p>
          Serving the globe, one website at a time. ©{" "}
          {new Date().getFullYear()} Alpha Ventures Group. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
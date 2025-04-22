'use client';

import Image from "next/image";
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import ContactForm from '../components/ContactForm';

// Logo slider component
const logos = [
  '/logos/Nextjs.png',
  '/logos/Nodelogo.png',
  '/logos/reactlogo.png',
  '/logos/SupabaseLogo.png',
  '/logos/cursorlogo.png',
  '/logos/Cloudflare-Logo.png',
];

const LogoSlider = () => {
  return (
    <div className="overflow-hidden py-4 sm:py-8 bg-white w-full">
      <motion.div
        className="flex gap-4 sm:gap-8 animate-slide"
        initial={{ x: 0 }}
        animate={{ x: ['0%', '-100%'] }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: 20,
        }}
      >
        {[...logos, ...logos].map((logo, index) => (
          <div key={index} className="min-w-[80px] sm:min-w-[120px] flex items-center justify-center">
            <Image src={logo} alt={`logo-${index}`} width={80} height={48} className="object-contain grayscale hover:grayscale-0 transition" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

// Define types for the PricingCard component
interface PricingCardProps {
  title: string;
  price: number | string;
  description: string;
  buttonText: string;
  buttonClass: string;
  features: string[];
}

// Currency conversion component

const PricingCard = ({ title, price, description, buttonText, buttonClass, features }: PricingCardProps) => {
  const [convertedPrice, setConvertedPrice] = useState<number | string>(price);
  const [currency, setCurrency] = useState<string>('$');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const convertCurrency = async () => {
      try {
        // Get user's location
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        
        const { latitude, longitude } = position.coords;
        
        // Get country code from coordinates
        const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
        const data = await response.json();
        const countryCode = data.countryCode;
        
        // Get currency code from country code
        const currencyResponse = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
        const currencyData = await currencyResponse.json();
        const currencyCode = Object.keys(currencyData[0].currencies)[0];
        
        // If price is a number, convert it
        if (typeof price === 'number') {
          // Get exchange rate
          const exchangeResponse = await fetch(`https://api.exchangerate-api.com/v4/latest/USD`);
          const exchangeData = await exchangeResponse.json();
          const rate = exchangeData.rates[currencyCode];
          
          // Convert price
          const converted = Math.round(price * rate);
          
          // Set currency symbol based on currency code
          let symbol = '$';
          if (currencyCode === 'EUR') symbol = '€';
          else if (currencyCode === 'GBP') symbol = '£';
          else if (currencyCode === 'JPY') symbol = '¥';
          else if (currencyCode === 'INR') symbol = '₹';
          else if (currencyCode === 'AUD') symbol = 'A$';
          else if (currencyCode === 'CAD') symbol = 'C$';
          else if (currencyCode === 'ZAR') symbol = 'R';
          
          setConvertedPrice(converted);
          setCurrency(symbol);
        } else {
          // If price is not a number (like "On Request"), just set the currency
          setConvertedPrice(price);
          setCurrency('');
        }
      } catch (error) {
        console.error('Error converting currency:', error);
        // Fallback to USD if there's an error
        setConvertedPrice(price);
        setCurrency('$');
      } finally {
        setIsLoading(false);
      }
    };

    convertCurrency();
  }, [price]);

  return (
    <div className="pricing-card bg-[#1a1a3c] p-3 sm:p-4 rounded-lg">
      <h3 className="text-lg sm:text-xl font-bold">{title}</h3>
      <p className="price text-xl sm:text-2xl font-bold my-1">
        {isLoading ? '...' : `${currency}${convertedPrice}`}
      </p>
      <p className="text-sm sm:text-base mb-2">{description}</p>
      <button className={`purchase-btn ${buttonClass} w-full py-1.5 rounded-md font-medium`}>
        {buttonText}
      </button>
      <ul className="mt-2 text-sm sm:text-base">
        {features.map((feature: string, index: number) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
    </div>
  );
};

// AI Web Apps Section Component
const AIWebAppsSection = () => {
  return (
    <section className="bg-[#d1d5db] min-h-screen">
    <div className="flex flex-col items-center justify-center bg-[#d1d5db] text-white py-16 px-4 sm:px-8 lg:px-16 max-w-[1400px] mx-auto min-h-screen">
      <h2 className="text-4xl font-extrabold tracking-widest uppercase text-center mb-10">
        Artificial Intelligence and Web Apps
      </h2>
      <div id="AI"></div>
      <div className="flex flex-col md:flex-row items-center gap-10">
        {/* Image on the left */}
        <div className="md:w-1/2 w-full flex justify-center">
          <img
            src="connection .png"
            alt="hi"
            className="max-w-sm w-full object-contain"
          />
        </div>

        {/* Content on the right */}
        <div className="md:w-1/2 w-full space-y-8">
          {/* Introduction */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-bold">We believe the future is here</h3>
            <p className="mt-2 text-sm sm:text-base">
              Business will become more reliant on web applications and AI. This is an opportunity where you can take action upon.
            </p>
          </div>

          {/* Increase Leverage */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-md">
            <h4 className="text-white font-bold text-lg mb-2">Results are – Increase Leverage</h4>
            <p className="text-sm sm:text-base">
              AI empowers businesses to achieve more output with less input by optimizing time, cutting costs, and reducing reliance on manual labor. 
            </p>
          </div>

          {/* Decision Making */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-md">
            <h4 className="text-white font-bold text-lg mb-2">Enhanced decision making</h4>
            <p className="text-sm sm:text-base">
              AI and web apps help businesses make better decisions by turning raw data into clear, actionable insights in real time.
            </p>
          </div>

          {/* Customer Retention */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-md">
            <h4 className="text-white font-bold text-lg mb-2">Increase customer retention and sales</h4>
            <p className="text-sm sm:text-base">
              AI and web apps increase customer retention and sales by delivering personalized experiences at scale. They analyze user behavior to recommend products, tailor messages, and automate follow-ups—making each interaction feel relevant and timely.
            </p>
          </div>

          {/* Higher Margins */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-md">
            <h4 className="text-white font-bold text-lg mb-2">Higher Margins</h4>
            <p className="text-sm sm:text-base">
              Integration of AI systems can reduce your costs leading to a direct increase in your profit margins.
            </p>
          </div>
        </div>
      </div>
    </div>
    </section>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen overflow-y-auto scroll-smooth font-[family-name:var(--font-geist-sans)]">
      <main>
        {/* Section 1 - Intro */}
        <section className="min-h-screen flex items-center justify-center p-4 sm:p-8 pb-10 sm:pb-20">
          <div className="flex flex-col gap-[24px] sm:gap-[32px] items-center sm:items-start w-full max-w-[1400px] mx-auto">
            <Image
              className="dark:invert"
              src="/logos/logo.png"
              alt="logo"
              width={150}
              height={32}
              priority
            />
            <div className="w-full">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4">Transform your business with intelligent web development services power by AI.</h2>
              <h1 className="text-xl sm:text-2xl">We build scalable, AI Driven, high-performance all custom websites designed to elevate your business to new heights-driving growth and success with every click.</h1>
              <h1 className="text-xl sm:text-2xl">Simplicity that scales</h1>
            </div>

            <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
            </ol>

            <div className="flex gap-4 items-center flex-col sm:flex-row w-full sm:w-auto">
              <a
                className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto"
                href="#ai-section"
                rel="noopener noreferrer"
              >
                Work with us 
              </a>
            </div>
            <h3 className="text-lg font-semibold text-center mt-4">Technologies We Use</h3>

            
            {/* Logo Slider Section - Now part of the first section */}
            <div className="w-full mt-4 sm:mt-8">
              <LogoSlider />
            </div>
          </div>
        </section>

        {/* Section 2 - Features */}
        <div id="focus"></div>
        <section className="min-h-screen bg-gray-100 dark:bg-[#111] flex items-center justify-center px-4 sm:px-8 md:px-20 py-16">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12 max-w-6xl w-full">
            <div className="w-full sm:w-1/2 text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4">Our Focus</h2>
              <div className="features-section">
                <ul>
                  <li>A one stop solution for all you website development needs from design and development to web hosting services</li>
                  <li>Fast, scalable, and secure solutions built with Next.js for performance, security, and growth.</li>
                  <li>AI-driven automation tools that streamline operations, save time, and enhance customer experience.</li>
                  <li>Built-in SEO and marketing strategies to boost visibility, drive traffic, and generate leads from day one.</li>
                  <li>End-to-end support including revisions, analytics, and launch assistance to ensure measurable results.</li>
                </ul>
              </div>
            </div>
            <div className="w-full sm:w-1/2 mt-6 sm:mt-0">
              <img src="/netai.png" alt="Features" className="section-img w-full h-auto rounded-lg" />
            </div>
          </div>
        </section>

        {/* Section 3 - About */}
        <div id="about"></div>
        <section className="min-h-screen bg-white dark:bg-[#181818] flex items-center justify-center px-4 sm:px-8 md:px-20 py-16">
          <div className="flex flex-col-reverse sm:flex-row items-center justify-center gap-8 sm:gap-12 max-w-6xl w-full">
            <div className="w-full sm:w-1/2 mt-6 sm:mt-0">
              <img src="ai.png" alt="About Us" className="section-img"/>
            </div>
            <div className="w-full sm:w-1/2 text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4">About Us</h2>
              
              <p className="text-base sm:text-lg text-gray-800 dark:text-gray-200">
                We are passionate about creating simple, fast, and accessible web experiences. With a focus on smart websites builds, ensuring you can spend less time on admin work and more time running your business. From Small to large business we offer our services tailored to your situation.
              </p>
            </div>
          </div>
        </section>


{/* YouTube Section */}
<section className="min-h-screen bg-gradient-to-br from-gray-200 to-white dark:from-[#111] dark:to-[#1a1a1a] flex items-center justify-center px-4 sm:px-8 md:px-20 py-16">
  <div className="flex flex-col-reverse sm:flex-row items-center justify-center gap-8 sm:gap-12 max-w-6xl w-full">
    {/* Text Content */}
    <div className="w-full sm:w-1/2 text-center sm:text-left">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
        See Our Smart AI Web App in Action
      </h1>
      <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 mb-6">
        This quick demo showcases how our AI tools streamline the entire
        web app development process smarter, faster, and beautifully scalable.
      </p>
    </div>
    {/* YouTube Video */}
    <div className="w-full sm:w-1/2 mt-6 sm:mt-0">
      <div className="aspect-w-16 aspect-h-9 w-full rounded-lg overflow-hidden shadow-lg">
        <iframe
          src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
          title="Smart AI Web App Demo"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>
    </div>
  </div>
</section>
        {/* AI Web Apps Section */}
        <AIWebAppsSection />

        <section className="min-h-screen bg-white dark:bg-[#181818] py-8 sm:py-12">
  <div className="max-w-[1400px] mx-auto px-4 sm:px-8 md:px-20 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
    {/* Left: Pricing Cards */}
    <div className="w-full md:w-1/2">
      <h2 className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-4 sm:mb-6">Our Packages</h2>
      <p>Quotations may vary</p>
      <div className="pricing-cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        <a href="#ai-section">
          <PricingCard 
            title="One Pager"
            price={80}
            description="Sales page for your business"
            buttonText="Purchase "
            buttonClass="bg-[#5f5fff] hover:bg-[#4a4ad1] text-white"
            features={[
              "Single page",
              "Cover page for your business",
              "Bookings Integration",
              "Contact form",
            ]}
          />
        </a>
        <a href="#ai-section">
          <PricingCard 
            title="Three pager"
            price={200}
            description="Full website for your business"
            buttonText="Purchase" 
            buttonClass="bg-[#8e4fff] hover:bg-[#763ec9] text-white"
            features={[
              "All features stated above +",
              "Simple AI Intergration",
              "Backend Data-base Setup",
              "Basic Payment Intergration",
              "Automated chatbot",
            ]}
          />
        </a>
        <a href="#ai-section">
          <PricingCard 
            title="Three Plus/Eccomerce"
            price="On Request"
            description="Comprehensive Web Development"
            buttonText="Purchase"
            buttonClass="bg-[#ffe666] text-black hover:bg-[#e6d15c]"
            features={[
              "All features stated above +",
              "Data-base for stock tracking",
              "Ordering Systems",
              "Payment Integration",
              "Secure Logins + Paywalled Content",
            ]}
          />
        </a>
      </div>
    </div>
    
    {/* Right: Reviews */}
    <div className="w-full md:w-1/2 mt-6 md:mt-0 space-y-4">
      <h3 className="text-xl sm:text-2xl font-semibold text-black dark:text-white mb-3">Our Reviews</h3>
      <div className="space-y-3">
        {[
          { name: "Dr LM Archer.", review: "Our new website is professional and helps has simplified our bookings by offering online books. As well as script management" },
          { name: "Susan ~ Author.", review: "Professional, fast, and visually stunning. Highly recommended." },
          { name: "Emily R.", review: "Exceptional value. This package paid for itself within a week." },
          { name: "David L.", review: "Clear communication and a final product that changed how our business Operates." },
        ].map((r, i) => (
          <div key={i} className="bg-[#222] p-3 rounded-lg shadow-sm">
            <p className="text-white text-sm sm:text-base italic mb-1">“{r.review}”</p>
            <p className="text-sm text-gray-400 font-medium">– {r.name}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

{/* Section 5 - Hosting Services */}
<section className="min-h-screen bg-white dark:bg-[#181818] px-4 sm:px-8 md:px-20 py-8 sm:py-12">
  <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 w-full">
    {/* Left: Pricing Cards */}
    <div className="w-full">
      <h2 className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-4 sm:mb-6">Our hosting Services</h2>
      <p>Quotations may vary</p>
      <div className="flex flex-col gap-6 sm:gap-8 w-full">
        <a href="#ai-section">
          <PricingCard 
            title="Website Hosting"
            price={5}
            description="Website hosting fast and secure"
            buttonText="Purchase "
            buttonClass="bg-[#5f5fff] hover:bg-[#4a4ad1] text-white"
            features={[
              "Website hosting",
              "High Peformance",
              "99.99% up time",
              "World class security",
              "SSL Certificates",
              "Support Chat",
              "Domain Setup",
            ]}
          />
        </a>
        <a href="#ai-section">
          <PricingCard 
            title="Website hosting + Advertising updates"
            price={20}
            description="Website hosting + Advertising updates"
            buttonText="Purchase" 
            buttonClass="bg-[#8e4fff] hover:bg-[#763ec9] text-white"
            features={[
              "All features stated above +",
              "Weekly content updates for your needs",
              "Google Ads",
              "SEO Continued Optimisation",
              "Custom Email Addresses",
              "Free Domain",
            ]}
          />
        </a>
      </div>
    </div>
  </div>
</section>


<section className="min-h-screen bg-white dark:bg-[#121212] py-16 px-4 sm:px-8 md:px-20 flex flex-col items-center justify-center">
  <div id="Case Study"></div>
  <div className="max-w-[1400px] mx-auto bg-gray-100 dark:bg-[#1a1a1a] p-6 sm:p-8 rounded-lg shadow-md">
    <h2 className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-6 sm:mb-8">
      Case Study: Alpha Ventures Group with Riverdoc.co.za
    </h2>
    <hr className="border-t border-gray-300 dark:border-gray-600 mb-8" />
    <p className="text-gray-700 dark:text-gray-300 mb-10 text-base sm:text-lg leading-relaxed">
      We partnered with <strong className="text-blue-600 dark:text-blue-400 underline">Riverdoc.co.za</strong>, a private medical practice, to streamline their operations and enhance their digital presence. By implementing custom web automation and backend tools, we eliminated redundant admin tasks, simplified patient communication, and introduced secure digital workflows.
    </p>
    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 text-sm sm:text-base space-y-3 mb-8">
      <li>Custom appointment automation & calendar integration</li>
      <li>Secure digital intake forms replacing paper-based admin</li>
      <li>Admin dashboard for easier patient record access</li>
      <li>Optimized website performance and SEO</li>
    </ul>
    <div className="mt-8">
      <a
        href="https://riverdoc.co.za"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-base font-medium transition transform hover:scale-105"
      >
        Visit Riverdoc.co.za
      </a>
    </div>
  </div>
</section>


        {/* Contact Form Section */}
        <section className="min-h-screen bg-gradient-to-br from-gray-100 to-white dark:from-[#111] dark:to-[#1a1a1a] flex items-center justify-center px-4 sm:px-8 md:px-20 py-16">
          <div className="flex flex-col items-center justify-center gap-8 sm:gap-12 max-w-6xl w-full">
            <div className="text-center">
              <div id = "ai-section"></div>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4">Get In Touch</h2>
              <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 mb-8">
                Ready to transform your business with AI-powered web solutions? Fill out the form below and we’ll get back to you within 24 hours.
              </p>
            </div>
            <ContactForm />
          </div>
        </section>

      </main>
    </div>
  );
}




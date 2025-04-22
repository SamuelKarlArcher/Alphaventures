'use client';

import { useState, useEffect } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    serviceInterest: '',
    projectDetails: '',
    budget: '',
    timeline: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [currencyCode, setCurrencyCode] = useState<string>('USD');
  const [currencySymbol, setCurrencySymbol] = useState<string>('$');
  const [budgetRanges, setBudgetRanges] = useState<
    { value: string; label: string }[]
  >([
    { value: 'under-500', label: 'Under $100' },
    { value: '500-1000', label: '$500 - $1,000' },
    { value: '1000-3000', label: '$1,000 - $3,000' },
    { value: '3000-5000', label: '$3,000 - $5,000' },
    { value: '5000+', label: '$5,000+' },
  ]);
  const [isLoadingCurrency, setIsLoadingCurrency] = useState<boolean>(true);

  // Base budget ranges in USD
  const baseBudgetRanges = [
    { value: 'not defined', amount: undefined },
    { value: 'under-500', amount: 150 },
    { value: '2500-1000', amount: 350 },
    { value: '1000-3000', amount: 3000 },
    { value: '3000-5000', amount: 5000 },
    { value: '5000+', amount: Infinity },
  ];

  // Currency symbols mapping
  const currencySymbols: { [key: string]: string } = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    INR: '₹',
    AUD: 'A$',
    CAD: 'C$',
    ZAR: 'R',
  };

  // Detect client's location and convert currency
  useEffect(() => {
    const convertCurrency = async () => {
      try {
        // Get user's location
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude, longitude } = position.coords;

        // Get country code from coordinates
        const response = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
        );
        const data = await response.json();
        const countryCode = data.countryCode;

        // Get currency code from country code
        const currencyResponse = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
        const currencyData = await currencyResponse.json();
        const detectedCurrencyCode = Object.keys(currencyData[0].currencies)[0];

        // Get exchange rate
        const exchangeResponse = await fetch(`https://api.exchangerate-api.com/v4/latest/USD`);
        const exchangeData = await exchangeResponse.json();
        const rate = exchangeData.rates[detectedCurrencyCode] || 1;

        // Convert budget ranges
        const convertedRanges = baseBudgetRanges.map((range) => {
          if (range.amount === Infinity) {
            return {
              value: range.value,
              label: `${currencySymbols[detectedCurrencyCode] || '$'}5,000+`,
            };
          }
          const convertedAmount = Math.round(range.amount * rate);
          const lowerBound = range.value.startsWith('under')
            ? `Under ${currencySymbols[detectedCurrencyCode] || '$'}${convertedAmount}`
            : `${currencySymbols[detectedCurrencyCode] || '$'}${Math.round(
                (range.amount / 2) * rate
              )} - ${currencySymbols[detectedCurrencyCode] || '$'}${convertedAmount}`;
          return {
            value: range.value, // Keep consistent value for form submission
            label: lowerBound,
          };
        });

        setCurrencyCode(detectedCurrencyCode);
        setCurrencySymbol(currencySymbols[detectedCurrencyCode] || '$');
        setBudgetRanges(convertedRanges);
      } catch (error) {
        console.error('Error converting currency:', error);
        // Fallback to USD
        setCurrencyCode('USD');
        setCurrencySymbol('$');
        setBudgetRanges([
          { value: 'under-500', label: 'Under $500' },
          { value: '500-1000', label: '$500 - $1,000' },
          { value: '1000-3000', label: '$1,000 - $3,000' },
          { value: '3000-5000', label: '$3,000 - $5,000' },
          { value: '5000+', label: '$5,000+' },
        ]);
      } finally {
        setIsLoadingCurrency(false);
      }
    };

    convertCurrency();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, currency: currencyCode }), // Include currency
      });

      if (!res.ok) throw new Error('Network response was not ok');

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        serviceInterest: '',
        projectDetails: '',
        budget: '',
        timeline: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-group">
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#5f5fff] focus:border-transparent bg-white dark:bg-[#222] dark:border-gray-700 dark:text-white"
              placeholder="Your name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#5f5fff] focus:border-transparent bg-white dark:bg-[#222] dark:border-gray-700 dark:text-white"
              placeholder="your.email@example.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone" className="block text-sm font-medium mb-1">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#5f5fff] focus:border-transparent bg-white dark:bg-[#222] dark:border-gray-700 dark:text-white"
              placeholder="Your phone number"
            />
          </div>

          <div className="form-group">
            <label htmlFor="company" className="block text-sm font-medium mb-1">
              Company
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#5f5fff] focus:border-transparent bg-white dark:bg-[#222] dark:border-gray-700 dark:text-white"
              placeholder="Your company name"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="serviceInterest" className="block text-sm font-medium mb-1">
            What services are you interested in? *
          </label>
          <select
            id="serviceInterest"
            name="serviceInterest"
            value={formData.serviceInterest}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#5f5fff] focus:border-transparent bg-white dark:bg-[#222] dark:border-gray-700 dark:text-white"
          >
            <option value="">Select a service</option>
            <option value="one-pager">One Pager Website</option>
            <option value="three-pager">Three Pager Website</option>
            <option value="ecommerce">E-commerce Solution</option>
            <option value="ai-integration">AI Integration</option>
            <option value="custom">Hosting Services</option>
            <option value="custom">Custom Solution</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="projectDetails" className="block text-sm font-medium mb-1">
            Tell us about your project *
          </label>
          <textarea
            id="projectDetails"
            name="projectDetails"
            value={formData.projectDetails}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#5f5fff] focus:border-transparent bg-white dark:bg-[#222] dark:border-gray-700 dark:text-white"
            placeholder="Describe what you're looking to build and your goals..."
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-group">
            <label htmlFor="budget" className="block text-sm font-medium mb-1">
              Budget Range
            </label>
            <select
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#5f5fff] focus:border-transparent bg-white dark:bg-[#222] dark:border-gray-700 dark:text-white"
              disabled={isLoadingCurrency}
            >
              <option value="">Select a budget range</option>
              {isLoadingCurrency ? (
                <option value="">Loading...</option>
              ) : (
                budgetRanges.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))
              )}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="timeline" className="block text-sm font-medium mb-1">
              Project Timeline
            </label>
            <select
              id="timeline"
              name="timeline"
              value={formData.timeline}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#5f5fff] focus:border-transparent bg-white dark:bg-[#222] dark:border-gray-700 dark:text-white"
            >
              <option value="">Select a timeline</option>
              <option value="asap">As soon as possible</option>
              <option value="1-month">Within 1 month</option>
              <option value="3-months">Within 3 months</option>
              <option value="6-months">Within 6 months</option>
              <option value="flexible">Flexible</option>
            </select>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isSubmitting || isLoadingCurrency}
            className="px-6 py-3 bg-[#1f5fff] hover:bg-[#4a4ad1] text-white font-medium rounded-md transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </div>

        {submitStatus === 'success' && (
          <div
            role="alert"
            className="mt-4 p-3 bg-green-100 text-green-800 rounded-md text-center"
          >
            Thank you for your message! We will get back to you soon.
          </div>
        )}

        {submitStatus === 'error' && (
          <div
            role="alert"
            className="mt-4 p-3 bg-red-100 text-red-800 rounded-md text-center"
          >
            There was an error sending your message. Please try again later.
          </div>
        )}
      </form>
    </div>
  );
}
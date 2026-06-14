import React from 'react';

export default function Privacy() {
  return (
    <div className="container mx-auto px-6 py-24 min-h-[80vh] max-w-4xl text-gray-300">
      <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
      <p className="mb-4">Last updated: June 14, 2026</p>
      
      <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Information We Collect</h2>
      <p className="mb-4">We collect information you provide directly to us, such as when you create or modify your account, request customer support, or communicate with us. This may include your name, email address, and payment information.</p>
      
      <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. How We Use Information</h2>
      <p className="mb-4">We use the information we collect to provide, maintain, and improve our services, to process transactions, and to send you related information, including confirmations and invoices.</p>

      <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Analytics and Tracking</h2>
      <p className="mb-4">We use our proprietary Go-based Analytics microservice to track feature usage, such as subscription clicks, to improve the user experience. You can opt-out by adjusting your browser settings.</p>
    </div>
  );
}

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Payment() {
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handlePayment = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  if (success) {
    return (
      <div className="container mx-auto px-6 py-32 min-h-[80vh] flex flex-col items-center justify-center">
        <div className="bg-green-500/20 p-10 rounded-full mb-8 animate-bounce">
          <svg className="w-24 h-24 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h1 className="text-5xl font-black text-white mb-4">Payment Successful!</h1>
        <p className="text-xl text-gray-400">Welcome to AniCart Premium. Redirecting you to the homepage...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-24 min-h-[80vh] flex flex-col items-center">
      <h1 className="text-4xl font-black text-white mb-8 text-center drop-shadow-2xl">
        Secure Checkout
      </h1>
      <div className="bg-gray-900 p-8 rounded-3xl border border-gray-800 shadow-2xl w-full max-w-md relative overflow-hidden">
        <form onSubmit={handlePayment} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Cardholder Name</label>
            <input required type="text" className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-pink-500" placeholder="John Doe" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Card Number</label>
            <input required type="text" className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-pink-500" placeholder="**** **** **** ****" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Expiry Date</label>
              <input required type="text" className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-pink-500" placeholder="MM/YY" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">CVV</label>
              <input required type="text" className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-pink-500" placeholder="***" />
            </div>
          </div>
          <button type="submit" className="w-full py-4 mt-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-bold hover:scale-105 transition-transform shadow-2xl">
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
}

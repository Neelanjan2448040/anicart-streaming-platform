import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Subscription() {
  const navigate = useNavigate();

  const handleSubscribe = async (tier) => {
    try {
      await fetch('http://localhost:8080/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'subscribe_click', tier })
      }).catch(e => console.log('Analytics tracking blocked locally'));
    } catch(err) {}
    navigate('/payment');
  };

  return (
    <div className="container mx-auto px-6 py-24 min-h-[80vh] flex flex-col items-center">
      <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4 text-center drop-shadow-2xl">
        Unlock Premium Anime
      </h1>
      <p className="text-gray-400 mb-16 text-center max-w-xl">Choose the plan that best fits your anime binge-watching needs. Cancel anytime.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-5xl">
        {/* Tier 1 */}
        <div className="bg-gray-900 p-10 rounded-3xl border border-gray-800 shadow-2xl relative overflow-hidden group hover:border-pink-500 transition-colors flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Basic Plan</h2>
            <div className="text-5xl font-black text-pink-500 mb-6">₹299<span className="text-lg text-gray-500 font-medium">/mo</span></div>
            <ul className="space-y-4 mb-10 text-gray-300">
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> HD Streaming (1080p)</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> 1 Device at a time</li>
              <li className="flex items-center"><span className="text-red-500 mr-2">✗</span> Ad-supported</li>
              <li className="flex items-center"><span className="text-red-500 mr-2">✗</span> No offline downloads</li>
            </ul>
          </div>
          <button onClick={() => handleSubscribe('299')} className="w-full py-4 border-2 border-pink-600 text-pink-500 rounded-full font-bold hover:bg-pink-600 hover:text-white transition-colors">
            Select Basic
          </button>
        </div>

        {/* Tier 2 */}
        <div className="bg-gradient-to-b from-gray-900 to-black p-10 rounded-3xl border-2 border-purple-500 shadow-[0_0_50px_rgba(168,85,247,0.3)] relative overflow-hidden transform md:-translate-y-4 flex flex-col justify-between">
          <div className="absolute top-0 right-0 bg-purple-600 text-white text-xs font-bold px-4 py-1 rounded-bl-lg">RECOMMENDED</div>
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Pro Max Plan</h2>
            <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-6">₹499<span className="text-lg text-gray-500 font-medium">/mo</span></div>
            <ul className="space-y-4 mb-10 text-gray-300">
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> 4K Ultra HD Streaming</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Unlimited Devices</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> 100% Ad-Free</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Unlimited Offline Downloads</li>
            </ul>
          </div>
          <button onClick={() => handleSubscribe('499')} className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-bold hover:scale-105 transition-transform shadow-2xl">
            Select Pro Max
          </button>
        </div>
      </div>
    </div>
  );
}

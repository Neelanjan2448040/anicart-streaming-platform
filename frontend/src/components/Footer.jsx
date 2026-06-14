import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 text-gray-400 py-12 mt-20">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold text-white mb-4">AniCart</h3>
          <p className="text-sm">The ultimate platform for ad-free anime binge watching. Stream thousands of episodes instantly.</p>
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/blogs" className="hover:text-pink-500 transition-colors">Blogs</a></li>
            <li><a href="/contacts" className="hover:text-pink-500 transition-colors">Contact Us</a></li>
            <li><a href="/subscription" className="hover:text-pink-500 transition-colors">Premium Subscription</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/terms" className="hover:text-pink-500 transition-colors">Terms of Service</Link></li>
            <li><Link to="/privacy" className="hover:text-pink-500 transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-12 pt-8 border-t border-gray-800 text-sm">
        &copy; {new Date().getFullYear()} AniCart Inc. All Rights Reserved.
      </div>
    </footer>
  );
}

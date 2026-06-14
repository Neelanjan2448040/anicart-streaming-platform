import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();
      if (res.ok) {
        navigate("/login");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to connect to the server.");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-[#0a0a0a]">
      {/* Animated Mesh Gradient Background */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-pink-600/30 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDelay: "2s" }}></div>

      <div className="max-w-md w-full space-y-8 bg-gray-900/60 p-10 rounded-3xl shadow-2xl border border-gray-800 backdrop-blur-md relative z-10 animate-fade-in">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
        <div>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-white">
            Create an Account
          </h2>
          <p className="text-center text-gray-400 mt-2">Join AniCart to start binge-watching</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSignup}>
          {error && <div className="text-red-500 text-sm text-center bg-red-500/10 p-3 rounded">{error}</div>}
          <div className="space-y-4">
            <div>
              <input type="text" required className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 text-white rounded-lg focus:ring-pink-500 focus:border-pink-500 outline-none transition-all" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <input type="email" required className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 text-white rounded-lg focus:ring-pink-500 focus:border-pink-500 outline-none transition-all" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <input type="password" required className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 text-white rounded-lg focus:ring-pink-500 focus:border-pink-500 outline-none transition-all" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>

          <button type="submit" className="w-full py-3 px-4 rounded-lg text-white font-bold bg-white/10 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 border border-gray-700 hover:border-transparent transition-all shadow-lg">
            Sign Up
          </button>
        </form>
        <div className="text-center mt-6">
          <p className="text-sm text-gray-400">
            Already have an account? <Link to="/login" className="text-pink-400 hover:text-pink-300 font-medium">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

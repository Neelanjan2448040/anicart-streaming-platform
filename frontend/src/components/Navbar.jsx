import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faUserCircle, faRobot, faVolumeUp, faVolumeMute } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef(null);
  const navigate = useNavigate();

  const loadUser = () => {
    const u = localStorage.getItem('user');
    if (u) setUser(JSON.parse(u));
    else setUser(null);
  };

  useEffect(() => {
    loadUser();
    window.addEventListener('auth-change', loadUser);
    return () => window.removeEventListener('auth-change', loadUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    window.dispatchEvent(new Event('auth-change'));
    navigate('/');
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.muted = false;
        audioRef.current.play().catch(e => console.log("Autoplay blocked"));
      } else {
        audioRef.current.muted = true;
      }
      setIsMuted(!isMuted);
    }
  };

  return (
    <nav className="bg-gray-900/80 backdrop-blur-md border-b border-gray-800 fixed w-full top-0 z-50">
      <audio ref={audioRef} src="/audio/bgm.mp3" loop muted autoPlay />
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 flex items-center gap-2">
          <FontAwesomeIcon icon={faFilm} className="text-pink-500" />
          AniCart
        </Link>
        <div className="flex items-center gap-6">
          <button onClick={toggleMute} className="text-gray-300 hover:text-white transition-colors" title="Toggle Background Music">
            <FontAwesomeIcon icon={isMuted ? faVolumeMute : faVolumeUp} className="text-xl" />
          </button>
          <Link to="/" className="text-gray-300 hover:text-pink-400 font-medium transition-colors">Home</Link>
          <Link to="/recommend" className="text-gray-300 hover:text-pink-400 font-medium transition-colors flex items-center gap-2">
            <FontAwesomeIcon icon={faRobot} /> AI Guru
          </Link>
          <Link to="/blogs" className="text-gray-300 hover:text-pink-400 font-medium transition-colors">Blogs</Link>
          <Link to="/contacts" className="text-gray-300 hover:text-pink-400 font-medium transition-colors">Contact Us</Link>
          <Link to="/subscription" className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 font-bold hover:scale-105 transition-transform">Premium</Link>
          {user ? (
            <div className="flex items-center gap-4">
              {user.role === 'admin' && (
                <Link to="/admin" className="text-gray-300 hover:text-white font-medium transition-colors">Admin Dashboard</Link>
              )}
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-full border border-gray-700">
                <FontAwesomeIcon icon={faUserCircle} className="text-xl text-pink-500" />
                <span className="font-semibold text-gray-200">Hi, {user.name}!</span>
              </div>
              <button 
                onClick={handleLogout}
                className="px-6 py-2 rounded-full font-bold text-white bg-white/5 hover:bg-red-500/10 hover:text-red-400 border border-gray-700 hover:border-red-500/50 transition-all"
              >
                Log Out
              </button>
            </div>
          ) : (
            <div className="flex gap-4">
              <Link to="/login" className="px-6 py-2 rounded-full font-bold text-white hover:text-pink-400 transition-colors">Log In</Link>
              <Link to="/signup" className="px-6 py-2 rounded-full font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-lg shadow-pink-500/25 transition-all">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

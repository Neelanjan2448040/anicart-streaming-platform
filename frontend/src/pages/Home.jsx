import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/movies`)
      .then(res => res.json())
      .then(data => setMovies(data))
      .catch(err => console.error("Failed to fetch movies", err));
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative h-[80vh] flex items-center justify-center -mt-20 animate-fade-in">
        <div className="relative z-10 text-center px-4 max-w-4xl pt-20">
          <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-6 drop-shadow-2xl tracking-tight leading-tight py-2 animate-slide-up">
            Dive Into Anime
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed mb-10 drop-shadow-lg animate-slide-up delay-200">
            Experience the greatest anime movies and trailers at AniCart. Premium quality, absolute ad-free binge watching.
          </p>
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-10 py-4 rounded-full font-bold text-xl shadow-2xl shadow-pink-500/40 transition-all transform hover:-translate-y-1 animate-slide-up delay-300">
            Start Watching
          </button>
        </div>
      </div>

      {/* Movies Grid */}
      <div className="container mx-auto px-6 py-24">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Trending Now
          </h2>
          <div className="w-24 h-1 bg-pink-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {(user ? movies : movies.slice(0, 3)).map((movie, index) => (
            <div key={movie.id} className="group relative bg-gray-900 rounded-2xl overflow-hidden shadow-2xl hover:shadow-pink-500/20 transition-all duration-500 transform hover:-translate-y-3 border border-gray-800 animate-slide-up" style={{ animationDelay: `${index * 150}ms` }}>
              <div className="aspect-[2/3] relative w-full overflow-hidden bg-gray-800">
                <img 
                  src={`/images/${movie.image}`} 
                  alt={movie.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100" 
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = "https://via.placeholder.com/300x450/1f2937/FFFFFF?text=No+Image";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500"></div>
                
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <Link to={`/movie/${movie.id}`} className="text-pink-500 hover:text-white transition-colors drop-shadow-2xl scale-150 group-hover:scale-100 duration-500">
                    <FontAwesomeIcon icon={faPlayCircle} className="text-7xl" />
                  </Link>
                </div>
              </div>
              
              <div className="p-6 relative z-20 bg-gray-900">
                <h2 className="text-2xl font-bold text-white mb-3 line-clamp-1 group-hover:text-pink-400 transition-colors">{movie.title}</h2>
                <p className="text-gray-400 text-sm line-clamp-3 leading-relaxed">{movie.description}</p>
              </div>
            </div>
          ))}
        </div>

        {!user && (
          <div className="mt-20 text-center bg-gray-900/50 p-10 rounded-3xl border border-gray-800 shadow-2xl backdrop-blur-md">
            <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-6">Log in to unlock the full catalog!</h3>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">You're currently viewing a restricted preview of our vast library. Log in to access all episodes, premium movies, and exclusive content.</p>
            <Link to="/login" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-105 text-white px-10 py-4 rounded-full font-bold transition-transform shadow-2xl inline-block">Log In Now</Link>
          </div>
        )}
      </div>
    </div>
  );
}

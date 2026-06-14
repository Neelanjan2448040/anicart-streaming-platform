import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot, faPlayCircle } from '@fortawesome/free-solid-svg-icons';

export default function Recommend() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/movies`)
      .then(res => res.json())
      .then(data => setMovies(data));
  }, []);

  const handleRecommend = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch('http://localhost:8000/api/ai/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, movies })
      });
      const data = await response.json();
      const match = movies.find(m => m.id === data.recommendation_id);
      setResult(match || null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 animate-fade-in relative max-w-4xl">
      <div className="text-center mb-12">
        <FontAwesomeIcon icon={faRobot} className="text-6xl text-pink-500 mb-6 animate-pulse" />
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
          AI Anime Guru
        </h1>
        <p className="text-xl text-gray-400">Tell me what you're in the mood for, and I'll find the perfect anime!</p>
      </div>

      <form onSubmit={handleRecommend} className="relative mb-16">
        <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
          <FontAwesomeIcon icon={faRobot} className="text-gray-500" />
        </div>
        <input 
          type="text" 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="E.g., I want a dark action anime with giant monsters..."
          className="w-full pl-14 pr-32 md:pr-40 py-6 bg-gray-900/80 border border-gray-700 text-white rounded-full text-base md:text-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none shadow-2xl backdrop-blur-md"
        />
        <button 
          type="submit" 
          disabled={loading}
          className="absolute right-3 top-3 bottom-3 px-6 md:px-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-full transition-all disabled:opacity-50"
        >
          {loading ? "Thinking..." : "Find Anime"}
        </button>
      </form>

      {result && (
        <div className="animate-slide-up">
          <h2 className="text-2xl font-bold text-white mb-6">Your Perfect Match:</h2>
          <div className="flex flex-col md:flex-row gap-8 bg-gray-900/60 rounded-3xl p-6 border border-gray-800 backdrop-blur-xl shadow-2xl">
            <div className="md:w-1/3 aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl">
              <img src={`/images/${result.image}`} alt={result.title} className="w-full h-full object-cover" />
            </div>
            <div className="md:w-2/3 flex flex-col justify-center">
              <h3 className="text-3xl font-black text-white mb-4">{result.title}</h3>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">{result.description}</p>
              <Link to={`/movie/${result.id}`} className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black hover:bg-gray-200 rounded-full font-bold transition-all shadow-lg w-max">
                <FontAwesomeIcon icon={faPlayCircle} className="text-xl" /> Start Watching
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

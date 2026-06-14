import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faCheckCircle, faLock } from '@fortawesome/free-solid-svg-icons';

export default function Movie() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
      return;
    }

    fetch(`${import.meta.env.VITE_API_URL}/movies/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then(data => setMovie(data))
      .catch(() => setError(true));
  }, [id, navigate]);

  const handlePay = (e) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
      setTimeout(() => {
        setShowModal(false);
        setUnlocked(true);
      }, 1500);
    }, 2000);
  };

  if (error) return <div className="text-center py-24 text-red-500 text-2xl font-bold">Movie not found</div>;
  if (!movie) return <div className="text-center py-24 text-pink-500 text-2xl animate-pulse">Loading...</div>;

  const isYouTube = movie.videoUrl.includes("youtube.com") || movie.videoUrl.includes("youtu.be");

  return (
    <div className="container mx-auto px-4 py-12 animate-fade-in relative">
      {/* Payment Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-3xl p-8 max-w-md w-full shadow-2xl relative overflow-hidden animate-slide-up">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 to-pink-500"></div>
            
            {success ? (
              <div className="text-center py-8 animate-fade-in">
                <FontAwesomeIcon icon={faCheckCircle} className="text-6xl text-green-500 mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">Payment Successful!</h2>
                <p className="text-gray-400">Unlocking video...</p>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <FontAwesomeIcon icon={faCreditCard} className="text-pink-500" />
                  Secure Payment
                </h2>
                <div className="bg-gray-800/50 rounded-xl p-4 mb-6 border border-gray-700">
                  <div className="flex justify-between text-gray-300 mb-2">
                    <span>Movie:</span>
                    <span className="font-semibold text-white">{movie.title}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Amount:</span>
                    <span className="font-bold text-pink-400 text-xl">₹15.00</span>
                  </div>
                </div>
                
                <form onSubmit={handlePay} className="space-y-4">
                  <input type="text" placeholder="Card Number (Mock)" required className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 text-white rounded-lg focus:ring-pink-500 outline-none" />
                  <div className="flex gap-4">
                    <input type="text" placeholder="MM/YY" required className="w-1/2 px-4 py-3 bg-gray-800/50 border border-gray-700 text-white rounded-lg focus:ring-pink-500 outline-none" />
                    <input type="text" placeholder="CVV" required className="w-1/2 px-4 py-3 bg-gray-800/50 border border-gray-700 text-white rounded-lg focus:ring-pink-500 outline-none" />
                  </div>
                  <button type="submit" disabled={processing} className="w-full mt-4 py-4 rounded-xl text-white font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-lg shadow-pink-500/30 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                    {processing ? "Processing..." : "Pay ₹15 Now"}
                  </button>
                  <button type="button" onClick={() => setShowModal(false)} className="w-full py-3 text-gray-400 hover:text-white transition-colors">Cancel</button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-12 bg-gray-900/40 rounded-3xl p-8 border border-gray-800/50 shadow-2xl backdrop-blur-xl">
        <div className="md:w-1/3 flex-shrink-0">
          <div className="aspect-[2/3] relative w-full rounded-2xl overflow-hidden shadow-2xl border-2 border-gray-800">
            <img 
              src={`/images/${movie.image}`} 
              alt={movie.title} 
              className="w-full h-full object-cover"
              onError={(e) => { e.target.src = "https://via.placeholder.com/300x450/1f2937/FFFFFF?text=No+Image"; }}
            />
          </div>
        </div>
        
        <div className="md:w-2/3 flex flex-col">
          <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-6 drop-shadow-lg tracking-tight">
            {movie.title}
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed mb-10">
            {movie.description}
          </p>
          
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="w-2 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full inline-block"></span> Watch Now
          </h2>
          
          <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-gray-800 relative group">
            {!unlocked ? (
              <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-md flex flex-col items-center justify-center z-10 rounded-2xl">
                <FontAwesomeIcon icon={faLock} className="text-5xl text-gray-500 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Premium Content</h3>
                <p className="text-gray-400 mb-6 text-center max-w-sm">Unlock this movie for just ₹15 to start streaming in HD.</p>
                <button onClick={() => setShowModal(true)} className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-full font-bold shadow-lg transform hover:-translate-y-1 transition-all">
                  Unlock Now for ₹15
                </button>
              </div>
            ) : null}

            {isYouTube ? (
              <iframe 
                src={`${movie.videoUrl}${unlocked ? '?autoplay=1' : ''}`} 
                className={`w-full h-full ${!unlocked ? 'opacity-30 blur-sm pointer-events-none' : ''}`} 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            ) : (
              <video 
                src={movie.videoUrl} 
                className={`w-full h-full object-contain ${!unlocked ? 'opacity-30 blur-sm pointer-events-none' : ''}`} 
                controls={unlocked}
                autoPlay={unlocked}
              >
              </video>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

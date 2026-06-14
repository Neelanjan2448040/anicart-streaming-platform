import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function Admin() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      navigate("/");
      return;
    }
    const user = JSON.parse(userStr);
    if (user.role !== "admin") {
      navigate("/");
      return;
    }
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/movies`);
      const data = await res.json();
      setMovies(data);
    } catch (err) {
      console.error(err);
    }
  };

  const [isGenerating, setIsGenerating] = useState(false);

  const handleAdd = async (e) => {
    e.preventDefault();
    setError("");
    
    let finalImage = image;
    if (!finalImage) {
      setIsGenerating(true);
      // Simulate AI generation
      await new Promise(r => setTimeout(r, 2000));
      finalImage = "demonslayer.png"; // Assign a mocked AI generated image
      setIsGenerating(false);
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/movies`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, image: finalImage, videoUrl })
      });
      if (res.ok) {
        setTitle("");
        setDescription("");
        setImage("");
        setVideoUrl("");
        fetchMovies();
      } else {
        const data = await res.json();
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to add movie.");
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this movie?")) {
      try {
        await fetch(`${import.meta.env.VITE_API_URL}/movies/${id}`, { method: "DELETE" });
        fetchMovies();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-8">
        Admin Dashboard
      </h1>

      <div className="bg-gray-900 p-8 rounded-xl border border-gray-800 shadow-2xl mb-12">
        <h2 className="text-2xl font-bold text-white mb-6">Add New Movie</h2>
        <form onSubmit={handleAdd} className="space-y-4">
          {error && <p className="text-red-500">{error}</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Title" required className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded focus:ring-pink-500 focus:border-pink-500 outline-none transition-colors" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input type="text" placeholder="Image Filename (leave blank for Auto AI Cover)" className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded focus:ring-pink-500 focus:border-pink-500 outline-none transition-colors" value={image} onChange={(e) => setImage(e.target.value)} />
            <input type="text" placeholder="Video URL (/videos/... or YouTube Embed URL)" required className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded focus:ring-pink-500 focus:border-pink-500 outline-none transition-colors md:col-span-2" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />
            <textarea placeholder="Description" required rows="3" className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded focus:ring-pink-500 focus:border-pink-500 outline-none transition-colors md:col-span-2" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
          </div>
          <button type="submit" disabled={isGenerating} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded shadow-lg transition-all transform hover:-translate-y-0.5 mt-4 disabled:opacity-50 disabled:cursor-not-allowed">
            <FontAwesomeIcon icon={faPlus} /> {isGenerating ? "AI Generating Cover..." : "Add Movie"}
          </button>
        </form>
      </div>

      <div className="bg-gray-900 p-8 rounded-xl border border-gray-800 shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-6">Manage Movies</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-gray-300 border-collapse">
            <thead>
              <tr className="border-b border-gray-800 text-gray-400">
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Image</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((m) => (
                <tr key={m.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                  <td className="py-3 px-4 font-semibold text-white">{m.title}</td>
                  <td className="py-3 px-4 text-sm text-gray-500">{m.image}</td>
                  <td className="py-3 px-4 text-right">
                    <button onClick={() => handleDelete(m.id)} className="text-red-500 hover:text-red-400 transition-colors px-3 py-2 bg-red-500/10 rounded font-medium text-sm">
                      <FontAwesomeIcon icon={faTrash} className="mr-1" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {movies.length === 0 && <p className="text-gray-500 mt-6 text-center">No movies found.</p>}
        </div>
      </div>
    </div>
  );
}

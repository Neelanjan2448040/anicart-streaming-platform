import React from 'react';
import { Link } from 'react-router-dom';

const blogs = [
  { id: 1, title: "The Evolution of Shonen Anime", snippet: "From Dragon Ball to Demon Slayer, explore how the Shonen genre has completely transformed over the last 30 years.", image: "aot.png" },
  { id: 2, title: "Why Makoto Shinkai Films Always Break the Box Office", snippet: "Analyzing the breathtaking visual storytelling of 'Your Name' and 'Weathering With You'.", image: "yourname.png" },
  { id: 3, title: "Top 10 Hidden Gem Anime of 2026", snippet: "You probably missed these incredible shows. Here is our ultimate list for your next binge session.", image: "deathnote.png" }
];

export default function Blogs() {
  return (
    <div className="container mx-auto px-6 py-24 min-h-[80vh]">
      <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-12 text-center drop-shadow-2xl">
        AniCart Editorial
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {blogs.map(blog => (
          <Link to={`/blogs/${blog.id}`} key={blog.id} className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 shadow-2xl hover:scale-105 transition-transform cursor-pointer block">
            <img src={`/images/${blog.image}`} alt={blog.title} className="w-full h-48 object-cover opacity-80 hover:opacity-100 transition-opacity" />
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-3">{blog.title}</h2>
              <p className="text-gray-400 text-sm leading-relaxed">{blog.snippet}</p>
              <div className="mt-4 text-pink-500 font-bold hover:text-pink-400">Read More &rarr;</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

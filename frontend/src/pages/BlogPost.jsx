import React from 'react';
import { useParams, Link } from 'react-router-dom';

const blogsData = {
  1: { title: "The Evolution of Shonen Anime", image: "aot.png", content: "From the early days of Dragon Ball to the modern masterpiece of Demon Slayer, Shonen anime has constantly evolved. The pacing is faster, the animation budgets are massive, and the emotional stakes have never been higher. Let's dive into how studios like MAPPA and Ufotable changed the game..." },
  2: { title: "Why Makoto Shinkai Films Always Break the Box Office", image: "yourname.png", content: "Makoto Shinkai is a master of visual poetry. In films like 'Your Name', the intertwining of cosmic events with teenage romance creates an undeniable magic. The hyper-realistic backgrounds combined with RADWIMPS' incredible soundtracks create an immersive experience..." },
  3: { title: "Top 10 Hidden Gem Anime of 2026", image: "deathnote.png", content: "While everyone is watching the big sequels, there are some incredible hidden gems releasing this year. We have curated a list of the top 10 anime that you absolutely cannot afford to miss this season..." }
};

export default function BlogPost() {
  const { id } = useParams();
  const blog = blogsData[id];

  if (!blog) {
    return <div className="text-center text-white py-24 text-2xl">Blog post not found!</div>;
  }

  return (
    <div className="container mx-auto px-6 py-24 min-h-[80vh] max-w-4xl">
      <Link to="/blogs" className="text-pink-500 hover:text-pink-400 mb-8 inline-block font-bold">&larr; Back to Editorial</Link>
      <h1 className="text-5xl font-black text-white mb-8 leading-tight">{blog.title}</h1>
      <img src={`/images/${blog.image}`} alt={blog.title} className="w-full h-96 object-cover rounded-2xl shadow-2xl mb-12 border border-gray-800" />
      <div className="text-gray-300 text-lg leading-loose space-y-6">
        <p>{blog.content}</p>
        <p>Furthermore, the industry is seeing a massive shift towards global simultaneous releases, breaking down the barriers that used to separate Japanese audiences from the rest of the world. This globalization of anime has led to higher production values and more diverse storytelling.</p>
        <p>In conclusion, the future of anime is brighter than ever, and platforms like AniCart are at the forefront of delivering these masterpieces to fans worldwide.</p>
      </div>
    </div>
  );
}

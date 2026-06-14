import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Movie from './pages/Movie';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Admin from './pages/Admin';
import Recommend from './pages/Recommend';
import Contacts from './pages/Contacts';
import Blogs from './pages/Blogs';
import BlogPost from './pages/BlogPost';
import Subscription from './pages/Subscription';
import Payment from './pages/Payment';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <div className="min-h-screen text-white selection:bg-pink-500/30 font-sans flex flex-col justify-between relative">
      <div className="fixed inset-0 z-[-2] bg-cover bg-center" style={{ backgroundImage: "url('/images/bg.png')" }}></div>
      <div className="fixed inset-0 z-[-1] bg-[#0a0a0a]/60"></div>
      <div className="relative z-10">
        <Navbar />
        <div className="pt-24 pb-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<Movie />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/recommend" element={<Recommend />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:id" element={<BlogPost />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
          </Routes>
        </div>
      </div>
      <Chatbot />
      <Footer />
    </div>
  );
}

export default App;

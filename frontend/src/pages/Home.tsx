import React from "react";
import {  Key } from "lucide-react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-linear-to-b from-[#0d0d0d] to-[#1a1a1a] text-white">
      
      {/* Top Navbar */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <div className="text-lg font-semibold tracking-wide">
          GearboxAI <span className="font-light">Platform</span>
        </div>

        <div className="flex items-center gap-6 text-sm">
         

          <Link to="/login" className="px-4 py-1.5 rounded-md bg-zinc-800 hover:bg-zinc-700 transition">
            Log in
          </Link>

          <Link to="/login" className="px-4 py-1.5 rounded-md bg-white text-black hover:bg-gray-200 transition">
            Sign up
          </Link>
        </div>
      </header>

      <div className="flex">
        
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-64 h-screen border-r border-white/10 p-6 gap-6 text-gray-300">
          <nav className="flex flex-col gap-5 text-sm">
            
            {/* <a
              href="#"
              className="flex items-center gap-3 hover:text-white transition"
            >
              <BookOpen size={18} />
              Cookbook
            </a>

            <a
              href="#"
              className="flex items-center gap-3 hover:text-white transition"
            >
              <MessageSquare size={18} />
              Forum
            </a> */}

          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center px-4 py-20">
          
          <div className="w-full max-w-3xl bg-zinc-900/60 border border-white/10 rounded-2xl p-12 text-center shadow-2xl backdrop-blur-md">
            
            <div className="flex justify-center mb-6">
              <div className="bg-zinc-800 p-4 rounded-xl">
              <Key size={28} className="text-gray-300" />
              </div>
            </div>

            <h2 className="text-xl font-semibold mb-2">
              Authentication required
            </h2>

            <p className="text-gray-400 mb-6 text-sm">
              Please log in to access this page
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/login" className="px-5 py-2 rounded-md bg-zinc-800 hover:bg-zinc-700 transition">
                Log in
              </Link>

              <Link to="/login" className="px-5 py-2 rounded-md bg-white text-black hover:bg-gray-200 transition">
                Sign up
              </Link>
            </div>

          </div>

        </main>
      </div>
    </div>
  );
};

export default Home;
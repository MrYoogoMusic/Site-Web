import React from 'react';
import { Play, TrendingUp } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1501962679900-bea61483313b"
          alt="Rock concert"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
          L'Univers du
          <span className="block text-red-600 mt-2">Rock & Metal</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Découvrez les plus grands groupes de rock, hard rock et metal. 
          Explorez leurs albums légendaires et restez connectés avec la scène.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#albums"
            className="group flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105"
          >
            <Play className="w-5 h-5" />
            <span>Explorer les Albums</span>
          </a>
          <a
            href="#artists"
            className="group flex items-center space-x-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold transition-all border border-white/20 transform hover:scale-105"
          >
            <TrendingUp className="w-5 h-5" />
            <span>Découvrir les Artistes</span>
          </a>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-red-600 mb-2">150+</div>
            <div className="text-sm text-gray-400">Albums</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-red-600 mb-2">50+</div>
            <div className="text-sm text-gray-400">Artistes</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-red-600 mb-2">1000+</div>
            <div className="text-sm text-gray-400">Morceaux</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-red-600 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

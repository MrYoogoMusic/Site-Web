import React, { useState } from 'react';
import { mockAlbums } from '../data/mock';
import { Play, Star, Clock } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

const Albums = () => {
  const [selectedGenre, setSelectedGenre] = useState('Tous');
  
  const genres = ['Tous', 'Heavy Metal', 'Hard Rock', 'Metal'];
  
  const filteredAlbums = selectedGenre === 'Tous' 
    ? mockAlbums 
    : mockAlbums.filter(album => album.genre === selectedGenre);

  return (
    <section id="albums" className="py-20 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Albums Légendaires
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Une collection des meilleurs albums de rock et metal qui ont marqué l'histoire
          </p>
        </div>

        {/* Genre Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedGenre === genre
                  ? 'bg-red-600 text-white'
                  : 'bg-zinc-900 text-gray-400 hover:bg-zinc-800 hover:text-white'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* Albums Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAlbums.map((album) => (
            <Card 
              key={album.id} 
              className="bg-zinc-900 border-zinc-800 hover:border-red-600/50 transition-all duration-300 group overflow-hidden"
            >
              <div className="relative overflow-hidden">
                <img
                  src={album.cover}
                  alt={album.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-full transform scale-0 group-hover:scale-100 transition-transform">
                    <Play className="w-6 h-6" />
                  </button>
                </div>
                <Badge className="absolute top-4 right-4 bg-red-600 text-white">
                  {album.genre}
                </Badge>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-500 transition-colors">
                  {album.title}
                </h3>
                <p className="text-gray-400 mb-4">{album.artist}</p>
                
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                  {album.description}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span>{album.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{album.duration}</span>
                  </div>
                  <span>{album.year}</span>
                </div>

                <div className="mt-4 pt-4 border-t border-zinc-800">
                  <span className="text-xs text-gray-500">{album.tracks} morceaux</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Albums;

import React from 'react';
import { mockArtists } from '../data/mock';
import { MapPin, Calendar, Music } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

const Artists = () => {
  return (
    <section id="artists" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Artistes & Groupes
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Découvrez les légendes du rock et les nouveaux talents qui façonnent la scène
          </p>
        </div>

        {/* Artists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mockArtists.map((artist) => (
            <Card 
              key={artist.id}
              className="bg-zinc-900 border-zinc-800 hover:border-red-600/50 transition-all duration-300 group overflow-hidden"
            >
              <div className="md:flex">
                {/* Artist Image */}
                <div className="md:w-1/3 relative overflow-hidden">
                  <img
                    src={artist.image}
                    alt={artist.name}
                    className="w-full h-64 md:h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                </div>

                {/* Artist Info */}
                <CardContent className="md:w-2/3 p-6 flex flex-col justify-center">
                  <div className="mb-4">
                    <Badge className="bg-red-600 text-white mb-3">
                      {artist.genre}
                    </Badge>
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-red-500 transition-colors">
                      {artist.name}
                    </h3>
                  </div>

                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {artist.bio}
                  </p>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-red-600" />
                      <span>{artist.country}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-red-600" />
                      <span>Formé en {artist.formed}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Music className="w-4 h-4 text-red-600" />
                      <span>{artist.genre}</span>
                    </div>
                  </div>

                  <button className="mt-6 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors w-full md:w-auto">
                    Voir la discographie
                  </button>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Artists;

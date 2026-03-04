import React from 'react';
import { mockNews, mockConcerts } from '../data/mock';
import { Calendar, MapPin, Ticket, Clock } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";

const News = () => {
  return (
    <section id="news" className="py-20 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Actualités & Concerts
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Restez informés des dernières nouvelles et dates de concerts
          </p>
        </div>

        <Tabs defaultValue="news" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
            <TabsTrigger value="news">Actualités</TabsTrigger>
            <TabsTrigger value="concerts">Concerts</TabsTrigger>
          </TabsList>

          {/* News Tab */}
          <TabsContent value="news">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {mockNews.map((news) => (
                <Card 
                  key={news.id}
                  className="bg-zinc-900 border-zinc-800 hover:border-red-600/50 transition-all duration-300 group overflow-hidden"
                >
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={news.image}
                      alt={news.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                    <Badge className="absolute top-4 left-4 bg-red-600 text-white">
                      {news.category}
                    </Badge>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
                      <Clock className="w-4 h-4" />
                      <span>{new Date(news.date).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-500 transition-colors">
                      {news.title}
                    </h3>
                    
                    <p className="text-gray-400 mb-4">
                      {news.excerpt}
                    </p>

                    <button className="text-red-500 hover:text-red-400 font-medium text-sm transition-colors">
                      Lire la suite →
                    </button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Concerts Tab */}
          <TabsContent value="concerts">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockConcerts.map((concert) => (
                <Card 
                  key={concert.id}
                  className="bg-zinc-900 border-zinc-800 hover:border-red-600/50 transition-all duration-300 group"
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-500 transition-colors">
                          {concert.artist}
                        </h3>
                        <p className="text-gray-400">{concert.venue}</p>
                      </div>
                      {concert.ticketsAvailable ? (
                        <Badge className="bg-green-600 text-white">
                          Disponible
                        </Badge>
                      ) : (
                        <Badge className="bg-gray-600 text-white">
                          Complet
                        </Badge>
                      )}
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center space-x-3 text-gray-400">
                        <Calendar className="w-5 h-5 text-red-600" />
                        <span>{new Date(concert.date).toLocaleDateString('fr-FR', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}</span>
                      </div>
                      <div className="flex items-center space-x-3 text-gray-400">
                        <Clock className="w-5 h-5 text-red-600" />
                        <span>{concert.time}</span>
                      </div>
                      <div className="flex items-center space-x-3 text-gray-400">
                        <MapPin className="w-5 h-5 text-red-600" />
                        <span>{concert.city}, {concert.country}</span>
                      </div>
                      <div className="flex items-center space-x-3 text-gray-400">
                        <Ticket className="w-5 h-5 text-red-600" />
                        <span className="font-semibold text-white">{concert.price}</span>
                      </div>
                    </div>

                    <button 
                      disabled={!concert.ticketsAvailable}
                      className={`w-full py-3 rounded-lg font-semibold transition-all ${
                        concert.ticketsAvailable
                          ? 'bg-red-600 hover:bg-red-700 text-white'
                          : 'bg-zinc-800 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {concert.ticketsAvailable ? 'Réserver des billets' : 'Complet'}
                    </button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default News;

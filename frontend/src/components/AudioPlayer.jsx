import React, { useState } from 'react';
import { mockTracks } from '../data/mock';
import { Play, Pause, SkipForward, SkipBack, Volume2, Shuffle, Repeat } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Slider } from './ui/slider';

const AudioPlayer = () => {
  const [currentTrack, setCurrentTrack] = useState(mockTracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(70);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    // Note: This is mock functionality - real playback will be integrated with Spotify later
  };

  const handleTrackSelect = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    setCurrentTime(0);
  };

  const handleNext = () => {
    const currentIndex = mockTracks.findIndex(t => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % mockTracks.length;
    setCurrentTrack(mockTracks[nextIndex]);
  };

  const handlePrevious = () => {
    const currentIndex = mockTracks.findIndex(t => t.id === currentTrack.id);
    const prevIndex = currentIndex === 0 ? mockTracks.length - 1 : currentIndex - 1;
    setCurrentTrack(mockTracks[prevIndex]);
  };

  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Lecteur Audio
          </h2>
          <p className="text-gray-400 text-lg">
            Écoutez les meilleurs morceaux de rock et metal
          </p>
          <p className="text-xs text-gray-500 mt-2">
            (Mode démo - L'intégration Spotify sera disponible prochainement)
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Player */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-8">
              {/* Album Art */}
              <div className="relative mb-6">
                <img
                  src="https://images.unsplash.com/photo-1501962679900-bea61483313b"
                  alt="Album cover"
                  className="w-full aspect-square object-cover rounded-lg"
                />
                <div className={`absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center ${isPlaying ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
                  <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
              </div>

              {/* Track Info */}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {currentTrack.title}
                </h3>
                <p className="text-gray-400">{currentTrack.artist}</p>
                <p className="text-sm text-gray-500">{currentTrack.album}</p>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <Slider
                  value={[currentTime]}
                  max={100}
                  step={1}
                  className="mb-2"
                  onValueChange={(value) => setCurrentTime(value[0])}
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0:00</span>
                  <span>{currentTrack.duration}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center space-x-4 mb-6">
                <button className="text-gray-400 hover:text-white transition-colors">
                  <Shuffle className="w-5 h-5" />
                </button>
                <button 
                  onClick={handlePrevious}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <SkipBack className="w-6 h-6" />
                </button>
                <button
                  onClick={handlePlayPause}
                  className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-full transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6 ml-1" />
                  )}
                </button>
                <button 
                  onClick={handleNext}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <SkipForward className="w-6 h-6" />
                </button>
                <button className="text-gray-400 hover:text-white transition-colors">
                  <Repeat className="w-5 h-5" />
                </button>
              </div>

              {/* Volume */}
              <div className="flex items-center space-x-3">
                <Volume2 className="w-5 h-5 text-gray-400" />
                <Slider
                  value={[volume]}
                  max={100}
                  step={1}
                  className="flex-1"
                  onValueChange={(value) => setVolume(value[0])}
                />
                <span className="text-sm text-gray-400 w-10">{volume}%</span>
              </div>
            </CardContent>
          </Card>

          {/* Playlist */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-white mb-4">Playlist</h3>
              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {mockTracks.map((track, index) => (
                  <button
                    key={track.id}
                    onClick={() => handleTrackSelect(track)}
                    className={`w-full p-4 rounded-lg transition-all hover:bg-zinc-800 ${
                      currentTrack.id === track.id 
                        ? 'bg-red-600/20 border border-red-600/50' 
                        : 'bg-zinc-800/50'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`flex-shrink-0 w-8 h-8 rounded flex items-center justify-center ${
                        currentTrack.id === track.id ? 'bg-red-600' : 'bg-zinc-700'
                      }`}>
                        {currentTrack.id === track.id && isPlaying ? (
                          <Pause className="w-4 h-4 text-white" />
                        ) : (
                          <Play className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div className="flex-1 text-left">
                        <div className="text-white font-medium">{track.title}</div>
                        <div className="text-sm text-gray-400">{track.artist}</div>
                      </div>
                      <div className="text-sm text-gray-500">{track.duration}</div>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AudioPlayer;

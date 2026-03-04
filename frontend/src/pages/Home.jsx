import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Albums from '../components/Albums';
import AudioPlayer from '../components/AudioPlayer';
import Artists from '../components/Artists';
import News from '../components/News';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <Hero />
      <Albums />
      <AudioPlayer />
      <Artists />
      <News />
      <Footer />
    </div>
  );
};

export default Home;

import Head from 'next/head';
import Header from '../src/components/Header';
import Hero from '../src/components/Hero';
import Albums from '../src/components/Albums';
import AudioPlayer from '../src/components/AudioPlayer';
import Artists from '../src/components/Artists';
import News from '../src/components/News';
import Footer from '../src/components/Footer';

export default function Home() {
  return (
    <>
      <Head>
        <title>RockZone - L'Univers du Rock, Hard Rock & Metal</title>
        <meta 
          name="description" 
          content="Découvrez les plus grands groupes de rock, hard rock et metal. Explorez leurs albums légendaires, restez connectés avec la scène musicale et ne manquez aucun concert." 
        />
        <meta name="keywords" content="rock, hard rock, metal, musique, albums, concerts, artistes, heavy metal" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mryoogomusic.fr/" />
        <meta property="og:title" content="RockZone - L'Univers du Rock, Hard Rock & Metal" />
        <meta property="og:description" content="Découvrez les plus grands groupes de rock, hard rock et metal." />
        <meta property="og:image" content="https://mryoogomusic.fr/og-image.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://mryoogomusic.fr/" />
        <meta property="twitter:title" content="RockZone - L'Univers du Rock, Hard Rock & Metal" />
        <meta property="twitter:description" content="Découvrez les plus grands groupes de rock, hard rock et metal." />
        <meta property="twitter:image" content="https://mryoogomusic.fr/og-image.jpg" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" content="/apple-touch-icon.png" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://mryoogomusic.fr/" />
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "RockZone",
              "description": "Plateforme de découverte musicale rock, hard rock et metal",
              "url": "https://mryoogomusic.fr",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://mryoogomusic.fr/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </Head>

      <div className="min-h-screen bg-black">
        <Header />
        <main>
          <Hero />
          <Albums />
          <AudioPlayer />
          <Artists />
          <News />
        </main>
        <Footer />
      </div>
    </>
  );
}

// ISR - Revalidate every 5 minutes
export async function getStaticProps() {
  return {
    props: {},
    revalidate: 300, // 5 minutes
  };
}

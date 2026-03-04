// Mock data for the music website

export const mockArtists = [
  {
    id: 1,
    name: "Iron Fury",
    genre: "Heavy Metal",
    image: "https://images.unsplash.com/photo-1569529787187-de9dc5347a91",
    bio: "Iron Fury est un groupe de heavy metal formé en 2010. Connu pour leurs riffs puissants et leurs performances énergiques, ils ont conquis la scène européenne avec leurs albums légendaires.",
    country: "France",
    formed: 2010
  },
  {
    id: 2,
    name: "Crimson Shadows",
    genre: "Hard Rock",
    image: "https://images.unsplash.com/photo-1584993498976-1e1f95aa527c",
    bio: "Crimson Shadows mélange le hard rock classique avec des éléments modernes. Leur son unique et leurs textes profonds ont captivé des milliers de fans à travers le monde.",
    country: "France",
    formed: 2015
  },
  {
    id: 3,
    name: "Black Thunder",
    genre: "Metal",
    image: "https://images.unsplash.com/photo-1606614520047-8ad516d9d84b",
    bio: "Black Thunder représente l'essence du metal moderne. Leurs compositions techniques et leur énergie sur scène en font l'un des groupes les plus prometteurs de la scène.",
    country: "France",
    formed: 2018
  },
  {
    id: 4,
    name: "Steel Revolution",
    genre: "Hard Rock",
    image: "https://images.unsplash.com/photo-1590721791974-d6c8ca43f6bc",
    bio: "Steel Revolution incarne l'esprit rebelle du rock. Leurs hymnes puissants et leurs performances explosives ont marqué une génération de fans de rock.",
    country: "France",
    formed: 2012
  }
];

export const mockAlbums = [
  {
    id: 1,
    title: "Thunderstrike",
    artist: "Iron Fury",
    artistId: 1,
    year: 2022,
    cover: "https://images.unsplash.com/photo-1501962679900-bea61483313b",
    genre: "Heavy Metal",
    tracks: 12,
    duration: "52:30",
    rating: 4.8,
    description: "Un album explosif qui redéfinit le heavy metal moderne avec des riffs dévastateurs et des solos époustouflants."
  },
  {
    id: 2,
    title: "Crimson Night",
    artist: "Crimson Shadows",
    artistId: 2,
    year: 2023,
    cover: "https://images.unsplash.com/photo-1584993498976-1e1f95aa527c",
    genre: "Hard Rock",
    tracks: 10,
    duration: "45:20",
    rating: 4.6,
    description: "Une œuvre sombre et captivante qui explore les profondeurs du hard rock avec une intensité rare."
  },
  {
    id: 3,
    title: "Electric Storm",
    artist: "Black Thunder",
    artistId: 3,
    year: 2023,
    cover: "https://images.unsplash.com/photo-1606614520047-8ad516d9d84b",
    genre: "Metal",
    tracks: 11,
    duration: "49:15",
    rating: 4.9,
    description: "Un déluge de riffs techniques et de breakdowns brutaux qui définissent le metal contemporain."
  },
  {
    id: 4,
    title: "Revolution Rising",
    artist: "Steel Revolution",
    artistId: 4,
    year: 2021,
    cover: "https://images.unsplash.com/photo-1590721791974-d6c8ca43f6bc",
    genre: "Hard Rock",
    tracks: 13,
    duration: "56:40",
    rating: 4.7,
    description: "Un appel à la rébellion avec des hymnes rock puissants qui résonnent avec l'énergie de la rue."
  },
  {
    id: 5,
    title: "Midnight Rage",
    artist: "Iron Fury",
    artistId: 1,
    year: 2020,
    cover: "https://images.unsplash.com/photo-1569529787187-de9dc5347a91",
    genre: "Heavy Metal",
    tracks: 10,
    duration: "47:30",
    rating: 4.5,
    description: "Le premier chef-d'œuvre d'Iron Fury qui a établi leur réputation sur la scène metal internationale."
  },
  {
    id: 6,
    title: "Shattered Dreams",
    artist: "Crimson Shadows",
    artistId: 2,
    year: 2021,
    cover: "https://images.unsplash.com/photo-1501962679900-bea61483313b",
    genre: "Hard Rock",
    tracks: 9,
    duration: "42:10",
    rating: 4.4,
    description: "Un album introspectif qui mêle mélodies accrocheuses et riffs agressifs avec maestria."
  }
];

export const mockTracks = [
  {
    id: 1,
    title: "Fire and Steel",
    artist: "Iron Fury",
    album: "Thunderstrike",
    albumId: 1,
    duration: "4:32",
    previewUrl: "mock-preview-1"
  },
  {
    id: 2,
    title: "Crimson Dawn",
    artist: "Crimson Shadows",
    album: "Crimson Night",
    albumId: 2,
    duration: "5:15",
    previewUrl: "mock-preview-2"
  },
  {
    id: 3,
    title: "Thunder Roars",
    artist: "Black Thunder",
    album: "Electric Storm",
    albumId: 3,
    duration: "4:48",
    previewUrl: "mock-preview-3"
  },
  {
    id: 4,
    title: "Revolution Anthem",
    artist: "Steel Revolution",
    album: "Revolution Rising",
    albumId: 4,
    duration: "5:02",
    previewUrl: "mock-preview-4"
  },
  {
    id: 5,
    title: "Midnight Warrior",
    artist: "Iron Fury",
    album: "Midnight Rage",
    albumId: 5,
    duration: "4:20",
    previewUrl: "mock-preview-5"
  }
];

export const mockNews = [
  {
    id: 1,
    title: "Iron Fury annonce une tournée européenne pour 2024",
    date: "2024-01-15",
    category: "Tournée",
    image: "https://images.unsplash.com/photo-1501962679900-bea61483313b",
    excerpt: "Le groupe de heavy metal Iron Fury vient d'annoncer une tournée majeure à travers l'Europe avec 25 dates prévues.",
    content: "Iron Fury a confirmé sa plus grande tournée européenne avec des dates dans 15 pays. Les billets seront en vente dès le mois prochain."
  },
  {
    id: 2,
    title: "Crimson Shadows dévoile un nouveau single explosif",
    date: "2024-01-10",
    category: "Sortie",
    image: "https://images.unsplash.com/photo-1584993498976-1e1f95aa527c",
    excerpt: "Le nouveau single 'Shadows Fall' marque un tournant dans la carrière du groupe avec un son plus agressif.",
    content: "Crimson Shadows continue d'évoluer avec ce nouveau single qui promet d'être un hymne pour les fans de hard rock."
  },
  {
    id: 3,
    title: "Festival Rock Legends 2024: La programmation dévoilée",
    date: "2024-01-05",
    category: "Festival",
    image: "https://images.unsplash.com/photo-1590721791974-d6c8ca43f6bc",
    excerpt: "Le festival Rock Legends révèle une programmation exceptionnelle avec les plus grands noms du rock et du metal.",
    content: "Iron Fury, Crimson Shadows et Black Thunder seront en tête d'affiche du festival qui se déroulera en juin 2024."
  },
  {
    id: 4,
    title: "Black Thunder remporte le prix du meilleur album metal",
    date: "2023-12-20",
    category: "Prix",
    image: "https://images.unsplash.com/photo-1606614520047-8ad516d9d84b",
    excerpt: "Electric Storm a été couronné meilleur album metal de l'année lors des Rock Awards 2023.",
    content: "Une reconnaissance bien méritée pour Black Thunder qui a dominé la scène metal cette année avec leur album technique et brutal."
  }
];

export const mockConcerts = [
  {
    id: 1,
    artist: "Iron Fury",
    artistId: 1,
    venue: "Zénith de Paris",
    city: "Paris",
    country: "France",
    date: "2024-03-15",
    time: "20:00",
    ticketsAvailable: true,
    price: "45€"
  },
  {
    id: 2,
    artist: "Crimson Shadows",
    artistId: 2,
    venue: "Le Trabendo",
    city: "Paris",
    country: "France",
    date: "2024-02-28",
    time: "19:30",
    ticketsAvailable: true,
    price: "35€"
  },
  {
    id: 3,
    artist: "Black Thunder",
    artistId: 3,
    venue: "La Cigale",
    city: "Paris",
    country: "France",
    date: "2024-04-10",
    time: "20:30",
    ticketsAvailable: true,
    price: "40€"
  },
  {
    id: 4,
    artist: "Steel Revolution",
    artistId: 4,
    venue: "Bataclan",
    city: "Paris",
    country: "France",
    date: "2024-05-05",
    time: "20:00",
    ticketsAvailable: false,
    price: "42€"
  }
];

export const mockVideos = [
  {
    id: 1,
    title: "Iron Fury - Fire and Steel (Official Video)",
    artist: "Iron Fury",
    thumbnail: "https://images.unsplash.com/photo-1501962679900-bea61483313b",
    videoId: "mock-video-1",
    views: "1.2M",
    duration: "4:32"
  },
  {
    id: 2,
    title: "Crimson Shadows - Shadows Fall (Live)",
    artist: "Crimson Shadows",
    thumbnail: "https://images.unsplash.com/photo-1584993498976-1e1f95aa527c",
    videoId: "mock-video-2",
    views: "850K",
    duration: "5:15"
  },
  {
    id: 3,
    title: "Black Thunder - Electric Storm (Official)",
    artist: "Black Thunder",
    thumbnail: "https://images.unsplash.com/photo-1606614520047-8ad516d9d84b",
    videoId: "mock-video-3",
    views: "2.1M",
    duration: "4:48"
  }
];

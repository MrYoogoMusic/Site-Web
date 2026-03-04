# RockZone - Site Web Musical Rock/Metal
## Document de Spécifications du Produit

**Date de création:** 15 janvier 2024  
**Dernière mise à jour:** 15 janvier 2024

---

## 1. Vue d'ensemble du projet

**Description:** RockZone est une plateforme web complète dédiée à l'univers du rock, hard rock et metal. Elle permet aux fans de découvrir des albums, des artistes, de suivre l'actualité et les concerts.

**Objectif:** Créer une expérience immersive pour les fans de musique rock/metal avec un design moderne et des fonctionnalités riches.

---

## 2. User Personas

### Persona 1: Le Fan Passionné
- Âge: 25-45 ans
- Intérêts: Découvrir de nouveaux albums, suivre ses groupes préférés
- Besoins: Actualités, dates de concerts, écoute d'extraits

### Persona 2: Le Découvreur
- Âge: 18-30 ans
- Intérêts: Explorer différents styles de rock/metal
- Besoins: Navigation facile, filtres par genre, biographies d'artistes

---

## 3. Exigences fonctionnelles

### Phase 1: Frontend avec Mock Data ✅ (Terminé - 15/01/2024)

**Sections implémentées:**
- ✅ Header avec navigation responsive
- ✅ Hero section avec statistiques et CTA
- ✅ Section Albums avec filtres par genre
- ✅ Lecteur audio mock avec playlist
- ✅ Section Artistes avec biographies
- ✅ Section Actualités & Concerts avec tabs
- ✅ Footer avec liens et réseaux sociaux

**Fonctionnalités mock:**
- Données mock dans `/app/frontend/src/data/mock.js`
- 4 artistes fictifs avec biographies
- 6 albums avec détails complets
- 5 morceaux dans la playlist
- 4 actualités
- 4 concerts à venir
- Lecteur audio interactif (UI seulement)

### Phase 2: Backend (À développer)

**API Endpoints à créer:**

```
# Albums
GET    /api/albums                    # Liste des albums
GET    /api/albums/:id                # Détails d'un album
GET    /api/albums/genre/:genre       # Filtrer par genre
POST   /api/albums                    # Ajouter un album (admin)

# Artistes
GET    /api/artists                   # Liste des artistes
GET    /api/artists/:id               # Détails d'un artiste
GET    /api/artists/:id/albums        # Albums d'un artiste

# Actualités
GET    /api/news                      # Liste des actualités
GET    /api/news/:id                  # Détails d'une actualité
GET    /api/news/category/:category   # Filtrer par catégorie

# Concerts
GET    /api/concerts                  # Liste des concerts
GET    /api/concerts/upcoming         # Concerts à venir
GET    /api/concerts/artist/:artistId # Concerts d'un artiste
```

**Modèles MongoDB:**
- Artist (name, genre, bio, image, country, formed, albums[])
- Album (title, artist, year, cover, genre, tracks, duration, description)
- Track (title, artist, album, duration, spotifyUrl, youtubeUrl)
- News (title, date, category, image, excerpt, content)
- Concert (artist, venue, city, date, time, price, ticketsAvailable)

### Phase 3: Intégrations externes (À développer)

**Intégration Spotify:**
- Authentification OAuth
- Recherche de morceaux
- Lecture audio avec Web Playback SDK
- Gestion Premium/Free users

**Intégration YouTube:**
- Intégration de clips vidéo
- Lecture de playlists
- Recherche de contenus musicaux

---

## 4. Architecture technique

**Stack:**
- Frontend: React 19, TailwindCSS, Shadcn/UI
- Backend: FastAPI, Python
- Database: MongoDB
- Intégrations: Spotify Web API, YouTube Data API v3

**Structure Frontend:**
```
/app/frontend/src/
├── components/
│   ├── Header.jsx
│   ├── Hero.jsx
│   ├── Albums.jsx
│   ├── AudioPlayer.jsx
│   ├── Artists.jsx
│   ├── News.jsx
│   ├── Footer.jsx
│   └── ui/ (Shadcn components)
├── pages/
│   └── Home.jsx
├── data/
│   └── mock.js
└── App.js
```

---

## 5. Design System

**Couleurs:**
- Primaire: Noir (#000000)
- Secondaire: Rouge (#dc2626, #ef4444)
- Arrière-plans: Zinc-900, Zinc-950
- Texte: Blanc, Gray-300, Gray-400

**Composants UI:**
- Cards avec hover effects
- Badges pour les genres/catégories
- Boutons avec transitions
- Sliders pour le lecteur audio
- Tabs pour actualités/concerts

**Guidelines respectées:**
- ✅ Pas de gradients dark colorful
- ✅ Utilisation de lucide-react pour les icônes
- ✅ Pas d'emojis
- ✅ Transitions et animations subtiles
- ✅ Design responsive

---

## 6. Ce qui a été implémenté (Phase 1)

**Date:** 15 janvier 2024

**Livrables:**
1. Structure complète du frontend avec React
2. 7 composants réutilisables
3. Données mock pour toutes les sections
4. Design noir/rouge professionnel
5. Navigation responsive avec menu mobile
6. Lecteur audio interactif (UI)
7. Filtres de genre pour albums
8. Tabs actualités/concerts
9. Cartes artistes avec biographies
10. Footer avec réseaux sociaux

**Technologies utilisées:**
- React 19.0.0
- Shadcn/UI components
- Lucide-react pour les icônes
- TailwindCSS pour le styling
- React Router pour la navigation

---

## 7. Backlog priorisé

### P0 (Critique - Prochaine phase)
- [ ] Créer l'API Backend FastAPI
- [ ] Implémenter les modèles MongoDB
- [ ] Créer les endpoints CRUD pour albums/artistes/news/concerts
- [ ] Intégrer le frontend avec le backend
- [ ] Remplacer mock.js par vraies données

### P1 (Important)
- [ ] Intégration Spotify API (authentification + playback)
- [ ] Intégration YouTube API (clips vidéo)
- [ ] Système de recherche
- [ ] Page de détails pour chaque album
- [ ] Page de détails pour chaque artiste
- [ ] Système de favoris (localStorage)

### P2 (Nice to have)
- [ ] Système d'authentification utilisateur
- [ ] Commentaires sur les albums
- [ ] Ratings utilisateurs
- [ ] Partage sur réseaux sociaux
- [ ] Mode sombre/clair
- [ ] Multilingue (FR/EN)
- [ ] Newsletter subscription

---

## 8. Notes techniques importantes

**Mock Data:**
- Toutes les données sont dans `/app/frontend/src/data/mock.js`
- Les interactions du lecteur audio sont simulées
- Les clics sur "Play" changent l'état mais ne jouent pas de musique
- Les filtres et tabs fonctionnent avec les données mock

**Intégrations futures:**
- Spotify nécessite API Key + OAuth
- YouTube nécessite API Key
- Les playbooks d'intégration ont été fournis par l'integration expert

**URLs importantes:**
- Frontend: https://hard-rock-vibes.preview.emergentagent.com
- Backend (à venir): https://hard-rock-vibes.preview.emergentagent.com/api

---

## 9. Prochaines étapes

1. **Développement Backend:**
   - Créer les modèles MongoDB
   - Implémenter les endpoints API
   - Ajouter gestion d'erreurs et validation

2. **Intégration Frontend-Backend:**
   - Remplacer mock.js par appels API
   - Gérer les états de chargement
   - Afficher les erreurs utilisateur

3. **Tests:**
   - Tests des endpoints API
   - Tests E2E du frontend
   - Validation des intégrations

4. **Intégrations externes:**
   - Configuration Spotify
   - Configuration YouTube
   - Tests avec vraies données

---

**Statut actuel:** Phase 1 complétée ✅  
**Prochaine milestone:** Développement Backend + Intégration

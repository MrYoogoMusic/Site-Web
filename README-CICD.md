# 🎸 RockZone - CI/CD Setup Professionnel

## ✅ Ce qui a été créé

Un système CI/CD complet et professionnel adapté à votre projet RockZone avec :

### 📦 Structure complète

```
.github/workflows/
├── ci.yml                          # Tests automatisés (PR/Push)
├── deploy-staging.yml              # Déploiement staging (develop)
└── deploy-production.yml           # Déploiement production (main)

docker/
├── Dockerfile.nginx                # Nginx reverse proxy
└── nginx-proxy.conf                # Configuration proxy

frontend/
├── Dockerfile                      # Build optimisé multi-stage
├── nginx.conf                      # Configuration nginx frontend
└── .dockerignore                   # Fichiers à exclure

backend/
├── Dockerfile                      # Python + uvicorn
└── .dockerignore                   # Fichiers à exclure

docker-compose.staging.yml          # Stack staging complète
docker-compose.production.yml       # Stack production complète
README-DEPLOYMENT.md                # Documentation complète
```

---

## 🎯 Différences avec le setup de ChatGPT

### ✅ Améliorations majeures

1. **Architecture corrigée**
   - ✅ Backend sur port **8001** (au lieu de 8000)
   - ✅ Routes backend avec prefix **/api** correctement routées
   - ✅ Nginx reverse proxy pour gérer le routage
   - ✅ MongoDB inclus dans docker-compose

2. **Backend Dockerfile**
   - ✅ Utilise **uvicorn** correctement configuré avec `--proxy-headers`
   - ✅ Port 8001 (comme dans votre environnement Emergent)
   - ✅ Utilisateur non-root pour la sécurité
   - ✅ Healthcheck fonctionnel

3. **Healthchecks ajoutés**
   - ✅ Tous les services ont des healthchecks
   - ✅ Dépendances correctes entre services
   - ✅ Timeouts et retries configurés

4. **Sécurité améliorée**
   - ✅ Cleanup SSH après déploiement
   - ✅ Utilisateur non-root dans les containers
   - ✅ Logs limités en taille (rotation)

5. **Production-ready**
   - ✅ Compression gzip
   - ✅ Cache des assets statiques
   - ✅ Security headers
   - ✅ Rotation des logs

---

## 🚀 Comment l'utiliser

### 1. Prérequis

Sur vos serveurs (staging & production) :
```bash
# Installer Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Installer Docker Compose
sudo apt-get install docker-compose-plugin

# Vérifier
docker --version
docker compose version
```

### 2. Configuration GitHub

#### a) Créer les Environments

Dans **Settings > Environments**, créez :
- `staging`
- `production`

#### b) Ajouter les Secrets

Pour **chaque environment**, ajoutez ces secrets :

| Secret | Exemple |
|--------|---------|
| `SERVER_HOST` | `51.15.123.45` ou `staging.rockzone.com` |
| `SERVER_USER` | `deploy` |
| `SERVER_SSH_KEY` | Contenu de votre clé privée SSH |
| `APP_PATH` | `/home/deploy/rockzone-staging` |
| `MONGO_URL` | `mongodb://mongodb:27017` |
| `DB_NAME` | `rockzone_staging` |
| `MONGO_ROOT_USER` | `admin` |
| `MONGO_ROOT_PASSWORD` | `VotreMotDePasseSecure123` |
| `REACT_APP_BACKEND_URL` | `https://staging.rockzone.com` |
| `STAGING_URL` | `https://staging.rockzone.com` |
| `PRODUCTION_URL` | `https://rockzone.com` |

#### c) Générer la clé SSH

```bash
# Sur votre machine
ssh-keygen -t ed25519 -C "deploy@rockzone" -f ~/.ssh/rockzone_deploy

# Copier sur le serveur
ssh-copy-id -i ~/.ssh/rockzone_deploy.pub user@server

# Copier la clé privée dans GitHub
cat ~/.ssh/rockzone_deploy
# Copiez TOUT le contenu dans SERVER_SSH_KEY
```

#### d) Protéger les branches

**Branch `develop`**
- ✅ Require pull request before merging
- ✅ Require status checks to pass

**Branch `main`**
- ✅ Require pull request before merging
- ✅ Require approvals (1+)
- ✅ Require status checks to pass

### 3. Workflow GitFlow

```bash
# 1. Créer une feature branch
git checkout develop
git checkout -b feature/ma-feature

# 2. Développer et commiter
git add .
git commit -m "feat: nouvelle fonctionnalité"

# 3. Push et créer une PR vers develop
git push origin feature/ma-feature
# → CI s'exécute automatiquement

# 4. Merger dans develop
# → Déploiement staging automatique

# 5. Tester sur staging
# Vérifier que tout fonctionne

# 6. PR de develop vers main
# → Review puis merge

# 7. Merger dans main
# → Déploiement production automatique
```

---

## 🏗️ Architecture

### Flow de requêtes

```
Internet
   ↓
Nginx Reverse Proxy (Port 80)
   ├── / → Frontend (React + nginx)
   └── /api → Backend (FastAPI:8001)
              ↓
          MongoDB (27017)
```

### Services Docker

1. **nginx** - Reverse proxy
   - Route `/api` vers backend
   - Route `/` vers frontend
   - Port 80 exposé

2. **frontend** - Application React
   - Build optimisé avec multi-stage
   - Servi par nginx
   - Cache des assets

3. **backend** - API FastAPI
   - Uvicorn sur port 8001
   - Routes avec prefix `/api`
   - Healthcheck intégré

4. **mongodb** - Base de données
   - MongoDB 7
   - Volumes persistants
   - Healthcheck intégré

---

## 🔍 Vérification

### Vérifier le déploiement

```bash
# SSH sur le serveur
ssh user@server
cd /path/to/app

# Vérifier les containers
docker compose ps

# Tous les services doivent être "healthy"
# Si un service est "unhealthy", vérifier les logs :
docker compose logs [service-name]

# Tester l'API
curl http://localhost/api/

# Tester le frontend
curl http://localhost/
```

### Logs en temps réel

```bash
# Tous les services
docker compose logs -f

# Un service spécifique
docker compose logs -f backend
docker compose logs -f frontend
```

---

## 📊 Ce qui se passe automatiquement

### Sur chaque Pull Request / Push

1. ✅ Tests frontend (build, lint)
2. ✅ Tests backend (lint, syntax, imports)
3. ✅ Build Docker des deux images
4. ✅ Rapport de succès/échec

### Sur push develop (après merge PR)

1. 🔨 Build des images Docker
2. 📦 Push vers GHCR (GitHub Container Registry)
3. 🚀 Déploiement sur serveur staging
4. 🏥 Health check automatique

### Sur push main (après merge PR)

1. 🔨 Build des images Docker
2. 📦 Push vers GHCR avec tag `latest`
3. 🚀 Déploiement sur serveur production
4. 🏥 Health check automatique
5. 🧹 Cleanup des anciennes images

---

## 🛠️ Commandes utiles

### Sur le serveur

```bash
# Voir les containers
docker compose ps

# Logs
docker compose logs -f [service]

# Redémarrer un service
docker compose restart [service]

# Redémarrer tout
docker compose down && docker compose up -d

# Vérifier les images
docker images | grep rockzone

# Nettoyer
docker system prune -a
```

### Localement

```bash
# Tester le build frontend
cd frontend
yarn install
yarn build

# Tester le backend
cd backend
pip install -r requirements.txt
python server.py

# Tester avec Docker
docker compose -f docker-compose.staging.yml up
```

---

## 🎓 Points clés à retenir

1. **develop → staging** (automatique)
2. **main → production** (automatique avec review)
3. Les images Docker sont sur **GHCR** (GitHub Container Registry)
4. Tous les services ont des **healthchecks**
5. MongoDB est **inclus** dans le stack
6. Le **reverse proxy nginx** gère le routage

---

## 📚 Documentation complète

Consultez **README-DEPLOYMENT.md** pour :
- Guide détaillé de configuration
- Troubleshooting
- Monitoring
- Sécurité
- SSL/HTTPS setup

---

## 🎉 C'est prêt !

Votre setup CI/CD est **professionnel** et **production-ready** :

- ✅ Tests automatisés
- ✅ Déploiements automatiques
- ✅ Healthchecks
- ✅ Logs rotatifs
- ✅ Sécurité renforcée
- ✅ Architecture correcte pour votre projet
- ✅ MongoDB inclus
- ✅ Reverse proxy configuré

**Il ne vous reste plus qu'à :**
1. Configurer les secrets GitHub
2. Pousser sur develop pour tester staging
3. Merger vers main pour la production

Bon déploiement ! 🚀🎸

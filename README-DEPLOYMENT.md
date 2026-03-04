# RockZone - Déploiement Professionnel CI/CD

Ce document détaille le setup complet de CI/CD pour le projet RockZone avec GitHub Actions, Docker et déploiement automatisé.

## 📋 Table des matières

- [Architecture](#architecture)
- [Prérequis](#prérequis)
- [Configuration GitHub](#configuration-github)
- [Variables d'environnement](#variables-denvironnement)
- [Workflow de développement](#workflow-de-développement)
- [Déploiement](#déploiement)
- [Troubleshooting](#troubleshooting)

---

## 🏗️ Architecture

```
┌─────────────────┐
│  GitHub Actions │
│   (CI/CD)       │
└────────┬────────┘
         │
         ├──► Build & Test (PR/Push)
         ├──► Build Docker Images
         └──► Deploy to Server
              │
              ├─► Staging (develop branch)
              └─► Production (main branch)

Server Architecture:
┌──────────────────────────────────────┐
│           Nginx Reverse Proxy        │
│  (Port 80/443)                       │
├──────────────┬───────────────────────┤
│   /          │        /api           │
│      ▼       │           ▼           │
│  Frontend    │       Backend         │
│  (React)     │       (FastAPI)       │
│  Port 80     │       Port 8001       │
└──────────────┴───────────┬───────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │   MongoDB   │
                    │  Port 27017 │
                    └─────────────┘
```

### Composants

- **Nginx Reverse Proxy**: Route les requêtes (`/api` → backend, `/` → frontend)
- **Frontend**: Application React servie par nginx
- **Backend**: API FastAPI avec uvicorn
- **MongoDB**: Base de données

---

## ✅ Prérequis

### Sur votre machine locale

- Git
- Compte GitHub avec accès au repository
- Clés SSH pour les serveurs

### Sur les serveurs (staging & production)

```bash
# Installer Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Installer Docker Compose
sudo apt-get update
sudo apt-get install docker-compose-plugin

# Vérifier l'installation
docker --version
docker compose version
```

---

## ⚙️ Configuration GitHub

### 1. Créer les Environments

Dans votre repository GitHub, allez dans **Settings > Environments** et créez :

#### Environment: `staging`
- Protection rules: aucune (déploiement automatique sur develop)
- Secrets requis (voir section Variables d'environnement)

#### Environment: `production`
- Protection rules: 
  - ✅ Required reviewers (recommandé)
  - ✅ Wait timer: 5 minutes (optionnel)
- Secrets requis (voir section Variables d'environnement)

### 2. Branch Protection Rules

Protégez vos branches principales :

#### Branch `develop`
- ✅ Require pull request before merging
- ✅ Require status checks to pass
  - `Frontend Tests & Build`
  - `Backend Tests & Validation`
  - `Docker Build Test`
- ✅ Require branches to be up to date

#### Branch `main`
- ✅ Require pull request before merging
- ✅ Require approvals (1 minimum)
- ✅ Require status checks to pass
- ✅ Include administrators

---

## 🔐 Variables d'environnement

### Secrets à configurer pour chaque environment (staging & production)

| Secret | Description | Exemple |
|--------|-------------|---------|
| `SERVER_HOST` | IP ou domaine du serveur | `staging.rockzone.com` |
| `SERVER_USER` | Utilisateur SSH | `deploy` |
| `SERVER_SSH_KEY` | Clé privée SSH | Contenu de `~/.ssh/id_rsa` |
| `APP_PATH` | Chemin de déploiement | `/home/deploy/rockzone-staging` |
| `MONGO_URL` | URL de connexion MongoDB | `mongodb://mongodb:27017` |
| `DB_NAME` | Nom de la base de données | `rockzone_staging` |
| `MONGO_ROOT_USER` | Utilisateur root MongoDB | `admin` |
| `MONGO_ROOT_PASSWORD` | Mot de passe root MongoDB | `SuperSecretPassword123` |
| `REACT_APP_BACKEND_URL` | URL du backend pour le frontend | `https://staging.rockzone.com` |
| `STAGING_URL` | URL staging (staging only) | `https://staging.rockzone.com` |
| `PRODUCTION_URL` | URL production (production only) | `https://rockzone.com` |

### Comment ajouter les secrets

1. Allez dans **Settings > Environments > [staging/production]**
2. Cliquez sur **Add secret**
3. Ajoutez chaque secret avec sa valeur

### Générer une clé SSH pour le déploiement

```bash
# Sur votre machine locale
ssh-keygen -t ed25519 -C "deploy@rockzone" -f ~/.ssh/rockzone_deploy
# Ne mettez pas de passphrase

# Copiez la clé publique sur le serveur
ssh-copy-id -i ~/.ssh/rockzone_deploy.pub user@server

# Copiez la clé privée dans GitHub Secrets
cat ~/.ssh/rockzone_deploy
# Copiez tout le contenu (y compris BEGIN/END) dans SERVER_SSH_KEY
```

---

## 🔄 Workflow de développement

### Processus GitFlow

```
1. Créer une feature branch depuis develop
   git checkout develop
   git pull origin develop
   git checkout -b feature/nouvelle-fonctionnalite

2. Développer et commiter
   git add .
   git commit -m "feat: ajout de la nouvelle fonctionnalité"

3. Pousser et créer une Pull Request vers develop
   git push origin feature/nouvelle-fonctionnalite
   # Créer la PR sur GitHub

4. CI s'exécute automatiquement
   - Tests frontend
   - Tests backend
   - Build Docker

5. Après review et validation, merger dans develop
   # Le déploiement staging s'exécute automatiquement

6. Tester sur staging
   # Vérifier que tout fonctionne correctement

7. Créer une PR de develop vers main
   # Pour le déploiement production

8. Après review et validation, merger dans main
   # Le déploiement production s'exécute automatiquement
```

### Conventions de commit

Utilisez [Conventional Commits](https://www.conventionalcommits.org/) :

- `feat:` Nouvelle fonctionnalité
- `fix:` Correction de bug
- `docs:` Documentation
- `style:` Formatage, style
- `refactor:` Refactoring
- `test:` Ajout de tests
- `chore:` Tâches de maintenance

---

## 🚀 Déploiement

### Déploiement automatique

Les déploiements se font automatiquement :

- **Push sur `develop`** → Déploie sur **staging**
- **Push sur `main`** → Déploie sur **production**

### Déploiement manuel

Vous pouvez déclencher un déploiement manuellement :

1. Allez dans **Actions**
2. Sélectionnez le workflow (Deploy to Staging ou Deploy to Production)
3. Cliquez sur **Run workflow**
4. Sélectionnez la branche
5. Cliquez sur **Run workflow**

### Vérifier le déploiement

```bash
# SSH sur le serveur
ssh user@server

# Vérifier les containers
cd /path/to/app
docker compose ps

# Vérifier les logs
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f nginx

# Vérifier la santé des services
curl http://localhost/health
curl http://localhost/api/
```

---

## 🔧 Troubleshooting

### Les tests CI échouent

#### Frontend build error
```bash
# Vérifier localement
cd frontend
yarn install
yarn build
```

#### Backend import error
```bash
# Vérifier localement
cd backend
pip install -r requirements.txt
python -c "import server"
```

### Le déploiement échoue

#### Erreur SSH
- Vérifiez que `SERVER_SSH_KEY` contient la clé privée complète
- Vérifiez que la clé publique est dans `~/.ssh/authorized_keys` sur le serveur
- Vérifiez que l'utilisateur a les permissions sudo si nécessaire

#### Docker pull fails
- Vérifiez que le package est public ou que les credentials GHCR sont corrects
- Sur le serveur : `docker login ghcr.io`

#### Container won't start
```bash
# Sur le serveur, vérifiez les logs
docker compose logs backend
docker compose logs frontend
docker compose logs mongodb

# Vérifiez les variables d'environnement
cat .env

# Redémarrer les services
docker compose down
docker compose up -d
```

### MongoDB connection error

```bash
# Vérifier que MongoDB est accessible
docker compose exec backend python -c "from motor.motor_asyncio import AsyncIOMotorClient; import os; client = AsyncIOMotorClient(os.environ['MONGO_URL']); print('OK')"

# Vérifier les logs MongoDB
docker compose logs mongodb
```

### Healthcheck failing

```bash
# Tester manuellement le healthcheck
docker compose exec backend curl http://localhost:8001/api/
docker compose exec frontend curl http://localhost/health
```

---

## 📊 Monitoring

### Voir les logs en temps réel

```bash
# Tous les services
docker compose logs -f

# Un service spécifique
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f nginx
```

### Vérifier l'utilisation des ressources

```bash
# Stats des containers
docker stats

# Espace disque
docker system df
```

### Nettoyer les anciennes images

```bash
# Supprimer les images non utilisées
docker system prune -a

# Le CI le fait automatiquement après chaque déploiement
```

---

## 🔒 Sécurité

### Bonnes pratiques

1. **Secrets**: Ne jamais commiter de secrets dans le code
2. **SSH Keys**: Utilisez des clés dédiées au déploiement, pas vos clés personnelles
3. **MongoDB**: Changez le mot de passe root par défaut
4. **Firewall**: Configurez un firewall sur le serveur
5. **HTTPS**: Utilisez Certbot pour Let's Encrypt (voir section SSL)

### Configuration SSL (Let's Encrypt)

```bash
# Sur le serveur, installer Certbot
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx

# Obtenir un certificat
sudo certbot --nginx -d yourdomain.com

# Le renouvellement est automatique
sudo certbot renew --dry-run
```

---

## 📝 Checklist de déploiement initial

### Avant le premier déploiement

- [ ] Serveur configuré avec Docker et Docker Compose
- [ ] Clés SSH générées et ajoutées au serveur
- [ ] Tous les secrets GitHub configurés (staging & production)
- [ ] Branches `develop` et `main` créées
- [ ] Branch protection rules activées
- [ ] Environments GitHub créés (staging & production)
- [ ] Premier push sur `develop` pour tester staging
- [ ] Vérification du déploiement staging
- [ ] Merge vers `main` pour production
- [ ] Configuration SSL si nécessaire

### Après le déploiement

- [ ] Vérifier que tous les services sont up: `docker compose ps`
- [ ] Tester l'API: `curl https://yourdomain.com/api/`
- [ ] Tester le frontend: ouvrir dans le navigateur
- [ ] Vérifier les logs: `docker compose logs`
- [ ] Configurer le monitoring (optionnel)

---

## 🆘 Support

Si vous rencontrez des problèmes :

1. Vérifiez les logs des GitHub Actions
2. Vérifiez les logs des containers sur le serveur
3. Consultez ce document
4. Ouvrez une issue sur GitHub avec :
   - Description du problème
   - Logs pertinents
   - Étapes pour reproduire

---

## 📚 Ressources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Documentation](https://react.dev/)
- [Nginx Documentation](https://nginx.org/en/docs/)

---

**Version:** 1.0  
**Dernière mise à jour:** Janvier 2024  
**Projet:** RockZone Music Platform

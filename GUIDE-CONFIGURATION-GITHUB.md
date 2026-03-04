# 🎸 RockZone - Guide Configuration GitHub (MANUEL)

## 📋 Checklist Complète

Suivez ces étapes dans l'ordre pour configurer GitHub correctement.

---

## 1️⃣ Créer les Environments

**URL:** `https://github.com/VOTRE-USERNAME/VOTRE-REPO/settings/environments`

### Actions :
1. Cliquez sur **"New environment"**
2. Nom: `staging` → Cliquez **"Configure environment"**
3. Répétez pour: `production`

### Configuration de l'environment Production :
- ✅ **Required reviewers**: Ajoutez-vous comme reviewer
- ⚙️ **Wait timer**: 5 minutes (optionnel mais recommandé)

---

## 2️⃣ Configurer les Secrets

### Pour STAGING

**URL:** `https://github.com/VOTRE-USERNAME/VOTRE-REPO/settings/environments/staging`

Cliquez sur **"Add secret"** pour chaque secret ci-dessous :

| Nom du Secret | Valeur à entrer | Exemple |
|---------------|-----------------|---------|
| `SERVER_HOST` | IP ou domaine du serveur | `51.15.123.45` ou `staging.rockzone.com` |
| `SERVER_USER` | Utilisateur SSH | `deploy` |
| `SERVER_SSH_KEY` | **TOUTE** la clé privée | Contenu complet de `~/.ssh/rockzone_deploy` |
| `APP_PATH` | Chemin sur le serveur | `/home/deploy/rockzone-staging` |
| `MONGO_URL` | URL MongoDB | `mongodb://mongodb:27017` |
| `DB_NAME` | Nom de la base | `rockzone_staging` |
| `MONGO_ROOT_USER` | User MongoDB | `admin` |
| `MONGO_ROOT_PASSWORD` | Password MongoDB | `VotreMotDePasseStaging123!` |
| `REACT_APP_BACKEND_URL` | URL publique | `https://staging.rockzone.com` |
| `STAGING_URL` | URL staging | `https://staging.rockzone.com` |

### Pour PRODUCTION

**URL:** `https://github.com/VOTRE-USERNAME/VOTRE-REPO/settings/environments/production`

Cliquez sur **"Add secret"** pour chaque secret ci-dessous :

| Nom du Secret | Valeur à entrer | Exemple |
|---------------|-----------------|---------|
| `SERVER_HOST` | IP ou domaine du serveur | `51.15.123.99` ou `rockzone.com` |
| `SERVER_USER` | Utilisateur SSH | `deploy` |
| `SERVER_SSH_KEY` | **TOUTE** la clé privée | Contenu complet de `~/.ssh/rockzone_deploy` |
| `APP_PATH` | Chemin sur le serveur | `/home/deploy/rockzone-production` |
| `MONGO_URL` | URL MongoDB | `mongodb://mongodb:27017` |
| `DB_NAME` | Nom de la base | `rockzone_production` |
| `MONGO_ROOT_USER` | User MongoDB | `admin` |
| `MONGO_ROOT_PASSWORD` | Password MongoDB | `VotreMotDePasseProduction456!` |
| `REACT_APP_BACKEND_URL` | URL publique | `https://rockzone.com` |
| `PRODUCTION_URL` | URL production | `https://rockzone.com` |

---

## 3️⃣ Générer et Configurer la Clé SSH

### Si vous n'avez pas encore de clé SSH :

```bash
# Générer une nouvelle clé
ssh-keygen -t ed25519 -C "deploy@rockzone" -f ~/.ssh/rockzone_deploy
# Appuyez sur Entrée (pas de passphrase)

# Copier sur le serveur STAGING
ssh-copy-id -i ~/.ssh/rockzone_deploy.pub votre-user@votre-serveur-staging

# Copier sur le serveur PRODUCTION
ssh-copy-id -i ~/.ssh/rockzone_deploy.pub votre-user@votre-serveur-production

# Afficher la clé privée (à copier dans SERVER_SSH_KEY)
cat ~/.ssh/rockzone_deploy
```

### Important pour SERVER_SSH_KEY :
- ✅ Copiez **TOUTE** la clé, y compris les lignes `-----BEGIN` et `-----END`
- ✅ Ne modifiez rien, gardez tous les sauts de ligne
- ✅ La même clé peut être utilisée pour staging et production

---

## 4️⃣ Protéger les Branches

**URL:** `https://github.com/VOTRE-USERNAME/VOTRE-REPO/settings/branches`

### Pour la branche `develop` :

1. Cliquez sur **"Add rule"**
2. Branch name pattern: `develop`
3. Cochez :
   - ✅ **Require a pull request before merging**
   - ✅ **Require status checks to pass before merging**
   - ✅ **Require branches to be up to date before merging**
4. Status checks requis :
   - `Frontend Tests & Build`
   - `Backend Tests & Validation`
   - `Docker Build Test`
5. Cliquez **"Create"**

### Pour la branche `main` :

1. Cliquez sur **"Add rule"**
2. Branch name pattern: `main`
3. Cochez :
   - ✅ **Require a pull request before merging**
   - ✅ **Require approvals** (minimum 1)
   - ✅ **Require status checks to pass before merging**
   - ✅ **Require branches to be up to date before merging**
4. Status checks requis :
   - `Frontend Tests & Build`
   - `Backend Tests & Validation`
   - `Docker Build Test`
   - `All Checks Passed`
5. Cliquez **"Create"**

---

## 5️⃣ Préparer les Serveurs

### Sur CHAQUE serveur (staging ET production) :

```bash
# Se connecter au serveur
ssh votre-user@votre-serveur

# Installer Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Installer Docker Compose
sudo apt-get update
sudo apt-get install docker-compose-plugin

# Vérifier les installations
docker --version
docker compose version

# Se déconnecter et reconnecter pour appliquer les permissions
exit
```

---

## 6️⃣ Créer les Branches (si pas déjà fait)

```bash
# Vérifier la branche actuelle
git branch

# Créer et pousser develop (si elle n'existe pas)
git checkout -b develop
git push origin develop

# Créer et pousser main (si elle n'existe pas)
git checkout -b main
git push origin main

# Retourner sur develop pour le développement
git checkout develop
```

---

## 7️⃣ Premier Déploiement

### Déploiement STAGING :

```bash
# S'assurer d'être sur develop
git checkout develop

# Push pour déclencher le déploiement
git push origin develop
```

**GitHub Actions va :**
1. ✅ Exécuter les tests (CI)
2. ✅ Builder les images Docker
3. ✅ Les pousser sur GHCR
4. ✅ Se connecter au serveur staging
5. ✅ Déployer les containers
6. ✅ Vérifier le health check

### Vérifier le déploiement :

1. **Sur GitHub :**
   - Allez dans **Actions**
   - Cliquez sur le workflow "Deploy to Staging"
   - Vérifiez que tout est vert ✅

2. **Sur le serveur staging :**
   ```bash
   ssh votre-user@serveur-staging
   cd /home/deploy/rockzone-staging  # ou votre APP_PATH
   
   # Vérifier les containers
   docker compose ps
   # Tous doivent être "healthy"
   
   # Voir les logs
   docker compose logs -f
   
   # Tester l'API
   curl https://staging.rockzone.com/api/
   ```

3. **Dans le navigateur :**
   - Ouvrez `https://staging.rockzone.com`
   - Vérifiez que le site fonctionne

---

## 8️⃣ Déploiement PRODUCTION

### Une fois staging validé :

```bash
# Créer une Pull Request de develop vers main
# Sur GitHub : Pull requests > New pull request
# Base: main ← Compare: develop

# Après review et approbation, merger la PR

# Le déploiement production démarre automatiquement
```

---

## ✅ Checklist Finale

Avant de considérer que c'est terminé :

- [ ] Les 2 environments créés (staging, production)
- [ ] Les 11 secrets configurés pour staging
- [ ] Les 11 secrets configurés pour production
- [ ] La clé SSH générée et copiée sur les serveurs
- [ ] Les branches protégées (develop, main)
- [ ] Docker + Docker Compose installés sur les serveurs
- [ ] Push sur develop effectué
- [ ] Déploiement staging réussi (Actions vert ✅)
- [ ] Site staging accessible et fonctionnel
- [ ] PR develop → main créée et mergée
- [ ] Déploiement production réussi
- [ ] Site production accessible et fonctionnel

---

## 🆘 En cas de problème

### Le workflow échoue ?
1. Vérifiez les logs dans **Actions > [workflow name]**
2. Vérifiez que tous les secrets sont corrects
3. Vérifiez que la clé SSH est complète (avec BEGIN/END)
4. Consultez `README-DEPLOYMENT.md` section Troubleshooting

### Les containers ne démarrent pas ?
```bash
# Sur le serveur
docker compose logs backend
docker compose logs frontend
docker compose logs mongodb
```

### Problème de connexion SSH ?
```bash
# Tester la connexion
ssh -i ~/.ssh/rockzone_deploy votre-user@serveur

# Vérifier les permissions
chmod 600 ~/.ssh/rockzone_deploy
```

---

## 📚 Ressources

- **Guide complet :** `README-DEPLOYMENT.md`
- **Quick start :** `README-CICD.md`
- **Troubleshooting :** `README-DEPLOYMENT.md` (section dédiée)
- **Comparaison :** `COMPARAISON-CICD.md`

---

**Temps estimé total : 30-45 minutes**

Bonne configuration ! 🚀🎸

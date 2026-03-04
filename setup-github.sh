#!/bin/bash

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color
BOLD='\033[1m'

clear
echo -e "${BOLD}═══════════════════════════════════════════════════════${NC}"
echo -e "${BOLD}  🎸 RockZone - Configuration GitHub Interactive${NC}"
echo -e "${BOLD}═══════════════════════════════════════════════════════${NC}"
echo ""
echo -e "${YELLOW}Ce script va vous guider pour configurer GitHub${NC}"
echo ""

# Demander l'URL du repo
echo -e "${BLUE}📦 Étape 1: Information sur le repository${NC}"
echo -n "URL de votre repository GitHub (ex: https://github.com/user/rockzone): "
read REPO_URL

if [ -z "$REPO_URL" ]; then
    echo -e "${RED}❌ URL requise${NC}"
    exit 1
fi

# Extraire le nom d'utilisateur et du repo
REPO_PATH=$(echo $REPO_URL | sed 's/https:\/\/github.com\///' | sed 's/\.git$//')
USERNAME=$(echo $REPO_PATH | cut -d'/' -f1)
REPONAME=$(echo $REPO_PATH | cut -d'/' -f2)

echo -e "${GREEN}✓ Repository: $USERNAME/$REPONAME${NC}"
echo ""

# Vérifier si les branches existent
echo -e "${BLUE}📦 Étape 2: Vérification des branches${NC}"
git fetch --all 2>/dev/null

if git rev-parse --verify origin/develop >/dev/null 2>&1; then
    echo -e "${GREEN}✓ Branche develop existe${NC}"
else
    echo -e "${YELLOW}⚠ Branche develop n'existe pas${NC}"
    echo -n "Voulez-vous la créer maintenant ? (o/n): "
    read CREATE_DEVELOP
    if [ "$CREATE_DEVELOP" = "o" ]; then
        git checkout -b develop
        git push origin develop
        echo -e "${GREEN}✓ Branche develop créée et pushée${NC}"
    fi
fi

if git rev-parse --verify origin/main >/dev/null 2>&1; then
    echo -e "${GREEN}✓ Branche main existe${NC}"
else
    echo -e "${YELLOW}⚠ Branche main n'existe pas${NC}"
    echo -n "Voulez-vous la créer maintenant ? (o/n): "
    read CREATE_MAIN
    if [ "$CREATE_MAIN" = "o" ]; then
        git checkout -b main
        git push origin main
        echo -e "${GREEN}✓ Branche main créée et pushée${NC}"
    fi
fi
echo ""

# Instructions pour les environments
echo -e "${BOLD}═══════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}📦 Étape 3: Créer les Environments sur GitHub${NC}"
echo -e "${BOLD}═══════════════════════════════════════════════════════${NC}"
echo ""
echo -e "${YELLOW}Actions à faire sur GitHub :${NC}"
echo ""
echo "1. Allez sur: ${REPO_URL}/settings/environments"
echo ""
echo "2. Cliquez sur 'New environment'"
echo ""
echo "3. Créez deux environments:"
echo "   ${GREEN}✓${NC} staging"
echo "   ${GREEN}✓${NC} production"
echo ""
echo -e "${YELLOW}Pour l'environment 'production', configurez:${NC}"
echo "   - Required reviewers: Ajoutez vous-même"
echo "   - Wait timer: 5 minutes (optionnel)"
echo ""
echo -n "Appuyez sur Entrée quand c'est fait..."
read
echo ""

# Générer la clé SSH
echo -e "${BOLD}═══════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}📦 Étape 4: Générer la clé SSH pour le déploiement${NC}"
echo -e "${BOLD}═══════════════════════════════════════════════════════${NC}"
echo ""
echo -n "Avez-vous déjà une clé SSH pour le déploiement ? (o/n): "
read HAS_SSH_KEY

if [ "$HAS_SSH_KEY" != "o" ]; then
    echo ""
    echo "Génération d'une nouvelle clé SSH..."
    SSH_KEY_PATH="$HOME/.ssh/rockzone_deploy"
    
    ssh-keygen -t ed25519 -C "deploy@rockzone" -f "$SSH_KEY_PATH" -N ""
    
    echo -e "${GREEN}✓ Clé SSH générée: $SSH_KEY_PATH${NC}"
    echo ""
    echo -e "${YELLOW}Maintenant, copiez la clé publique sur vos serveurs:${NC}"
    echo ""
    echo -n "IP/Domaine du serveur STAGING: "
    read STAGING_HOST
    if [ ! -z "$STAGING_HOST" ]; then
        echo "Commande: ssh-copy-id -i ${SSH_KEY_PATH}.pub user@${STAGING_HOST}"
        echo -n "Exécuter maintenant ? (o/n): "
        read RUN_SSH_COPY
        if [ "$RUN_SSH_COPY" = "o" ]; then
            ssh-copy-id -i "${SSH_KEY_PATH}.pub" user@${STAGING_HOST}
        fi
    fi
    echo ""
    echo -n "IP/Domaine du serveur PRODUCTION: "
    read PROD_HOST
    if [ ! -z "$PROD_HOST" ]; then
        echo "Commande: ssh-copy-id -i ${SSH_KEY_PATH}.pub user@${PROD_HOST}"
        echo -n "Exécuter maintenant ? (o/n): "
        read RUN_SSH_COPY_PROD
        if [ "$RUN_SSH_COPY_PROD" = "o" ]; then
            ssh-copy-id -i "${SSH_KEY_PATH}.pub" user@${PROD_HOST}
        fi
    fi
    
    SSH_PRIVATE_KEY=$(cat "$SSH_KEY_PATH")
else
    echo -n "Chemin de votre clé privée SSH: "
    read SSH_KEY_PATH
    SSH_PRIVATE_KEY=$(cat "$SSH_KEY_PATH")
fi
echo ""

# Créer un fichier avec les secrets à configurer
echo -e "${BOLD}═══════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}📦 Étape 5: Configuration des Secrets GitHub${NC}"
echo -e "${BOLD}═══════════════════════════════════════════════════════${NC}"
echo ""

cat > /tmp/github-secrets-config.txt << EOF
═══════════════════════════════════════════════════════
  SECRETS GITHUB À CONFIGURER
  Repository: $USERNAME/$REPONAME
═══════════════════════════════════════════════════════

⚠️  IMPORTANT: Configurez ces secrets pour CHAQUE environment

📍 URL: ${REPO_URL}/settings/environments

───────────────────────────────────────────────────────
  ENVIRONMENT: staging
───────────────────────────────────────────────────────

SERVER_HOST
  → IP ou domaine de votre serveur staging
  → Exemple: 51.15.123.45 ou staging.rockzone.com

SERVER_USER
  → Utilisateur SSH sur le serveur
  → Exemple: deploy

SERVER_SSH_KEY
  → Votre clé privée SSH (TOUTE LA CLÉ)
  → Fichier: $SSH_KEY_PATH
  → Incluez BEGIN et END

APP_PATH
  → Chemin de déploiement sur le serveur
  → Exemple: /home/deploy/rockzone-staging

MONGO_URL
  → URL de connexion MongoDB
  → Exemple: mongodb://mongodb:27017

DB_NAME
  → Nom de la base de données
  → Exemple: rockzone_staging

MONGO_ROOT_USER
  → Utilisateur admin MongoDB
  → Exemple: admin

MONGO_ROOT_PASSWORD
  → Mot de passe admin MongoDB
  → Créez un mot de passe fort

REACT_APP_BACKEND_URL
  → URL publique de votre application staging
  → Exemple: https://staging.rockzone.com

STAGING_URL
  → URL de staging (pour health check)
  → Exemple: https://staging.rockzone.com

───────────────────────────────────────────────────────
  ENVIRONMENT: production
───────────────────────────────────────────────────────

SERVER_HOST
  → IP ou domaine de votre serveur production
  → Exemple: 51.15.123.99 ou rockzone.com

SERVER_USER
  → Utilisateur SSH sur le serveur
  → Exemple: deploy

SERVER_SSH_KEY
  → Votre clé privée SSH (TOUTE LA CLÉ)
  → Même clé que staging ou clé différente

APP_PATH
  → Chemin de déploiement sur le serveur
  → Exemple: /home/deploy/rockzone-production

MONGO_URL
  → URL de connexion MongoDB
  → Exemple: mongodb://mongodb:27017

DB_NAME
  → Nom de la base de données
  → Exemple: rockzone_production

MONGO_ROOT_USER
  → Utilisateur admin MongoDB
  → Exemple: admin

MONGO_ROOT_PASSWORD
  → Mot de passe admin MongoDB (DIFFÉRENT de staging)
  → Créez un mot de passe fort

REACT_APP_BACKEND_URL
  → URL publique de votre application production
  → Exemple: https://rockzone.com

PRODUCTION_URL
  → URL de production (pour health check)
  → Exemple: https://rockzone.com

═══════════════════════════════════════════════════════
  CLÉS SSH GÉNÉRÉES
═══════════════════════════════════════════════════════

Clé privée: $SSH_KEY_PATH
Clé publique: ${SSH_KEY_PATH}.pub

Pour SERVER_SSH_KEY, utilisez le contenu de la clé privée:
cat $SSH_KEY_PATH

═══════════════════════════════════════════════════════
EOF

cat /tmp/github-secrets-config.txt
echo ""
echo -e "${GREEN}✓ Configuration sauvegardée dans: /tmp/github-secrets-config.txt${NC}"
echo ""

# Branch protection
echo -e "${BOLD}═══════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}📦 Étape 6: Protection des branches${NC}"
echo -e "${BOLD}═══════════════════════════════════════════════════════${NC}"
echo ""
echo -e "${YELLOW}Actions à faire sur GitHub :${NC}"
echo ""
echo "1. Allez sur: ${REPO_URL}/settings/branches"
echo ""
echo "2. Ajoutez une règle pour la branche ${GREEN}develop${NC}:"
echo "   ✓ Require a pull request before merging"
echo "   ✓ Require status checks to pass"
echo "   ✓ Require branches to be up to date"
echo ""
echo "3. Ajoutez une règle pour la branche ${GREEN}main${NC}:"
echo "   ✓ Require a pull request before merging"
echo "   ✓ Require approvals (1 minimum)"
echo "   ✓ Require status checks to pass"
echo ""
echo -n "Appuyez sur Entrée quand c'est fait..."
read
echo ""

# Récapitulatif
echo -e "${BOLD}═══════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}✅ Configuration GitHub - Récapitulatif${NC}"
echo -e "${BOLD}═══════════════════════════════════════════════════════${NC}"
echo ""
echo -e "${GREEN}✓${NC} Repository: $USERNAME/$REPONAME"
echo -e "${GREEN}✓${NC} Branches: develop, main"
echo -e "${GREEN}✓${NC} Clé SSH générée: $SSH_KEY_PATH"
echo ""
echo -e "${YELLOW}⚠ À FAIRE MANUELLEMENT :${NC}"
echo "  1. Créer les environments (staging, production)"
echo "  2. Configurer les 11 secrets par environment"
echo "  3. Protéger les branches (develop, main)"
echo ""
echo -e "${BLUE}📖 Documentation des secrets:${NC}"
echo "  → /tmp/github-secrets-config.txt"
echo ""
echo -e "${BLUE}📖 Guide complet:${NC}"
echo "  → README-DEPLOYMENT.md"
echo ""
echo -e "${BOLD}═══════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}🚀 Prochaine étape: Déploiement${NC}"
echo -e "${BOLD}═══════════════════════════════════════════════════════${NC}"
echo ""
echo "Une fois les secrets configurés:"
echo ""
echo "  git checkout develop"
echo "  git push origin develop"
echo ""
echo "Le déploiement staging démarrera automatiquement !"
echo ""
echo -e "${GREEN}Bon déploiement ! 🎸${NC}"
echo ""

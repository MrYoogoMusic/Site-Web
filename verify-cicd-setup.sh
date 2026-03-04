#!/bin/bash

echo "🔍 Vérification du setup CI/CD RockZone"
echo "========================================"
echo ""

# Couleurs
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} $1"
        return 0
    else
        echo -e "${RED}✗${NC} $1 (MANQUANT)"
        return 1
    fi
}

check_dir() {
    if [ -d "$1" ]; then
        echo -e "${GREEN}✓${NC} $1/"
        return 0
    else
        echo -e "${RED}✗${NC} $1/ (MANQUANT)"
        return 1
    fi
}

echo "📁 Structure des dossiers:"
check_dir ".github"
check_dir ".github/workflows"
check_dir "docker"
check_dir "frontend"
check_dir "backend"
echo ""

echo "📄 Fichiers CI/CD:"
check_file ".github/workflows/ci.yml"
check_file ".github/workflows/deploy-staging.yml"
check_file ".github/workflows/deploy-production.yml"
echo ""

echo "🐳 Fichiers Docker:"
check_file "frontend/Dockerfile"
check_file "frontend/.dockerignore"
check_file "frontend/nginx.conf"
check_file "backend/Dockerfile"
check_file "backend/.dockerignore"
check_file "docker/Dockerfile.nginx"
check_file "docker/nginx-proxy.conf"
check_file "docker-compose.staging.yml"
check_file "docker-compose.production.yml"
echo ""

echo "📚 Documentation:"
check_file "README-DEPLOYMENT.md"
check_file "README-CICD.md"
echo ""

echo "🔧 Configuration:"
check_file "frontend/yarn.lock"
check_file "backend/requirements.txt"
check_file "backend/server.py"
echo ""

echo "========================================"
echo -e "${GREEN}✨ Setup CI/CD vérifié !${NC}"
echo ""
echo "📋 Prochaines étapes:"
echo "  1. Configurer les secrets GitHub (voir README-CICD.md)"
echo "  2. Protéger les branches develop et main"
echo "  3. Créer les environments staging et production"
echo "  4. Push sur develop pour tester le déploiement"
echo ""
echo "📖 Documentation complète: README-DEPLOYMENT.md"

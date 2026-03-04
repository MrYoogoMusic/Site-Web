#!/bin/bash

echo "🎸 Configuration des branches Git pour CI/CD"
echo "============================================="
echo ""

# Configuration du remote si pas déjà fait
REPO_URL="https://github.com/MrYoogoMusic/Site-Web.git"

echo "📦 Configuration du remote GitHub..."
if git remote get-url origin >/dev/null 2>&1; then
    echo "  ✅ Remote 'origin' déjà configuré"
else
    git remote add origin "$REPO_URL"
    echo "  ✅ Remote 'origin' ajouté: $REPO_URL"
fi
echo ""

# Fetch les branches distantes
echo "📥 Récupération des branches distantes..."
git fetch origin
echo ""

# Vérifier quelles branches existent sur le remote
echo "📋 Branches distantes existantes:"
git branch -r
echo ""

# Créer/configurer la branche develop
echo "🌿 Configuration de la branche 'develop'..."
if git show-ref --verify --quiet refs/heads/develop; then
    echo "  ✅ Branche 'develop' existe déjà localement"
    git checkout develop
else
    # Créer develop depuis main
    git checkout -b develop main
    echo "  ✅ Branche 'develop' créée depuis main"
fi

# Push develop si elle n'existe pas sur le remote
if git ls-remote --heads origin develop | grep -q develop; then
    echo "  ✅ Branche 'develop' existe déjà sur GitHub"
else
    echo "  📤 Push de 'develop' sur GitHub..."
    git push -u origin develop
    echo "  ✅ Branche 'develop' pushée sur GitHub"
fi
echo ""

# S'assurer que main est à jour
echo "🌿 Configuration de la branche 'main'..."
git checkout main

if git ls-remote --heads origin main | grep -q main; then
    echo "  ✅ Branche 'main' existe déjà sur GitHub"
    git push -u origin main
    echo "  ✅ Branche 'main' synchronisée"
else
    echo "  📤 Push de 'main' sur GitHub..."
    git push -u origin main
    echo "  ✅ Branche 'main' pushée sur GitHub"
fi
echo ""

# Retourner sur develop pour le développement
git checkout develop
echo "✅ Vous êtes maintenant sur la branche 'develop'"
echo ""

echo "============================================="
echo "✅ Configuration terminée!"
echo "============================================="
echo ""
echo "📋 Structure des branches:"
echo "   main    → Production (mryoogomusic.fr)"
echo "   develop → Staging (staging.hugodurieux.fr)"
echo ""
echo "🚀 Workflow:"
echo "   1. Développez sur 'develop'"
echo "   2. Push develop → déploie sur staging"
echo "   3. PR develop → main → déploie sur production"
echo ""
echo "📖 Pour vérifier:"
echo "   git branch -a"
echo ""

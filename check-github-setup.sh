#!/bin/bash

# Script pour vérifier la configuration GitHub après setup

REPO_URL=$(git remote get-url origin 2>/dev/null)

if [ -z "$REPO_URL" ]; then
    echo "❌ Pas de remote Git configuré"
    exit 1
fi

echo "════════════════════════════════════════════════"
echo "  🔍 Vérification Configuration GitHub"
echo "════════════════════════════════════════════════"
echo ""
echo "Repository: $REPO_URL"
echo ""

# Vérifier les branches
echo "📦 Vérification des branches..."
git fetch --all 2>/dev/null

if git rev-parse --verify origin/develop >/dev/null 2>&1; then
    echo "  ✅ develop existe"
else
    echo "  ❌ develop manquante"
fi

if git rev-parse --verify origin/main >/dev/null 2>&1; then
    echo "  ✅ main existe"
else
    echo "  ❌ main manquante"
fi
echo ""

# Vérifier les fichiers CI/CD
echo "📦 Vérification des fichiers CI/CD..."
if [ -f ".github/workflows/ci.yml" ]; then
    echo "  ✅ ci.yml"
else
    echo "  ❌ ci.yml manquant"
fi

if [ -f ".github/workflows/deploy-staging.yml" ]; then
    echo "  ✅ deploy-staging.yml"
else
    echo "  ❌ deploy-staging.yml manquant"
fi

if [ -f ".github/workflows/deploy-production.yml" ]; then
    echo "  ✅ deploy-production.yml"
else
    echo "  ❌ deploy-production.yml manquant"
fi
echo ""

# Instructions pour GitHub
echo "════════════════════════════════════════════════"
echo "  📋 Prochaines étapes sur GitHub"
echo "════════════════════════════════════════════════"
echo ""
echo "1. Créer les environments:"
echo "   → Settings > Environments"
echo "   → Créer: staging"
echo "   → Créer: production"
echo ""
echo "2. Configurer les secrets (11 par environment):"
echo "   → Voir: TEMPLATE-SECRETS.md"
echo "   → Ou: GUIDE-CONFIGURATION-GITHUB.md"
echo ""
echo "3. Protéger les branches:"
echo "   → Settings > Branches"
echo "   → Règle pour develop (require PR + checks)"
echo "   → Règle pour main (require PR + approvals + checks)"
echo ""
echo "4. Premier déploiement:"
echo "   git checkout develop"
echo "   git push origin develop"
echo ""
echo "════════════════════════════════════════════════"
echo ""
echo "📖 Documentation complète:"
echo "   → GUIDE-CONFIGURATION-GITHUB.md"
echo "   → README-DEPLOYMENT.md"
echo ""

#!/usr/bin/env python3
"""
Script d'automatisation complète de la configuration GitHub
Pour le projet RockZone / MrYoogoMusic
"""

import requests
import json
import base64
from nacl import encoding, public
import sys

# Configuration
GITHUB_TOKEN = "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"
REPO_OWNER = "MrYoogoMusic"
REPO_NAME = "Site-Web"
API_BASE = "https://api.github.com"

# Headers pour l'API
headers = {
    "Authorization": f"token {GITHUB_TOKEN}",
    "Accept": "application/vnd.github.v3+json"
}

print("🎸 Configuration automatique GitHub pour RockZone")
print("=" * 60)
print()

# Informations des serveurs
staging_config = {
    "SERVER_HOST": "staging.hugodurieux.fr",
    "SERVER_USER": "mryoogomusic",
    "APP_PATH": "/home/deploy/mryoogomusic-staging",
    "MONGO_URL": "mongodb://mongodb:27017",
    "DB_NAME": "rockzone_staging",
    "MONGO_ROOT_USER": "admin",
    "MONGO_ROOT_PASSWORD": "Anouck17ff&&",
    "REACT_APP_BACKEND_URL": "https://staging.hugodurieux.fr",
    "STAGING_URL": "https://staging.hugodurieux.fr"
}

production_config = {
    "SERVER_HOST": "mryoogomusic.fr",
    "SERVER_USER": "mryoogomusic",
    "APP_PATH": "/home/deploy/mryoogomusic-production",
    "MONGO_URL": "mongodb://mongodb:27017",
    "DB_NAME": "rockzone_production",
    "MONGO_ROOT_USER": "admin",
    "MONGO_ROOT_PASSWORD": "Texas17ff&&",
    "REACT_APP_BACKEND_URL": "https://mryoogomusic.fr",
    "PRODUCTION_URL": "https://mryoogomusic.fr"
}

def encrypt_secret(public_key: str, secret_value: str) -> str:
    """Chiffre un secret avec la clé publique du repo"""
    public_key_obj = public.PublicKey(public_key.encode("utf-8"), encoding.Base64Encoder())
    sealed_box = public.SealedBox(public_key_obj)
    encrypted = sealed_box.encrypt(secret_value.encode("utf-8"))
    return base64.b64encode(encrypted).decode("utf-8")

def get_public_key(environment: str):
    """Récupère la clé publique pour chiffrer les secrets"""
    url = f"{API_BASE}/repos/{REPO_OWNER}/{REPO_NAME}/environments/{environment}/secrets/public-key"
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        data = response.json()
        return data["key_id"], data["key"]
    return None, None

def create_environment(env_name: str):
    """Crée un environment sur GitHub"""
    print(f"📦 Création de l'environment '{env_name}'...")
    url = f"{API_BASE}/repos/{REPO_OWNER}/{REPO_NAME}/environments/{env_name}"
    
    payload = {}
    if env_name == "production":
        # Protection pour production
        payload = {
            "wait_timer": 300,  # 5 minutes
            "prevent_self_review": False
        }
    
    response = requests.put(url, headers=headers, json=payload)
    
    if response.status_code in [200, 201]:
        print(f"  ✅ Environment '{env_name}' créé")
        return True
    else:
        print(f"  ⚠️  Erreur: {response.status_code} - {response.text}")
        return False

def create_secret(environment: str, secret_name: str, secret_value: str):
    """Crée un secret dans un environment"""
    print(f"  🔑 Ajout secret: {secret_name}")
    
    # Récupérer la clé publique
    key_id, public_key = get_public_key(environment)
    if not public_key:
        print(f"    ❌ Impossible de récupérer la clé publique")
        return False
    
    # Chiffrer le secret
    encrypted_value = encrypt_secret(public_key, secret_value)
    
    # Créer le secret
    url = f"{API_BASE}/repos/{REPO_OWNER}/{REPO_NAME}/environments/{environment}/secrets/{secret_name}"
    payload = {
        "encrypted_value": encrypted_value,
        "key_id": key_id
    }
    
    response = requests.put(url, headers=headers, json=payload)
    
    if response.status_code in [201, 204]:
        print(f"    ✅ Secret '{secret_name}' ajouté")
        return True
    else:
        print(f"    ❌ Erreur: {response.status_code}")
        return False

def setup_branch_protection(branch: str):
    """Configure la protection de branche"""
    print(f"🔒 Protection de la branche '{branch}'...")
    url = f"{API_BASE}/repos/{REPO_OWNER}/{REPO_NAME}/branches/{branch}/protection"
    
    if branch == "main":
        payload = {
            "required_status_checks": {
                "strict": True,
                "contexts": [
                    "Frontend Tests & Build",
                    "Backend Tests & Validation",
                    "Docker Build Test"
                ]
            },
            "enforce_admins": False,
            "required_pull_request_reviews": {
                "required_approving_review_count": 1,
                "dismiss_stale_reviews": True
            },
            "restrictions": None,
            "required_linear_history": False,
            "allow_force_pushes": False,
            "allow_deletions": False
        }
    else:  # develop
        payload = {
            "required_status_checks": {
                "strict": True,
                "contexts": [
                    "Frontend Tests & Build",
                    "Backend Tests & Validation",
                    "Docker Build Test"
                ]
            },
            "enforce_admins": False,
            "required_pull_request_reviews": {
                "required_approving_review_count": 0
            },
            "restrictions": None,
            "required_linear_history": False,
            "allow_force_pushes": False,
            "allow_deletions": False
        }
    
    response = requests.put(url, headers=headers, json=payload)
    
    if response.status_code in [200]:
        print(f"  ✅ Branche '{branch}' protégée")
        return True
    else:
        print(f"  ⚠️  Erreur: {response.status_code} - {response.text}")
        return False

# Générer une clé SSH
print("🔑 Génération de la clé SSH...")
import subprocess
import os

ssh_key_path = os.path.expanduser("~/.ssh/rockzone_deploy_auto")
if not os.path.exists(ssh_key_path):
    subprocess.run([
        "ssh-keygen", "-t", "ed25519", 
        "-C", "deploy@rockzone-auto",
        "-f", ssh_key_path,
        "-N", ""
    ], check=True)
    print(f"  ✅ Clé SSH générée: {ssh_key_path}")
else:
    print(f"  ✅ Clé SSH existe déjà: {ssh_key_path}")

# Lire la clé privée
with open(ssh_key_path, 'r') as f:
    ssh_private_key = f.read()

# Ajouter la clé SSH aux configs
staging_config["SERVER_SSH_KEY"] = ssh_private_key
production_config["SERVER_SSH_KEY"] = ssh_private_key

print()
print("=" * 60)
print("🚀 Début de la configuration automatique")
print("=" * 60)
print()

# 1. Créer les environments
print("📦 ÉTAPE 1/3: Création des environments")
create_environment("staging")
create_environment("production")
print()

# 2. Ajouter les secrets pour STAGING
print("🔑 ÉTAPE 2/3: Configuration des secrets STAGING")
for secret_name, secret_value in staging_config.items():
    create_secret("staging", secret_name, secret_value)
print()

# 3. Ajouter les secrets pour PRODUCTION
print("🔑 Configuration des secrets PRODUCTION")
for secret_name, secret_value in production_config.items():
    create_secret("production", secret_name, secret_value)
print()

# 4. Protéger les branches
print("🔒 ÉTAPE 3/3: Protection des branches")
setup_branch_protection("develop")
setup_branch_protection("main")
print()

# Afficher la clé publique à copier sur les serveurs
print("=" * 60)
print("✅ CONFIGURATION TERMINÉE!")
print("=" * 60)
print()
print("📋 Prochaines étapes:")
print()
print("1. Copiez la clé SSH publique sur vos serveurs:")
print()
print(f"   STAGING: ssh-copy-id -i {ssh_key_path}.pub mryoogomusic@staging.hugodurieux.fr")
print(f"   PRODUCTION: ssh-copy-id -i {ssh_key_path}.pub mryoogomusic@mryoogomusic.fr")
print()
print("2. Installez Docker sur les serveurs:")
print("   curl -fsSL https://get.docker.com | sh")
print("   sudo apt-get install docker-compose-plugin")
print()
print("3. Lancez le déploiement:")
print("   git checkout develop")
print("   git push origin develop")
print()
print("⚠️  IMPORTANT SÉCURITÉ:")
print("   Révoquez le token GitHub sur: github.com/settings/tokens")
print()
print("🎸 Bon déploiement!")
print()

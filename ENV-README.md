# RockZone - Variables d'environnement pour CI/CD

## Pour le déploiement Docker (CI/CD)

Les fichiers `.env` sont **générés automatiquement** par le CI/CD à partir des secrets GitHub. Ne les committez **JAMAIS** sur Git.

### Fichiers template fournis :
- `frontend/.env.example` - Template pour frontend
- `backend/.env.example` - Template pour backend

### Configuration locale (développement)

1. **Copier les templates**
   ```bash
   cp frontend/.env.example frontend/.env
   cp backend/.env.example backend/.env
   ```

2. **Modifier les valeurs** selon votre environnement local

### Configuration CI/CD

Les `.env` sont créés automatiquement lors du déploiement avec les secrets GitHub configurés dans les environments `staging` et `production`.

Voir `README-DEPLOYMENT.md` pour la liste complète des secrets à configurer.

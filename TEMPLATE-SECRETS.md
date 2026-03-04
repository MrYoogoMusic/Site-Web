# Template Secrets GitHub - RockZone

Ce fichier vous aide à préparer vos secrets avant de les ajouter sur GitHub.
Remplissez les valeurs ci-dessous, puis copiez-les une par une dans GitHub.

---

## STAGING ENVIRONMENT

### SERVER_HOST
```
Entrez votre valeur ici (IP ou domaine):


Exemple: 51.15.123.45 ou staging.rockzone.com
```

### SERVER_USER
```
Entrez votre valeur ici:


Exemple: deploy
```

### SERVER_SSH_KEY
```
Collez TOUTE votre clé privée ici (incluant BEGIN et END):




Commande pour obtenir la clé: cat ~/.ssh/rockzone_deploy
```

### APP_PATH
```
Entrez votre valeur ici:


Exemple: /home/deploy/rockzone-staging
```

### MONGO_URL
```
Entrez votre valeur ici:


Par défaut: mongodb://mongodb:27017
(Ne changez que si MongoDB est externe)
```

### DB_NAME
```
Entrez votre valeur ici:


Exemple: rockzone_staging
```

### MONGO_ROOT_USER
```
Entrez votre valeur ici:


Exemple: admin
```

### MONGO_ROOT_PASSWORD
```
Créez un mot de passe fort:


Exemple: S3cur3P@ssw0rd!Staging
```

### REACT_APP_BACKEND_URL
```
URL publique de votre application staging:


Exemple: https://staging.rockzone.com
```

### STAGING_URL
```
URL de staging (même valeur que REACT_APP_BACKEND_URL):


Exemple: https://staging.rockzone.com
```

---

## PRODUCTION ENVIRONMENT

### SERVER_HOST
```
Entrez votre valeur ici (IP ou domaine):


Exemple: 51.15.123.99 ou rockzone.com
```

### SERVER_USER
```
Entrez votre valeur ici:


Exemple: deploy
```

### SERVER_SSH_KEY
```
Collez TOUTE votre clé privée ici (incluant BEGIN et END):
(Peut être la même que staging)




Commande pour obtenir la clé: cat ~/.ssh/rockzone_deploy
```

### APP_PATH
```
Entrez votre valeur ici:


Exemple: /home/deploy/rockzone-production
```

### MONGO_URL
```
Entrez votre valeur ici:


Par défaut: mongodb://mongodb:27017
(Ne changez que si MongoDB est externe)
```

### DB_NAME
```
Entrez votre valeur ici:


Exemple: rockzone_production
```

### MONGO_ROOT_USER
```
Entrez votre valeur ici:


Exemple: admin
```

### MONGO_ROOT_PASSWORD
```
Créez un mot de passe fort (DIFFÉRENT de staging):


Exemple: Pr0dS3cur3P@ssw0rd!
```

### REACT_APP_BACKEND_URL
```
URL publique de votre application production:


Exemple: https://rockzone.com
```

### PRODUCTION_URL
```
URL de production (même valeur que REACT_APP_BACKEND_URL):


Exemple: https://rockzone.com
```

---

## ✅ Une fois rempli

1. Allez sur GitHub : `https://github.com/VOTRE-USERNAME/VOTRE-REPO/settings/environments`
2. Cliquez sur l'environment (staging ou production)
3. Pour chaque secret :
   - Cliquez "Add secret"
   - Nom : utilisez exactement le nom ci-dessus
   - Value : copiez la valeur que vous avez préparée
   - Cliquez "Add secret"

---

## ⚠️ IMPORTANT

- Les mots de passe MongoDB doivent être DIFFÉRENTS entre staging et production
- La clé SSH doit inclure TOUTES les lignes (BEGIN et END)
- Les URLs ne doivent PAS se terminer par un `/`
- Vérifiez qu'il n'y a pas d'espaces avant/après les valeurs

---

Bon courage ! 🚀

# Compendium du discord

Site statique d'entraînement au concours DGFiP, protégé par mot de passe. Tout le contenu est chiffré (AES-256-GCM, clé dérivée du mot de passe par PBKDF2-SHA256) et déchiffré dans le navigateur.

## Organisation

- `src/verrou.html` : écran de saisie du mot de passe (seul fichier lisible du site publié).
- `scripts/build-content.mjs` : chiffre `content/site` vers `dist/`.
- `scripts/deploy.mjs` : publie `dist/` sur la branche `gh-pages`.
- `site.config.mjs` : réglages publics (sel, itérations, dossiers).
- `content/` : site en clair (cours, banques de questions, moteur). Exclu de Git, jamais publié.

## Publier

```
COMPENDIUM_MDP='...' node scripts/build-content.mjs
node scripts/deploy.mjs
```

GitHub Pages doit pointer sur la branche `gh-pages`, dossier `/` (Settings, Pages).

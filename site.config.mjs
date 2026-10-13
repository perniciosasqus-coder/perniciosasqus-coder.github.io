// Réglages publics du site. Le mot de passe n'est jamais stocké ici.
export default {
  titre: "Compendium du discord",
  sel: "z53rEvWGbKVn6hwmZMAtTA==",          // sel PBKDF2 (public)
  iterations: 600000,     // coût de dérivation de la clé
  contenu: "content/site", // site en clair (ignoré par Git)
  sortie: "dist"           // site chiffré, publié sur gh-pages
};

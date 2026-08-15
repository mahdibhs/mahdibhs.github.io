# Portfolio — Mahdi Belhadj Sassi

Portfolio personnel statique (HTML5 / CSS3 / JavaScript vanilla), prêt à être
publié gratuitement sur **GitHub Pages**, sans framework ni étape de build.

## Structure du projet

```
.
├── index.html            Page d'accueil
├── about.html            À propos, compétences, expérience
├── projects.html         Projets (structure prête à l'emploi)
├── blog.html             Liste des articles (recherche, catégories, tags, pagination)
├── blog-post.html        Affichage d'un article unique
├── contact.html          Formulaire de contact + réseaux
├── robots.txt
├── sitemap.xml
├── .nojekyll             Empêche GitHub Pages de traiter le site avec Jekyll
├── assets/
│   ├── css/style.css     Feuille de style principale
│   ├── js/
│   │   ├── main.js       Menu mobile, scroll reveal, barres de compétences
│   │   ├── blog.js       Moteur de blog (lecture des .md, recherche, pagination)
│   │   └── contact.js    Validation du formulaire de contact
│   ├── images/           Avatar et favicon (SVG placeholders)
│   └── cv/               Emplacement du CV à télécharger (PDF à ajouter)
└── blog/
    ├── posts.json        Index des articles (métadonnées)
    └── posts/*.md        Contenu des articles au format Markdown
```

## Publier le site sur GitHub Pages

1. Créez un dépôt GitHub nommé `votre-pseudo.github.io` (ou un dépôt classique
   si vous préférez utiliser `github.io/nom-du-depot`).
2. Poussez l'intégralité de ce dossier à la racine du dépôt :
   ```bash
   git init
   git add .
   git commit -m "Portfolio initial"
   git branch -M main
   git remote add origin https://github.com/votre-pseudo/votre-pseudo.github.io.git
   git push -u origin main
   ```
3. Dans les paramètres du dépôt GitHub : **Settings → Pages → Source**,
   choisissez la branche `main` et le dossier `/ (root)`.
4. Votre site sera disponible sous quelques minutes à l'adresse
   `https://votre-pseudo.github.io/`.

## Personnaliser le contenu

- **CV** : déposez votre PDF dans `assets/cv/CV-Mahdi-Belhadj-Sassi.pdf`
  (voir `assets/cv/LISEZ-MOI.txt`).
- **Photo de profil** : remplacez `assets/images/avatar.svg` par votre photo
  (mettez à jour le chemin dans `index.html` et `about.html` si vous changez
  le nom de fichier).
- **Liens réels** (GitHub, LinkedIn, email) : recherchez et remplacez les
  liens d'exemple dans `index.html`, `about.html`, `contact.html` et
  `blog-post.html`/`blog.html` (pied de page).
- **Projets** : dans `projects.html`, dupliquez un bloc `<article class="project-card">`
  par projet et remplacez son contenu.
- **Articles de blog** : ajoutez un fichier `.md` dans `blog/posts/`, puis
  ajoutez une entrée correspondante dans `blog/posts.json` (titre, date,
  catégorie, tags, extrait, nom du fichier).
- **Adresse du site** : mettez à jour les URLs `https://mahdibhs.github.io/`
  dans les balises `<meta>` (Open Graph, canonical) et dans `sitemap.xml` /
  `robots.txt` avec votre propre URL GitHub Pages.

## Effets ajoutés

- **Mode sombre / clair** : bouton 🌙/☀️ dans la navigation. Le choix est mémorisé
  (`localStorage`) et appliqué immédiatement au chargement (pas de flash de la
  mauvaise couleur), avec repli automatique sur la préférence système si
  l'utilisateur n'a jamais choisi.
- **Barre de progression de lecture** : fine ligne bleue en haut de la fenêtre
  qui se remplit selon la position de scroll (`assets/js/effects.js`).
- **Tilt 3D au survol** : les cartes (points forts, compétences, projets)
  s'inclinent légèrement en suivant la position du curseur.
- **Boutons magnétiques** : les boutons se déplacent légèrement vers le
  curseur au survol.
- **Machine à écrire** dans le hero : le rôle affiché change en boucle
  (Développeur Web / PHP / Flutter / Intégrateur WordPress).

Tous ces effets respectent `prefers-reduced-motion` (désactivés si l'utilisateur
a réduit les animations dans son système) et le tilt/magnétisme est désactivé
sur les appareils tactiles (pas de `mousemove` pertinent).

## Notes techniques

- Le formulaire de contact fonctionne sans backend : il ouvre le client mail
  de l'utilisateur via `mailto:`. Pour un envoi silencieux (sans ouvrir de
  logiciel mail), reliez `assets/js/contact.js` à un service comme Formspree
  ou EmailJS.
- Le blog lit les fichiers Markdown directement depuis le navigateur avec
  `fetch()` : cela fonctionne une fois le site déployé (ou servi via un petit
  serveur local), mais pas en ouvrant les fichiers `.html` directement depuis
  l'explorateur de fichiers (`file://`), à cause des restrictions de sécurité
  des navigateurs sur `fetch()`. Pour tester en local, lancez par exemple
  `python3 -m http.server` à la racine du projet.
- Le site respecte `prefers-reduced-motion` et les styles de focus visibles
  pour l'accessibilité.

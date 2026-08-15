# Construire un thème WordPress sur-mesure, étape par étape

Partir d'une maquette et livrer un thème WordPress propre demande une méthode
claire, sinon le projet devient vite difficile à maintenir.

## 1. Préparer la structure de base

Un thème minimal commence par `style.css` (avec l'en-tête obligatoire),
`index.php`, `functions.php`, et les templates principaux : `header.php`,
`footer.php`, `single.php`, `page.php`.

## 2. Déclarer les fonctionnalités dans functions.php

```
function monTheme_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    register_nav_menus([
        'primary' => 'Menu principal',
    ]);
}
add_action('after_setup_theme', 'monTheme_setup');
```

## 3. Découper la maquette en templates

Chaque type de contenu (page d'accueil, article, page standard) correspond à
un template dédié. Cela évite les conditions interminables dans un seul
fichier et garde chaque template lisible.

## 4. Utiliser des champs personnalisés avec parcimonie

Pour du contenu structuré (une galerie, des informations de contact), les
champs personnalisés évitent de tout coder en dur dans le thème et donnent de
l'autonomie au client pour éditer son contenu.

## 5. Optimiser avant la mise en ligne

Compression des images, minification des assets, mise en cache : ces étapes
finales font souvent la différence entre un site correct et un site vraiment
rapide.

## En résumé

Un bon thème WordPress sur-mesure n'est pas seulement une question de design :
c'est une architecture de fichiers claire qui permettra de faire évoluer le
site sans tout casser.

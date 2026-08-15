# Organiser son CSS à grande échelle avec des variables

Sur un petit site, n'importe quelle organisation CSS fonctionne. Le problème
arrive quand le projet grandit : les couleurs se dupliquent, les espacements
deviennent incohérents, et chaque modification devient risquée.

## Centraliser les décisions dans `:root`

La première étape consiste à définir un système de tokens au sommet de la
feuille de style :

```
:root {
  --color-navy: #0a2540;
  --color-blue: #2b6cb0;
  --space-3: 1rem;
  --radius-md: 12px;
}
```

Chaque composant vient ensuite piocher dans ces variables plutôt que
d'inventer de nouvelles valeurs.

## Nommer par intention, pas par apparence

Une variable comme `--blue-2` oblige à se souvenir de ce qu'elle représente.
Une variable comme `--color-primary-hover` porte son intention directement
dans son nom.

## Découper par composant

Un fichier CSS unique de 3000 lignes est difficile à naviguer. Regrouper les
règles par composant (carte, bouton, formulaire) — même dans un seul fichier,
via des sections clairement commentées — rend la maintenance beaucoup plus
simple.

## Limiter la spécificité

Les sélecteurs trop imbriqués créent des conflits difficiles à déboguer. Une
règle simple : préférer les classes aux sélecteurs d'éléments, et éviter de
dépasser deux niveaux d'imbrication.

## En résumé

Un système de variables bien pensé transforme le CSS d'un empilement de
correctifs en un vrai langage de design cohérent, compréhensible par toute
personne qui reprend le projet.

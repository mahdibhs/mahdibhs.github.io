# Un workflow Git simple, en solo comme en équipe

Il n'est pas nécessaire d'adopter un modèle de branches complexe pour être
efficace avec Git. Voici l'organisation que j'utilise réellement.

## La branche main reste toujours stable

`main` (ou `master`) ne contient que du code fonctionnel. Aucun développement
ne s'y fait directement.

## Une branche par fonctionnalité

```
git checkout -b feature/formulaire-contact
```

Chaque nouvelle fonctionnalité ou correction vit dans sa propre branche, avec
un nom descriptif. Cela permet de travailler sur plusieurs sujets en parallèle
sans se marcher dessus.

## Des messages de commit clairs

> Un bon message de commit explique **pourquoi** un changement a été fait, pas
> seulement ce qui a changé.

Un format simple suffit : `type: description courte`, par exemple
`fix: corrige la validation de l'email`.

## Fusionner via une Pull Request

Même en solo, ouvrir une Pull Request avant de fusionner dans `main` force à
relire son propre code avec un peu de recul, et laisse une trace claire de
l'historique du projet.

## En résumé

Ce workflow reste volontairement simple : une branche stable, des branches de
travail courtes, des messages clairs. C'est suffisant pour rester organisé,
seul ou à plusieurs.

# Démarrer avec PHP 8 : ce qui change vraiment

PHP 8 n'est pas juste une mise à jour de version : plusieurs changements modifient
concrètement la façon d'écrire du code backend au quotidien.

## Les types d'union

On peut désormais déclarer plusieurs types possibles pour un même paramètre ou
une même valeur de retour :

```
function formatPrice(int|float $amount): string {
    return number_format($amount, 2) . " DT";
}
```

Cela rend les fonctions plus explicites sans sacrifier la flexibilité.

## Les arguments nommés

Fini les longues listes de paramètres positionnels difficiles à relire :

```
creerUtilisateur(
    nom: "Mahdi",
    email: "mahdi@example.com",
    actif: true
);
```

## L'opérateur nullsafe

Avant, vérifier plusieurs niveaux d'objets potentiellement nuls demandait
plusieurs conditions imbriquées. Avec `?->`, tout tient sur une ligne et le
code reste lisible.

## Match au lieu de switch

L'expression `match` remplace avantageusement `switch` dans de nombreux cas :
comparaison stricte par défaut, pas de `break` oublié, et une syntaxe plus
courte pour retourner une valeur directement.

## En résumé

Ces changements ne bouleversent pas la philosophie de PHP, mais ils réduisent
le code répétitif et rendent les intentions plus claires. C'est exactement le
genre d'évolution qui compte sur un projet qui vit dans le temps.

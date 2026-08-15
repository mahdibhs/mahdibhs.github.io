# Premiers pas avec Flutter quand on vient du web

Quand on a l'habitude du HTML, du CSS et du JavaScript, Flutter peut sembler
déroutant au premier abord. En réalité, plusieurs concepts se recoupent
directement.

## Tout est un widget

En HTML, une page est un arbre d'éléments imbriqués. En Flutter, une page est
un arbre de **widgets** imbriqués. Un `Container` ressemble à une `div` avec
des styles inline, une `Column` se comporte comme un `display: flex` en
colonne, et une `Row` comme un `display: flex` en ligne.

```
Column(
  children: [
    Text("Bonjour"),
    ElevatedButton(
      onPressed: () {},
      child: Text("Cliquez ici"),
    ),
  ],
)
```

## Le state, comme le state en JS

Un `StatefulWidget` fonctionne un peu comme un composant avec `useState` en
React : on appelle `setState()` pour dire à Flutter de re-dessiner l'interface
avec les nouvelles données, exactement comme on déclenche un re-render côté
web.

## Le responsive se pense différemment

Il n'y a pas de media queries CSS. À la place, on utilise `MediaQuery` ou des
widgets comme `LayoutBuilder` pour adapter l'interface à la taille de l'écran,
en code plutôt qu'en CSS.

## En résumé

Flutter demande d'apprendre un nouveau vocabulaire, mais les réflexes de
composition d'interface acquis sur le web restent très utiles. C'est surtout
une question de traduction, pas de tout réapprendre depuis zéro.

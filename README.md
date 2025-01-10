# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Règles

6 dés
Chaque joueur doit garde minimum 1 dé par tour
Un joueur gagne s’il atteint 10 000 points
pour ‘rentrer’ dans la partie, un joueur doit avoir marqué 500 points
Le joueur peut s’arrêter afin de conserver les points qu’il a accumulé pendant ce tour (pas possible si le joueur n’est pas rentré et a cumulé moins de 500 points)
Si un joueur est ‘rentré’, il peut récupérer les dés non joués par son voisin (celui qui a joué avant lui) et additionner son résultat à celui précédemment effectué par son adversaire.
Chaque combinaison n’est valable que pour un seul et même lancer et les dés ne se cumulent pas entre les tours (obtenir un 5 trois tours de suite ne vaut que 150 alors qu’en un seul lancer ça vaut 500)
Si un joueur lors d’un lancer ne fait rien , ni 5, ni 1, ni triple ou plus, ni suite (suite uniquement dans le cadre d’un premier lancer) alors il ne marque aucun point à ce tour et il obtient une barre s’il est déjà rentré, sinon il passe juste son tour.
Au bout de trois barres de suite, le joueur en question perd 500 points.
Lorsqu’un joueur marque 10 000 points, c’est seulement lorsque l’on revient sur le joueur ayant commencé que la partie s’arrête et c’est celui ayant le plus de points qui gagne.
Lorsqu’un joueur arrive à convertir ses 6 dés en points, il les relance tous et continue de jouer, il continue d’additionner ses points ( exemple : un joueur à fait 3 tours : 1er tour : un triple 5 qu’il conserve, 2ème tour = un 5 et un 1, troisieme tour, un 1, il a donc 750 points et relance les six dés, s’il faisait un 1, alors il aurait 850 points et ainsi de suite)

Les valeurs : 

un 1 = 100 points
un 5 = 50 points
une suite du premier coup (premier lancer = 1 2 3 4 5 6) = 1 000 points
un triple = la valeur du triple en centaine, sauf triple 1 qui vaut 700
un quadruple = la valeur du double * 2
un quintuple = la valeur du quadruple * 2
un sixtuple : la valeur du quintuple * 2



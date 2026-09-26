# Glossaire de termes (Gameplay)

## ACTIONS

### Cible X
Les effets suivant celui-ci sont appliqué au X personnage ciblés.

### Porté X
La zone d’effet ou les cibles doivent se trouver dans un rayon de X cases autour du déclencheur.
> N.B. : Une porté de 'soi-même' ou de 0, ne touche personne sauf si elle est utilisée dans une zone. Dans ces cas là, la zone à pour point d'apparition le lanceur.

### Attire X
Le personnage affecté se rapproche du point d’attraction de X cases.

### Repousse/Recul X
Le personnage affecté s’éloigne du point de déclenchement de X cases.

### Soin X
Le personnage affecté reprend X point de vie.

### Dégats X
Le personnage affecté perd X point de vie.

### Déplacement F X
Le personnage se déplace de jusqu’à X cases.
F correspond à la forme de déplacement. Par défaut c'est 'Marche'.
```
Marche : Le personnage marche et est affecté par tout les effets de tuiles.
Saut : Le personnage saute d'un point A a un point B en UNE fois. 
       Il n'est affecté que par l'effet de la tuile d'arrivée.
Vol : Le personnage vol, il n'est donc pas affecté par les effets de tuiles.
```

### Zone F T
Touche tout les personnage dans la zone de forme F et de taille T.


## TYPE DE ZONES
```
T: La taille de la zone.
O: Le point d'appartion/'centre' de la zone.
X: Tuiles touchés par la zone.
```

### Toutes zones T
T = 0 :
```
O
```

### Croix T
T = 1 : 
```
  X
X O X
  X
```
T = 2 :
```
    X
    X
X X O X X
    X
    X
```

### Ligne T
T = 1 :
```
O X
```
T = 2 :
```
O X X
```
T = 3 :
```
O X X X
```

### Cône T
T = 1 :
```
O X
```
T = 2 :
```
    X
O X X
    X
```
T = 3 :
```
      X
    X X
O X X X
    X X
      X
```

### Triangle T
T = 1 :
```
  X
O X
  X
```
T = 2 :
```
    X
  X X
O X X
  X X
    X
```
T = 3 :
```
      X
    X X
  X X X
O X X X
  X X X
    X X
      X
```

### Cercles T
T = 1 :
```
  X
X O X
  X
```
T = 2 :
```
    X
  X X X
X X O X X
  X X X
    X
```
T = 3 :
```
      X
    X X X
  X X X X X
X X X O X X X
  X X X X X
    X X X
      X
```

### Carrés T
T = 1 :
```
X X X
X O X
X X X
```
T = 2 :
```
X X X X X
X X X X X
X X O X X
X X X X X
X X X X X
```

## EFFETS DE STATUS

### Purification X
Le personnage affecté devient immunisé aux effets de status pour X tour.

### Protection/Protège X
Le personnage gagne X bouclier.

### Force X
Le personnage affecté inflige X dégats supplémentaires sur sa prochaine attaque.

### Invincible X
Le personnage ne peut pas subire de dégats pendant X tours

### Brulûre/Brûle X
Pendant X tours, le personnage affecté lance un d6. S'il fait moins de 5, perd 2 points de vie.

### Aveuglement X
Pendant X tours, le personnage doit lancer un d20 à chaque attaque, elles ne touche seulement si le résultat est strictement supérieur à 15.

### Ettoufement X
Pendant X tours, le personnage ne peut plus parlé et perd 1 point de vie par tour.

### Immobilisation/Immobile X
Pendant X tours, le personnage ne peut plus effectuer d’action de déplacement.

### Faiblesse X
Le personnage affecté inflige X dégats de moins sur sa prochaine attaque.

### Prédictions X


### Ronces X
Le personnage affecté lance X d4 et prend autant de dégâts que le total de tout les dés.

### Assomer X
Le personnage affecté lance un d6. S'il fait moins de X, il passe son prochain tour.

### Invisible X
Le personnage ne peut pas être ciblé ou detecté par les ennemis pendant X tours. Effectuer une action autre que 'Déplacement' enlève l'état 'Invisible'.
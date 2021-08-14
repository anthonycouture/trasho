# Projet Trasho

Ce projet a été créé dans le cadre du cour de PAI en Master MIAGE à l'Université de Lille.

Présentation [Presentation_Trasho.pdf](https://raw.githubusercontent.com/anthonycouture/trasho/main/source-readme/Presentation_Trasho.pdf)  

## Contributeurs 

| <a href="https://github.com/anthonycouture"><img src="https://avatars.githubusercontent.com/u/30239710?v=4" title="anthony" width="80" height="80"></a> | <a href="https://github.com/FlorianBarbet"><img src="https://avatars.githubusercontent.com/u/28789447?v=4" title="florian" width="80" height="80"></a> | <a href="https://github.com/RaphMLK"><img src="https://avatars.githubusercontent.com/u/50629372?v=4" title="Raphael" width="80" height="80"></a> | <a href="https://github.com/Naoyoshi2"><img src="https://avatars.githubusercontent.com/u/40067108?v=4" title="Lucas" width="80" height="80"></a> |
|-----------|-----------|-----------|-----------|
| <a href="https://github.com/anthonycouture">Anthony Couture</a> | <a href="https://github.com/FlorianBarbet">Florian Barbet</a> | <a href="https://github.com/RaphMLK">Raphaël Mouloukin</a> | <a href="https://github.com/Naoyoshi2">Lucas Laloux</a> |


## Configuration de l'application

### Script pour la base de données
Dans le dossier **BDD** se trouve un script pour la création de l'environnement de développement.  
Le fichier **script_creation.sql** permet la création de l'ensemble des tables avec leurs contraintes

### Back
Dans le dossier back :
* Installer les dépendances : `npm install`
* Dans le fichier home.js modifier le morceaux de code ci-dessous par vos information de connection
```
const pool = new Pool({
  user: 'root',
  host: 'localhost',
  database: 'trasho',
  password: 'anthony',
  port: 5432,
})
```
* Démarrer le back : `node home.js`

### Démarrer le front
* Installer expo qui est un formidable outil pour le développement en REACT NATIVE : `npm install -g expo-cli`  
* Dans le dossier front :
  * Installer les dépendances : `npm install`
  * Démarrer le front : `npm start`

## Anomalies

### En cas de difficultés pour faire fonctionner expo avec le projet, suivre les étapes suivantes :

* npm install dans le dossier expoMap
* Si ça ne marche pas et qu'il y a une erreur avec expo -> npm install -g expo-cli
* Changer le fichier ExpoMap -> node-modules -> metro-config -> src -> defaults -> blacklist.js par celui qui corrige le problème de syntaxe
* Dans expoMap taper la commande (si erreur sur les versions de map) : expo install react-native-maps@0.24.0 (vérifier la version demandée)

# Initialisation du projet

WS :
* Cloner le repertoire
* Descendre les dépendances `$ npm update`
* Lancer le serveur : `$ node server.js`
* Lancer les tests : `$ npm run test`

# Test de communication entre BDD, Back, Front
### Démarrer le back
Dans la base de données, créer une base de données "trasho". Puis exécuter lui le code suivant :  
```
create table test(
	texte varchar not null
);

insert into test values ('Hello');
```
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
* Installer expo qui est un formidable outil pour le développement en REACT : `npm install -g expo-cli`  
* Dans le dossier front :
  * Installer les dépendances : `npm install`
  * Démarrer le front : `npm start`

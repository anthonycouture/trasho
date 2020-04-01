var express = require('express'); 

// Obligatoire pour la communication entre le back et le front
var cors = require('cors')


// Paramètre du serveur
var hostname = 'localhost'; 
var port = 3000; 

// Nous créons un objet de type Express. 
var app = express(); 

app.use(cors())

//Connexion à la base de données
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'root',
  host: 'localhost',
  database: 'trasho',
  password: 'anthony',
  port: 5432,
})

// Je vous rappelle notre route (/).  
app.get('/', function (req, res) {
    pool.query('SELECT * FROM test', (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).send(results.rows)
      })
});

app.get('/poubelles', function (req, res) {
  pool.query('SELECT * FROM poubelle', (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).send(results.rows)
    })
});


// Démarrer le serveur 
app.listen(port, hostname, function(){
	console.log("Mon serveur fonctionne sur http://"+ hostname +":"+port+"\n"); 
});


// Importer le module express
const express = require ('express');
const dotenv = require('dotenv');
dotenv.config();
// Port
const PORT = process.env.PORT || 3000;
// Importer swagger
const swaggerUi = require('swagger-ui-express');
// Définir le fichier swagger
const swaggerDocument = require('./src/config/documentation.json');

const swaggerOptions = {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Formatif Netflix'
};

//const authentification = require('./src/middlewares/authentification.intergiciel');

// Importer les modules fs, morgan et path
var fs = require('fs');
var morgan = require('morgan');
var path = require('path');



// Créer une application express
const app = express();

// Stream pour les logs
var logAcces = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

// Middlewares
app.use(express.json());
app.use(morgan(':date[clf] => :method / :url / :status - :response-time ms', { stream: logAcces }));

// Routes
app.use('/api/titres', require('./src/routes/titres.route.js'));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));

app.get('/' || '', (_, res) => {
    res.send("<h1>API de netflix!</h1>");
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
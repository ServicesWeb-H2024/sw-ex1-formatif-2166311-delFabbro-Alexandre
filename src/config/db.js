/** 
 * Connexion à la base de données
 * 
 * @author Mathieu Fréchette <frechette.mathieu@cegepvicto.ca>
 * Code vu durant le cours de Services Web - Cégep de Victoriaville
 * https://services-web-victo.github.io/notes_de_cours/node/express_mysql/#creation-du-pool-de-connexions - [Consulté le 22 février 2024]
 */
const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();

const pool = mysql.createPool({
    connectionLimit: process.env.MYSQL_CONNECTION_LIMIT,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

module.exports = pool;
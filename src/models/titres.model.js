const sql = require("../config/db.js");

/**
 * Classe représentant un titre
 * @author Alexandre del Fabbro <alexandre.delfabbro@gmail.com>
 * Inspiré de l'exercice 5 du cours de Services Web - Cégep de Victoriaville - Hiver 2024
 */
class Titre {
    /**
     * Constructeur de la classe
     * @param {Object} titre - Un objet représentant un titre
     */
    constructor(titre) {
        this.id = titre.show_id;
        this.titre = titre.title;
        this.type_titre = titre.show_type;
    };

    /**
     * Méthode pour trouver les titres selon le type
     * 
     * @param {String} type_titre - Le type de titre
     * @returns {Promise<object>} - Un objet des titres trouvés ou une erreur
     */
    static getTitres = (type_titre) => {
        return new Promise((resolve, reject) => {

            // Requête SQL pour trouver les titres selon le type
            const requete = `SELECT show_id, title FROM netflix_titles WHERE show_type = ?`;
            const parametres = [type_titre];

            // Exécution de la requête
            sql.query(requete, parametres, (erreur, reponse) => {
                if (erreur) {
                    // En cas d'erreur
                    console.log(`Erreur SQL: (${erreur.sqlState}) : ${erreur.sqlMessage}`);
                    reject(erreur);
                }
                // En cas de succès
                resolve(reponse);
            });
            return;
        });
    };
}

module.exports = Titre;
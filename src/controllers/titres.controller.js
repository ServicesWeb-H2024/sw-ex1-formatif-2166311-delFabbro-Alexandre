/**
 * Contrôleur pour les routes des titres netflix.
 * 
 * @author Alexandre del Fabbro <alexandre.delfabbro@gmail.com>
 * Inspiré de l'exercice 5 du cours de Services Web - Cégep de Victoriaville - Hiver 2024
 */
const e = require("express");
const Titre = require("../models/titres.model.js");
const { parse } = require("path");

/** 
 * Fonction pour trouver les titres selon le type
 * 
 * @param {*} req - La requête HTTP
 * @param {*} res - La réponse HTTP
 */
exports.getTitres = (req, res) => {
    // Récupération de la page demandée
    let pageAffichee = parseInt(req.query.page) || 1;

    if(isNaN(pageAffichee) || pageAffichee < 1) {
        pageAffichee = 1;
    }

    let type_titre = req.params.type_titre;

    if(req.params.type_titre == "film" || req.params.type_titre == "movie") {
        type_titre = "Movie";
    }
    else if(req.params.type_titre == "serie" || req.params.type_titre == "tv_show") {
        type_titre = "TV Show";
    }
    else {
        // Envoi d'un message d'erreur
        res.status(400).send({
            message: "Vous devez spécifier un type de titre valide."
        });
        return;
    }

    // Récupération de tous les titres d'un type
    Titre.getTitres(type_titre)
        .then((titres) => {
            // Calcul de la pagination
            const page = (pageAffichee - 1) * 10;
            const url_page_suivante = `http://localhost:3000/api/titres/${req.params.type_titre}?page=${pageAffichee + 1}`;
            // Vérification de l'existence du pokémon
            if (!titres[0]) {
                // Envoi d'un message d'erreur
                res.status(404).send({
                    message: `Le type ${req.params.type_titre} n'existe pas.`
                });
                return;
            }
            const contenuPage = titres.slice(page, page + 10);
            // Création de l'objet à envoyer
            const resultat = {
                titres: contenuPage,
                filtre: req.params.type_titre,
                page: pageAffichee,
                url_page_suivante: titres.length > page + 10 ? url_page_suivante : null
            }
            // Envoi du pokémon
            res.send(resultat);
        })
        .catch((erreur) => {
            // En cas d'erreur
            console.log('Erreur: ', erreur);
            // Envoi d'un message d'erreur
            res.status(500).send({
                message: "Erreur lors de la récupération des titres avec le type " + req.params.type_titre
            });
        });
};
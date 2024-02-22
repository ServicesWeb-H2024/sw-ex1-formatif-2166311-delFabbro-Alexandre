// Initialisation du routeur et du contrôleur
const express = require('express');
const router = express.Router();
const titresController = require('../controllers/titres.controller.js');

/**
 * Routes pour les titres de netflix
 * 
 * GET /api/titres/[:type_titre] - Affiche la liste des titres selon le type
 * 
 * @author Alexandre del Fabbro <alexandre.delfabbro@gmail.com>
 * Inspiré du code vu durant le cours de Services Web - Cégep de Victoriaville - Hiver 2024
 */
router.get(['/:type_titre', '/'], (req, res) => {
    titresController.getTitres(req, res);
});

module.exports = router;
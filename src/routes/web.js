const express = require('express');
const router = express.Router();

const initWebRoutes = (app) => {
    // Home
    router.get('/', (req, res) => {
        return res.render('home.ejs');
    });

    return app.use('/', router);
};

module.exports = initWebRoutes;
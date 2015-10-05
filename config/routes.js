var express = require('express');

module.exports = function(app, router) {

    var router = express.Router();
    require('../routes/oauth')(app, router);
    require('../routes/users')(app, router);
    app.use(router);
};
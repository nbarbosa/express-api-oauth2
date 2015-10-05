var app = require('./app');
var models = require('./models/oauth');

models.OAuthClientsModel.create({
	clientId: process.env.APP_CLIENT_ID,
	clientSecret: process.env.APP_CLIENT_SECRET
}, function() {
	process.exit();
});
var utility = require('../utility');
var UserController = require('./UserController');
var InterestController = require('./InterestController');
var PostController = require('./PostController');

exports.registerRoutes = function(app, connection) {
	UserController.registerRoutes(app, connection);
	InterestController.registerRoutes(app, connection);
	PostController.registerRoutes(app, connection);

	app.get('/', utility.notAuthenticatedEndpoint, staticRenderHandler('index', {}));
	app.get('/login', utility.notAuthenticatedEndpoint, staticRenderHandler('login', {}));
	app.get('/signup', utility.notAuthenticatedEndpoint, staticRenderHandler('signup', {}));
	app.get('/logout', function(req, res) {
		req.logout();
  		res.redirect('/');
	})
}

var staticRenderHandler = function(path, data) {
	return function (req, res) {
		res.render(path, data);
	}
}
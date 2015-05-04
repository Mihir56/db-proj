// connection: mysql connection
// controllerHandler: function(connection, req, res);
exports.handlerGenerator = function(connection, controllerHandler) {
	return function(req, res) {
		controllerHandler(connection, req, res);
	}
}

// Detect Authentication Status
exports.authenticatedEndpoint = function(req, res, next) {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.redirect('/');
	}
}

exports.notAuthenticatedEndpoint = function(req, res, next) {
	if (req.isAuthenticated()) {
		res.redirect('/home');
	} else {
		next();
	}
}

exports.databaseResultHandler = function (res) {
	return function(err, rows, fields) {
		if (err) {
			res.send(err);
			//throw err;
		} else {
			res.send(rows);
		}
	}
}

// Detect Authentication Status
exports.authenticatedEndpointWithType = function(userType) {
	return function(req, res, next) {
		if (req.isAuthenticated() && req.user.type === userType) {
			next();
		} else {
			res.render('message', {
				'user': req.user,
				'message': 'You do not have permission to do this operation.'
			});
		}
	}
}

exports.notImplementedRoute = function(connection, req, res) {
	res.send('NOT IMPLEMENTED');
}
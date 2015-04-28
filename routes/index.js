var mysql = require('mysql');
var CONSTANTS = require('../constants').constants;
var Users = require('../models/Users').obj;
var Posts = require('../models/Posts').obj;
var Comments = require('../models/Comments').obj;
var Interests = require('../models/Interests').obj;
var InterestedIn = require('../models/InterestedIn').obj;

/** MySQL Connect */

var connection = mysql.createConnection({
	host: CONSTANTS.host,
	user: CONSTANTS.user,
	password: CONSTANTS.password,
	database: CONSTANTS.database
});
connection.connect();

/** Initialize Database */

createDatabase(connection);
Users.init(connection);
Posts.init(connection);
Comments.init(connection);
Interests.init(connection);
InterestedIn.init(connection);

/** Routes */

exports.registerRoutes = function(app) {
	app.get('/', function(req, res) {
		res.render('index');
	});
	app.get('/test', test);
	
	app.get('/user/create', createUser);
	app.get('/user/delete', deleteUser);
	app.get('/users/validate', checkValidUser);
	app.get('/user/addInterest', userAddInterest);
	app.get('/user/removeInterest', userRemoveInterest);
	app.get('/user/interests', interestsForUser);
	app.get('/user/all', allUsers);
	
	app.get('/post/create', createPost);
	app.get('/post/delete', deletePost);
	app.get('/post/all', allPosts);
	app.get('/post/details', postDetails);
	app.get('/post/forInterest', postsForInterest)

	app.get('/comment/create', createComment);
	app.get('/comment/all', allCommentsForPostID);

	app.get('/interest/create', createInterest);
	app.get('/interest/all', allInterests);
};

/** - Test */

function helloWorld(req, res){
	res.send('hello world');
}

function test(req, res) {
	Thing.all(connection, function(err, objs){
		res.send(objs);
	});
}

/** - User */

function createUser(req, res) {
	var username = req.query.username;
	var password = req.query.password;
	Users.registerUser(connection, {
		'username': username,
		'password': password,
		'isModerator': false,
	}, databaseResultHandler(res))
}

function checkValidUser(req, res) {
	var username = req.query.username;
	var password = req.query.password;
	Users.checkValidUser(
		connection, 
		username, 
		password, 
		databaseResultHandler(res))
}

function allUsers(req, res) {
	Users.all(connection, databaseResultHandler(res));
};

function deleteUser(req, res) {
	var username = req.query.username;
	Users.delete(connection, username, databaseResultHandler(res))
}

/** - Post */

function createPost(req, res) {
	var username = req.query.username;
	var interestname = req.query.interestname;
	var body = req.query.body;
	var title = req.query.title;

	Posts.createNew(connection, {
		'username': username,
		'interestname': interestname,
		'body': body,
		'title': title,
	}, databaseResultHandler(res));
}

function allPosts(req, res) {
	Posts.all(connection, databaseResultHandler(res));
}

function postDetails(req, res) {
	var postID = req.query.postid;
	Posts.details(connection, postID, databaseResultHandler(res));
}

function postsForInterest(req, res) {
	var interestname = req.query.interestname;
	Posts.allForInterest(connection, interestname, databaseResultHandler(res));
}

function deletePost(req, res) {
	var postID = req.query.postid;
	Posts.delete(connection, postID, databaseResultHandler(res));
}

/** - Comment */

function createComment(req, res) {
	var username = req.query.username;
	var postid = req.query.postid;
	var body = req.query.body;

	Comments.insert(connection, {
		'username': username,
		'postid': postid,
		'body': body
	}, databaseResultHandler(res));
}

function allCommentsForPostID(req, res) {
	var postid = req.query.postid;
	Comments.allForPost(connection, postid, databaseResultHandler(res));
}

/** - Interest */

function createInterest(req, res) {
	var interestname = req.query.interestname;
	var description = req.query.description;

	Interests.insert(connection, {
		'interestname': interestname,
		'description': description,
	}, databaseResultHandler(res));
}

function allInterests(req, res) {
	Interests.all(connection, databaseResultHandler(res));
}

/** - InterestedIn */

function userAddInterest(req, res) {
	var username = req.query.username;
	var interestname = req.query.interestname;

	InterestedIn.insert(connection, {
		'username' : username,
		'interestname' : interestname
	}, databaseResultHandler(res));
}

function userRemoveInterest(req, res) {
	var username = req.query.username;
	var interestname = req.query.interestname;

	InterestedIn.delete(connection, {
		'username' : username,
		'interestname' : interestname
	}, databaseResultHandler(res));
}

function interestsForUser(req, res) {
	var username = req.query.username;
	InterestedIn.allForUser(connection, username, databaseResultHandler(res));
}

/** Util */

function createDatabase(connection) {
	connection.query('CREATE DATABASE IF NOT EXISTS test', function (err, rows, fields) {
		if (err) throw err;
		console.log('created database \'test\'');
	});	
}

function databaseResultHandler(res) {
	return function(err, rows, fields) {
		if (err) {
			res.send(err);
			//throw err;
		} else {
			res.send(rows);
		}
	}
}
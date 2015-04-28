var multiline = require('multiline').stripIndent;

var SQL_CREATE_TABLE = multiline(function(){/*
	Create TABLE IF NOT EXISTS Posts(
		postid INT NOT NULL AUTO_INCREMENT,
		username CHAR(100) NOT NULL,
		interestname CHAR(100) NOT NULL, 
		body VARCHAR(1024) NOT NULL,
		title CHAR(100) NOT NULL,
		PRIMARY KEY (postid),
		FOREIGN KEY (username) REFERENCES Users (username),
		FOREIGN KEY (interestname) REFERENCES Interests (interestname)
	);
*/});

var SQL_CREATE_POST = multiline(function(){/*
	INSERT INTO Posts SET ?;
*/});

var SQL_SELECT_ALL_POSTS = multiline(function(){/*
	SELECT P.username, P.title, P.postid, P.interestname
	FROM Posts as P
	ORDER BY P.postid DESC;
*/});

var SQL_DETAILS_FOR_POST_ID = multiline(function(){/*
	SELECT P.username, P.title, P.postid, P.interestname, P.body
	FROM Posts as P
	WHERE P.postid = ?;
*/});

var SQL_ALL_POSTS_FOR_INTEREST = multiline(function(){/*
	SELECT P.username, P.title, P.postid, P.interestname
	FROM Posts as P
	WHERE P.interestname = ?
	ORDER BY P.postid DESC;
*/});

var SQL_DELETE_POST_ID = multiline(function(){/*
	DELETE FROM Posts 
	WHERE postid = ?;
*/});

var Posts = {};

/**
 Creates necessary table, given valid mysql connection
 */
Posts.init = function(connection, success) {
	connection.query(SQL_CREATE_TABLE, success);
}

/**
 obj = {
	username, 
	interestname, 
	body, 
	title
 }
 */
Posts.createNew = function(connection, obj, success) {
	connection.query(SQL_CREATE_POST, obj, success);
}

Posts.all = function(connection, success) {
	connection.query(SQL_SELECT_ALL_POSTS, success);
}

Posts.allForInterest = function(connection, interestname, success) {
	connection.query(SQL_ALL_POSTS_FOR_INTEREST, [interestname], success);
}

Posts.details = function(connection, id, success) {
	connection.query(SQL_DETAILS_FOR_POST_ID, [id], success);
}

// TODO(vivek): on delete handlers
Posts.delete = function(connection, id, success) {
	connection.query(SQL_DELETE_POST_ID, [id], success);
}

exports.obj = Posts;
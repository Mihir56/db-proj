var multiline = require('multiline').stripIndent;
var mysql = require('mysql');

var SQL_CREATE_TABLE = multiline(function(){/*
	CREATE TABLE IF NOT EXISTS Users(
		username CHAR(100) NOT NULL, 
		password CHAR(255) NOT NULL,
		isModerator BOOLEAN NOT NULL, 
		PRIMARY KEY (username)
	);
*/});

var SQL_REGISTER_USER = multiline(function(){/*
	INSERT INTO Users SET ?;
*/});


var SQL_CHECK_VALID_USER = multiline(function(){/*
	SELECT U.username 
	FROM Users U
	Where 
		U.username = ?
		AND
  		U.password = ? ;
*/});

var SQL_ALL_USERS = multiline(function(){/*
	SELECT U.username 
	FROM Users U;
*/});

// TODO(vivek): add on delete things, to automatically remove unneeded rows
var SQL_DELETE_USER = multiline(function(){/*
	DELETE FROM Users
	WHERE username = ? ;
*/});

var Users = {};

/**
 Creates necessary table, given valid mysql connection
 */
Users.init = function(connection, success) {
	connection.query(SQL_CREATE_TABLE, success);
}

/**
 obj = {
	isModerator
	username
	password
 }
 */
Users.registerUser = function(connection, obj, success) {
	connection.query(SQL_REGISTER_USER, obj, success);
}

/**
 row argument of success will contain a single row with the name of the user is found
 */
Users.checkValidUser = function(connection, username, password, success) {
	connection.query(SQL_CHECK_VALID_USER, [username, password], success);
}

/**
 special moderator only endpoint that shows a full list of all users for easy deletion.
 */
Users.all = function(connection, success) {
	connection.query(SQL_ALL_USERS, success);
}

/**
 special moderator only endpoint that deletes a user
 */
Users.delete = function(connection, username, success) {
	console.log('fdasd');

	var x = mysql.format(SQL_DELETE_USER, [username]);
	console.log(x);

	connection.query(SQL_DELETE_USER, [username], success);
}

exports.obj = Users;
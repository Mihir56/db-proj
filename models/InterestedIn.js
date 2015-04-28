var multiline = require('multiline').stripIndent;

var SQL_CREATE_TABLE = multiline(function(){/*
	CREATE TABLE IF NOT EXISTS InterestedIn (
		username CHAR(100) NOT NULL,
		interestname CHAR(100) NOT NULL,
		PRIMARY KEY (interestname, username),
		FOREIGN KEY (username) REFERENCES Users (username),
		FOREIGN KEY (interestname) REFERENCES Interests (interestname)
	)
*/});

var SQL_INSERT_INTERESTED_IN = multiline(function(){/*
	INSERT INTO InterestedIn SET ?;
*/});

var SQL_DELETE_INTERESTED_IN = multiline(function(){/*
	DELETE FROM InterestedIn WHERE `username` = ? AND `interestname` = ?;
*/});

var SQL_ALL_INTERESTED_IN_FOR_USER = multiline(function(){/*
	SELECT I.interestname, I.username
	FROM InterestedIn as I
	WHERE I.username = ?
	ORDER BY I.interestname ASC;
*/});


var InterestedIn = {};

/**
 Creates necessary table, given valid mysql connection
 */
InterestedIn.init = function(connection, success) {
	connection.query(SQL_CREATE_TABLE, success);
}

/**
 obj = {
	interestname, 
	username
 }
 */
InterestedIn.insert = function(connection, obj, success) {
	connection.query(SQL_INSERT_INTERESTED_IN, obj, success);
}

/**
 obj = {
	interestname, 
	username
 }
 */
InterestedIn.delete = function(connection, obj, success) {
	connection.query(SQL_DELETE_INTERESTED_IN, [obj.username, obj.interestname], success);
}

InterestedIn.allForUser = function(connection, username, success) {
	connection.query(SQL_ALL_INTERESTED_IN_FOR_USER, [username], success);
}

exports.obj = InterestedIn;
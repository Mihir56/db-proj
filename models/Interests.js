var multiline = require('multiline').stripIndent;

var SQL_CREATE_TABLE = multiline(function(){/*
	CREATE TABLE IF NOT EXISTS Interests(  
		interestname CHAR(100) NOT NULL,
		description VARCHAR(1024) NOT NULL,
		PRIMARY KEY (interestname)
	) 
*/});

var SQL_INSERT_INTEREST = multiline(function(){/*
	INSERT INTO Interests SET ?;
*/});

var SQL_ALL_INTERESTS = multiline(function(){/*
	SELECT I.interestname, I.description
	FROM Interests as I
	ORDER BY I.interestname ASC;
*/});

var Interests = {};

/**
 Creates necessary table, given valid mysql connection
 */
Interests.init = function(connection, success) {
	connection.query(SQL_CREATE_TABLE, success);
}

/**
 obj = {
	interestname, 
	description
 }
 */
Interests.insert = function(connection, obj, success) {
	connection.query(SQL_INSERT_INTEREST, obj, success);
}

Interests.all = function(connection, success) {
	connection.query(SQL_ALL_INTERESTS, success);
}

exports.obj = Interests;
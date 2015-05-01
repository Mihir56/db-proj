var multiline = require('multiline').stripIndent;

var SQL_CREATE_TABLE = multiline(function(){/*
	CREATE TABLE IF NOT EXISTS Interests(  
		interestname CHAR(100) NOT NULL,
		description VARCHAR(1024) NOT NULL,
		PRIMARY KEY (interestname)
	);
*/});

var SQL_INSERT_INTEREST = multiline(function(){/*
	INSERT INTO Interests SET ?;
*/});

var SQL_ALL_INTERESTS = multiline(function(){/*
	SELECT I.interestname
	FROM Interests as I
	ORDER BY I.interestname ASC;
*/});

var SQL_SELECT_INTEREST_DETAILS = multiline(function(){/*
	SELECT I.interestname, I.description
	FROM Interests as I
	WHERE I.interestname = ?;
*/});

var SQL_DELETE_INTERESTNAME = multiline(function(){/*
	DELETE FROM Interests 
	WHERE interestname = ?;
*/});

/**
 Creates necessary table, given valid mysql connection
 */
exports.init = function(connection, success) {
	connection.query(SQL_CREATE_TABLE, success);
}

/**
 obj = {
	interestname, 
	description
 }
 */
exports.insert = function(connection, obj, success) {
	connection.query(SQL_INSERT_INTEREST, obj, success);
}

exports.all = function(connection, success) {
	connection.query(SQL_ALL_INTERESTS, success);
}

exports.details = function(connection, interestname, success) {
	connection.query(SQL_SELECT_INTEREST_DETAILS, [interestname], success);
}

exports.delete = function(connection, interestname, success) {
	connection.query(SQL_DELETE_INTERESTNAME, [interestname], success);	
}
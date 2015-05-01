var multiline = require('multiline').stripIndent;

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
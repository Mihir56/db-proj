var multiline = require('multiline').stripIndent;

var SQL_INSERT_INTERESTED_IN = multiline(function(){/*
	INSERT INTO InterestedIn SET ?;
*/});

var SQL_DELETE_INTERESTED_IN = multiline(function(){/*
	DELETE FROM InterestedIn WHERE `username` = ? AND `interestname` = ?;
*/});

var SQL_ALL_INTERESTED_IN_FOR_USER = multiline(function(){/*
	SELECT I.interestname
	FROM InterestedIn as I
	WHERE I.username = ?
	ORDER BY I.interestname ASC;
*/});


var SQL_CHECK_FOLLOWING = multiline(function(){/*
	SELECT I.interestname
	FROM InterestedIn as I
	Where I.username = ? AND I.interestname = ?;
*/})


/**
 obj = {
	interestname, 
	username
 }
 */
exports.insert = function(connection, obj, success) {
	connection.query(SQL_INSERT_INTERESTED_IN, obj, success);
}

/**
 obj = {
	interestname, 
	username
 }
 */
exports.delete = function(connection, obj, success) {
	connection.query(SQL_DELETE_INTERESTED_IN, [obj.username, obj.interestname], success);
}

exports.allForUser = function(connection, username, success) {
	connection.query(SQL_ALL_INTERESTED_IN_FOR_USER, [username], success);
}

/** 
 If > 0 rows, then following.
 */
exports.checkFollowing = function(connection, username, interestname, success) {
	connection.query(SQL_CHECK_FOLLOWING, [username, interestname], success);
}
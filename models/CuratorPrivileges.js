var multiline = require('multiline').stripIndent;

var SQL_INSERT_CURATOR_PRIVILEGE = multiline(function(){/*
	INSERT INTO CuratorPrivilege SET ?;
*/});

var SQL_DELETE_CURATOR_PRIVILEGE = multiline(function(){/*
	DELETE FROM CuratorPrivilege WHERE `username` = ? AND `interestname` = ?;
*/});

var SQL_ALL_CURATOR_PRIVILEGE_FOR_USER = multiline(function(){/*
	SELECT CP.interestname
	FROM CuratorPrivilege as CP
	WHERE CP.username = ?
	ORDER BY CP.interestname ASC;
*/});


var SQL_CHECK_CURATOR_PRIVILEGE = multiline(function(){/*
	SELECT CP.interestname
	FROM CuratorPrivilege as CP
	Where CP.username = ? AND CP.interestname = ?;
*/})


/**
 obj = {
	interestname, 
	username
 }
 */
exports.insert = function(connection, obj, success) {
	connection.query(SQL_INSERT_CURATOR_PRIVILEGE, obj, success);
}

/**
 obj = {
	interestname, 
	username
 }
 */
exports.delete = function(connection, obj, success) {
	connection.query(SQL_DELETE_CURATOR_PRIVILEGE, [obj.username, obj.interestname], success);
}

exports.allForUser = function(connection, username, success) {
	connection.query(SQL_ALL_CURATOR_PRIVILEGE_FOR_USER, [username], success);
}

/** 
 If > 0 rows, then following.
 */
exports.checkPrivilege = function(connection, username, interestname, success) {
	connection.query(SQL_CHECK_CURATOR_PRIVILEGE, [username, interestname], success);
}
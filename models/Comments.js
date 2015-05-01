var multiline = require('multiline').stripIndent;

var SQL_CREATE_TABLE = multiline(function(){/*
	CREATE TABLE IF NOT EXISTS Comments(
		commentid INT NOT NULL AUTO_INCREMENT,
		postid INT NOT NULL,
		username CHAR(100) NOT NULL,
		body VARCHAR(1024) NOT NULL,
		PRIMARY KEY (commentid), 
		FOREIGN KEY (postid) REFERENCES Posts (postid),
		FOREIGN KEY (username) REFERENCES Users (username)
	)
*/});

var SQL_INSERT_COMMENT = multiline(function(){/*
	INSERT INTO Comments SET ? ;
*/});

var SQL_ALL_COMMENTS_FOR_POST = multiline(function(){/*
	SELECT C.postid, C.commentid, C.username, C.body
	FROM Comments as C
	WHERE C.postid = ?
	ORDER BY C.commentid ASC;
*/});

var SQL_DELETE_COMMENT_ID = multiline(function(){/*
	DELETE FROM Comments 
	WHERE commentid = ?;
*/});

/**
 Creates necessary table, given valid mysql connection
 */
exports.init = function(connection, success) {
	connection.query(SQL_CREATE_TABLE, success);
}

/**
 obj = {
	username, 
	body, 
	postid
 }
 */
exports.insert = function(connection, obj, success) {
	connection.query(SQL_INSERT_COMMENT, obj, success);
}

/**
 success contains an array of Things objects.
 */
exports.allForPost = function(connection, postID, success) {
	connection.query(SQL_ALL_COMMENTS_FOR_POST, [postID], success);
}

exports.delete = function(connection, commentid, success) {
	connection.query(SQL_DELETE_COMMENT_ID, [commentid], success);
}
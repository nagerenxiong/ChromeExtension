var mysql = require('mysql');
var iconv = require('iconv-lite');
var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '123456',
	database: 'shangzheng',
	port: 3306
});

function insert(sql) {
	var buf = new Buffer(sql,'binary');
     var str = iconv.decode(buf,'utf-8');
	pool.getConnection(function(err, conn) {
		if (err) console.log("POOL ==> " + err);

		conn.query(sql, function(err, rows) {
			if (err) console.log(err);
			console.log("SELECT ==> ");
			for (var i in rows) {
				console.log(rows[i]);
			}
			conn.release();
		});
	});
}


function query(sql,callback) {
	pool.query(sql, function(err, rows, fields) {
	  if (err) throw err;

	  callback(rows); //res返回数据
	});
}


function update(sql, arr, callback) {
	pool.query(sql, arr, function(err, result) {
		if (err) throw err;
		pool.commit(function(err) {
			if (err) {
				pool.rollback(function() {
					throw err;
				});
			}
			callback(err, result); //res返回数据
		});
	});
}


function deleteB(sql, param, callback) {
	pool.query(sql, param, function(err, result) {
		if (err) throw err;
		pool.commit(function(err) {
			if (err) {
				pool.rollback(function() {
					throw err;
				});
			}
			//result.affectedRows
			callback(err, result); //res返回数据
		});
	});
}

exports.query = query;
exports.insert = insert;
exports.update = update;
exports.delete = deleteB;
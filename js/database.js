const DBname = "calculateDB";
const DBversion = "1,0;"
const DBdisname = "userDB";
const DBsize = 4000000;

function transactionDB(query) {
	var db = window.openDatabase(DBname, DBversion, DBdisname, DBsize);
	db.transaction(query, errorDB);
}

function CreatQuery(tx) {
	tx.executeSql('CREATE TABLE IF NOT EXISTS slist (id INTEGER PRIMARY KEY AUTOINCREMENT,newinstall varchar, highestscore Integer, fblogin varchar)', [], function(tx, results) {
		tx.executeSql('INSERT INTO slist (id,newinstall,highestscore,fblogin) SELECT "1", "YES", "0", "NULL" WHERE NOT EXISTS (SELECT id FROM slist WHERE id = "1") ', [], function(tx2, results) {
		});
	}, errorDB);
}

function errorDB(err) {
	alert("Error processing SQL: " + err.message);
}

function successDB() {
}
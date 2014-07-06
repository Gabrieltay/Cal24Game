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

function UpdateHighest(score) {
	var db = window.openDatabase(DBname, DBversion, DBdisname, DBsize);
	db.transaction(function(tx) {
		tx.executeSql('SELECT highestscore FROM slist WHERE id="1"', [], function(tx, results) {
			if (results.rows.item(0).highestscore < score) {
				tx.executeSql('UPDATE slist SET highestscore="' + score + '" WHERE id="1"');
			}
		});
	});
}

function GetHighestScore() {
	var db = window.openDatabase(DBname, DBversion, DBdisname, DBsize);
	db.transaction(function(tx) {
		tx.executeSql('SELECT highestscore FROM slist WHERE id="1"', [], function(tx, results) {
			$('#highestscore').text("Your Highest Score: " + results.rows.item(0).highestscore);
		});
	});
}

function errorDB(err) {
	alert("Error processing SQL: " + err.message);
}

function successDB() {
}
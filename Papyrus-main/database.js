const Database = require("arangojs").Database;
const db = new Database("http://root:@127.0.0.1:8529");
db.useDatabase("papyrus");

module.exports = db;

var dbm = require("db-migrate");
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable("stops", {
    id: { type: "int", primaryKey: true },
    display_name: "string",
    latitude: "decimal",
    longitude: "decimal"
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable("stops", callback);
};

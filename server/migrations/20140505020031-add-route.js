var dbm = require("db-migrate");
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable("routes", {
    id: { type: "int", primaryKey: true },
    display_name: "string",
    bg_color: "string",
    fg_color: "string"
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable("routes", callback);
};

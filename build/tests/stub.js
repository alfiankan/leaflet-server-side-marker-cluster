"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPgPool = void 0;
var Postgres_1 = require("../api/infrastructure/Postgres");
require("dotenv/config");
function createPgPool() {
    var host = String(process.env.PG_HOST);
    var username = String(process.env.PG_USERNAME);
    var password = String(process.env.PG_PASSWORD);
    var database = String(process.env.PG_DATABASE);
    var port = Number(process.env.PG_PORT);
    var db = new Postgres_1.Postgress(host, username, password, database, port);
    return db.getPool();
}
exports.createPgPool = createPgPool;

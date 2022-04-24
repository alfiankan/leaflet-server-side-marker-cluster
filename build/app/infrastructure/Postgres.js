"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Postgress = void 0;
var pg_1 = require("pg");
var Postgress = /** @class */ (function () {
    function Postgress(host, username, password, database, port) {
        this.host = host;
        this.username = username;
        this.password = password;
        this.database = database;
        this.port = port;
    }
    Postgress.prototype.getPool = function () {
        return new pg_1.Pool({
            user: this.username,
            host: this.host,
            database: this.database,
            password: this.password,
            port: this.port,
        });
    };
    return Postgress;
}());
exports.Postgress = Postgress;

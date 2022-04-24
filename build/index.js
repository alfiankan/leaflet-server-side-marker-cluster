"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
require("dotenv/config");
var Postgres_1 = require("./api/infrastructure/Postgres");
var Locations_1 = require("./api/repositories/Locations");
var LocationCluster_1 = require("./api/usecases/LocationCluster");
function startApi() {
    var app = express();
    var host = String(process.env.PG_HOST);
    var username = String(process.env.PG_USERNAME);
    var password = String(process.env.PG_PASSWORD);
    var database = String(process.env.PG_DATABASE);
    var port = Number(process.env.PG_PORT);
    var db = new Postgres_1.Postgress(host, username, password, database, port);
    var locationRepository = new Locations_1.Locations(db.getPool());
    var locationClusterUseCase = new LocationCluster_1.LocationCluster(locationRepository);
    app.get('/points', function (req, res) {
        var west = Number(req.query.west);
        var south = Number(req.query.south);
        var east = Number(req.query.east);
        var north = Number(req.query.north);
        var zoom = Number(req.query.zoom);
        console.log(west, south, east, north, zoom);
        locationClusterUseCase.getClusteredPoint(west, south, east, north, zoom).then(function (result) {
            res.json(result);
        }).catch(function (error) {
            res.json(error);
        });
    });
    app.use(express.static('public'));
    app.listen(3000, function () {
        console.log('server running');
    });
}
startApi();

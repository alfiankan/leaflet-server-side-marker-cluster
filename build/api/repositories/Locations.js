"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Locations = void 0;
var Locations = /** @class */ (function () {
    function Locations(pool) {
        this.db = pool;
    }
    Locations.prototype.getPointsInsideBoundingBox = function (west, south, east, north) {
        return this.db.query({
            text: "SELECT id, ST_Y(location) AS y, ST_X(location) as x FROM marker_cluster u WHERE location && ST_MakeEnvelope($1, $2, $3, $4, 4326)",
            values: [west, south, east, north]
        });
    };
    return Locations;
}());
exports.Locations = Locations;

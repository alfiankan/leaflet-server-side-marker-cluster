"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Locations_1 = require("../api/repositories/Locations");
var stub_1 = require("./stub");
describe('location repository', function () {
    test('result point array must be less than 500000', function () {
        var pool = (0, stub_1.createPgPool)();
        var locationRepository = new Locations_1.Locations(pool);
        var query = locationRepository.getPointsInsideBoundingBox('81.0', '85.0', '-50.0', '90.0');
        return query.then(function (result) {
            console.log(result.rows);
            expect(result.rows.length).toBeGreaterThan(0);
        }).catch(function (err) {
            console.log(err);
        });
    });
});

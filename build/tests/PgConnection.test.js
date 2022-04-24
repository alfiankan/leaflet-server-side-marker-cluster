"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var stub_1 = require("./stub");
describe('Databae connection', function () {
    test('pg create connection and get marker_cluster count must be return more than 1', function () {
        var pool = (0, stub_1.createPgPool)();
        return pool.query("SELECT count(id) FROM public.marker_cluster LIMIT 1").then(function (result) {
            expect(Number(result.rows[0].count)).toBeGreaterThan(0);
        });
    });
});

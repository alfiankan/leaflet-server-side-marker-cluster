import { DatabaseError, Pool, QueryResult } from "pg";
import { Point } from "../entities/Point";

class Locations {
    private db: Pool
    constructor(pool: Pool) {
        this.db = pool
    }

    getPointsInsideBoundingBox(west: string, south: string, east: string, north: string): Promise<QueryResult<any>> {
        return this.db.query(
            "SELECT ST_Y(location) AS y, ST_X(location) as x FROM marker_cluster u WHERE location && ST_MakeEnvelope($1, $2, $3, $4, $5)", 
            [west, south, east, north],
        )
    }
}

export {Locations}
import { createPgPool } from "./stub"

describe('Databae connection', () => {
    test('pg create connection and get marker_cluster count must be return more than 1', () => {
        const pool = createPgPool()

        return pool.query("SELECT count(id) FROM public.marker_cluster LIMIT 1").then(result => {
            expect(Number(result.rows[0].count)).toBeGreaterThan(0)
        })

    })
})
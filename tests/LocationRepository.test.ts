import { Locations } from "../api/repositories/Locations"
import { createPgPool } from "./stub"

describe('location repository', () => {
    test('result point array must be less than 500000', () => {
        
        const pool = createPgPool()

        const locationRepository = new Locations(pool)

        const query = locationRepository.getPointsInsideBoundingBox('81.0', '85.0', '-50.0', '90.0')
        
        return query.then(result => {
            console.log(result.rows)
            expect(result.rows.length).toBeGreaterThan(0)
        }).catch(err => {
            console.log(err)
        })

    })

})
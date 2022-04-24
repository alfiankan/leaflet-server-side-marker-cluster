import { Locations } from '../repositories/Locations'
import Supercluster = require('supercluster')

class LocationCluster {
    private locationRepository: Locations
    constructor(locationsRepository: Locations) {
        this.locationRepository = locationsRepository
    }

    async getClusteredPoint(west: number, south: number, east: number, north: number, zoom: number): Promise<Array<Supercluster.ClusterFeature<any>>> {
        const [locations] = await Promise.all([
            this.locationRepository.getPointsInsideBoundingBox(
                String(west),
                String(south),
                String(east),
                String(north),
            )
        ])

        // converting to .geojson features array
        let geojson = new Array<any>()
        locations.rows.map(point => {
            geojson.push({
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [point.x, point.y]
                },
                "properties": {
                    "name": point.id
                }
            })
        })

        const clustersIndexes = new Supercluster({
            log: true,
            radius: 80,
            maxZoom: 17
        });

        clustersIndexes.load(geojson)


        return clustersIndexes.getClusters([west, south, east, north], zoom)
    }

}

export { LocationCluster }
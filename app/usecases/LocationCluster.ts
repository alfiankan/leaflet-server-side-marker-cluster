import {Locations} from '../repositories/Locations'
class LocationCluster {
    private locationRepository: Locations
    constructor(locationsRepository: Locations) {
        this.locationRepository = locationsRepository
    }

    async getClusteredPoint(west: number, south: number, east: number, north: number, zoom: number) {
        const [locations] = await Promise.all([
            this.locationRepository.getPointsInsideBoundingBox(
                String(west),
                String(south),
                String(east),
                String(north),
            )
        ])

        return locations
    }
    
}

export {LocationCluster}
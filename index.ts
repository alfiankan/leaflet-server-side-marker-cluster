import { Express, Request, Response } from 'express'
import express = require("express")
import 'dotenv/config'
import { Postgress } from './api/infrastructure/Postgres'
import { Locations } from './api/repositories/Locations'
import { LocationCluster } from './api/usecases/LocationCluster'

function startApi() {

    const app: Express = express();

    const host = String(process.env.PG_HOST)
    const username = String(process.env.PG_USERNAME)
    const password = String(process.env.PG_PASSWORD)
    const database = String(process.env.PG_DATABASE)
    const port = Number(process.env.PG_PORT)
    const db = new Postgress(host, username, password, database, port)

    const locationRepository = new Locations(db.getPool())
    const locationClusterUseCase = new LocationCluster(locationRepository)

    app.get('/points', (req: Request, res: Response) => {
        const west = Number(req.query.west)
        const south = Number(req.query.south)
        const east = Number(req.query.east)
        const north = Number(req.query.north)
        const zoom = Number(req.query.zoom)
        console.log(west, south, east, north, zoom)

        locationClusterUseCase.getClusteredPoint(west, south, east, north, zoom).then(result => {
            res.json(result)
        }).catch(error => {
            res.json(error)
        })

    })

    app.use(express.static('public'))

    app.listen(3000, () => {
        console.log('server running')
    })

}

startApi()
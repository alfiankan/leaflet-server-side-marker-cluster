import { Pool } from "pg";
import { Postgress } from "../api/infrastructure/Postgres";
import 'dotenv/config'

function createPgPool(): Pool {
    const host = String(process.env.PG_HOST)
    const username = String(process.env.PG_USERNAME)
    const password = String(process.env.PG_PASSWORD)
    const database = String(process.env.PG_DATABASE)
    const port = Number(process.env.PG_PORT)
    const db = new Postgress(host, username, password, database, port)
    return db.getPool()
}

export {createPgPool}
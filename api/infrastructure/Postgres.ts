import {Pool} from 'pg'

class Postgress {
    private host: string
    private username: string
    private password: string
    private database: string
    private port: number
    constructor(host: string, username: string, password: string, database: string, port: number) {
        this.host = host
        this.username = username
        this.password = password
        this.database = database
        this.port = port
    }

    getPool(): Pool {
        return new Pool({
            user: this.username,
            host: this.host,
            database: this.database,
            password: this.password,
            port: this.port,
        })
    }
}

export {Postgress}
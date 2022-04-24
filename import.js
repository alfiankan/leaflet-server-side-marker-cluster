const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'petaku',
    port: 5432,
})

const fs = require('fs');

const bigFile = fs.readFileSync('./1_million_location.txt', 'utf8')

const rows = bigFile.split('\n')

// clean up
pool.query(`DELETE FROM public.marker_cluster;`, (error, results) => {
    if (error) {
        throw error
    }
})

let total = 0
rows.map(coordinate => {
    const coor = coordinate.replace('\r', '').split(',')
    pool.query(`INSERT INTO public.marker_cluster(location) VALUES (ST_GeomFromText('Point(${coor[1]} ${coor[0]})'));`, (error, results) => {
        if (error) {
            throw error
        }
        if (total % 1000 == 0) {
            console.log(total)
        }

        total++
    })

})








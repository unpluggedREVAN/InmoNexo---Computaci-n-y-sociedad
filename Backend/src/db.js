import pg from 'pg'

export const pool = new pg.Pool({
    user : "postgres",
    host : "localhost",
    password : "Kzds1234",
    database : "inmonexodb",
    port : "5432"
})
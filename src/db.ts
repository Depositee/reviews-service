import {Pool} from 'pg';

// const pool = new Pool({
//    user: process.env.DB_USER,
//    host: process.env.DB_HOST,
//    database: process.env.DB_NAME,
//    password: process.env.DB_PASSWORD,
//    port: Number(process.env.DB_PORT)
// });

const pool = new Pool({
   user: 'postgres',
   host: 'localhost',
   database: 'reviews',
   password: 'pywt',
   port: 5432
});

export default pool;

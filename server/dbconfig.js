import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

//MSSQL config
export const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    server: 'localhost',
    pool: {
      max: 10,
      min: 5,
      idleTimeoutMillis: 30000
    },
    options: {
      encrypt: true, // for azure
      trustServerCertificate: true // change to true for local dev / self-signed certs
    }
  } 

export const poolPromise = new sql.ConnectionPool(config)
.connect()
.then(pool => {
  console.log('Connected to MSSQL')
  return pool
})
.catch(err => console.log('Database Connection Failed! Bad Config: ', err));

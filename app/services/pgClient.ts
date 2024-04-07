require("dotenv").config();
const { Pool } = require("pg");

const client = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
});

client.connect((err: Error) => {
    if(err) {
        console.error('Erreur lors de la connexion à la base de données.', err);
        return;
    }
    console.log('Connexion à la base de données réussie');
});

module.exports = client;
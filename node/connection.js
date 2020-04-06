const Pool = require('pg').Pool

const pool = new Pool({
    user: 'vhxpzahw',
    host: 'drona.db.elephantsql.com',
    database: 'vhxpzahw',
    password: 'LEITfP-WmTjD8iswr7dI_-K0ep_SNG1j',
    port: 5432,
})

module.exports = pool;
const Pool = require('pg').Pool

const { validationResult } = require('express-validator');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'users',
    password: 'Sano@123',
    port: 5432,
})
const getUsers = (request, response) => {
    pool.query('SELECT id,first_name,last_name,city,mobile FROM users where is_admin = false', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json({
            code: 0,
            data: results.rows
        })
    })
}

const getUserDetails = (request, response) => {
    pool.query('SELECT * FROM users where id =' + request.params.id, (error, results) => {
        if (error) {
            throw error
        }
        for (let i = 0; i < results.rows.length; i++) {
            delete results.rows[i]['password']
        }
        if (results.rows.length > 0) {
            response.status(200).json({
                code: 0,
                data: results.rows[0]
            })
        } else {
            response.status(404).json({
                message: 'User not found'
            })
        }
    })
}

const login = (request, response) => {
    
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(422).send({ errors: errors.array() });
    }
    let query = "SELECT * FROM users where email ='" + request.body.email + "' and password = '" + request.body.password + "'";
    console.log("query "+query)
    pool.query(query, (error, results) => {
        if (error) {
            throw error
        }
        console.log(results.rows)
        if (results.rows.length > 0) {
            delete results.rows[0]['password']
            response.status(200).send({
                code: 0,
                data: results.rows[0],
                message: 'success'
            })
        }
        else {
            response.status(404).send({
                message: 'No user found'
            })
        }

    })
}



module.exports = {
    getUsers,
    getUserDetails,
    login
}
const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express()
const port = 3000;
const db = require('./controller');
const validator = require('./validator');

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.use(cors())

// app.use(express.json());

app.get('/', (request, response) => {
    response.send({ info: 'Node.js, Express, and Postgres API' })
});


app.get('/users', db.getUsers);
app.get('/user/:id', db.getUserDetails);
app.post('/login', validator.validateUser, db.login );



app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
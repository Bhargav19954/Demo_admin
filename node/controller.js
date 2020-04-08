const { validationResult } = require('express-validator');
const users = require('./connection')



const getUsers = (request, response) => {
    users.find({is_admin: false},{password : 0}).lean().exec(function(err,users){
        if(err) throw err;

        response.send({data:users})
    });
}

const getUserDetails = (request, response) => {
    users.findOne({_id : request.params.id},{password : 0},function(err,users){
        if(err) throw err;
        response.send({data:users})
    })
}

const login = (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(422).send({ errors: errors.array() });
    }
    users.findOne({email : request.body.email,password:request.body.password},{password : 0},function(err,users){
        if (err) {
            response.status(401).send({
                message: 'Bad request'
            })
        }
        if (users) {
            response.status(200).send({
                code: 0,
                data: users,
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
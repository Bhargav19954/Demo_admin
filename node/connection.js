var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/users', {useNewUrlParser: true});

let Schema = mongoose.Schema;

var mySchema = new Schema({
    first_name : String
},{strict:false});

const users = mongoose.model('users',mySchema)

module.exports = users;
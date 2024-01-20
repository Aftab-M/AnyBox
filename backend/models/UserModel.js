const mong = require('mongoose')


const userSchema = new mong.Schema({
    name: String, 
    email: String, 
    pass: String, 
    files: [{filename: String, buffer: String}]
})

module.exports = mong.model('User', userSchema)
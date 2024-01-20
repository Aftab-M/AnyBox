// import { createRequire } from 'module'
// const require = createRequire(import.meta.url)
const app = require('express')()
const express = require('express')
const cors = require('cors')
const mong = require('mongoose')
const http = require('http').Server(app)
const User = require('./models/UserModel')


mong.connect("mongodb+srv://useraf:af9999a@cluster0.awk4cby.mongodb.net/anybox?retryWrites=true&w=majority")
app.use(cors({origin:'*', methods:['POST', 'GET'], credentials:true}))
app.use(express.json())


http.listen(3000, function(){
    console.log('Server running...')
})


app.get('/', async(req, res)=> {
    
    const all = await User.find({})
    res.send({msg:'Working just fine...', data:all})
})


app.post('/')







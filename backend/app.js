// import { createRequire } from 'module'
// const require = createRequire(import.meta.url)
const app = require('express')()
const express = require('express')
const cors = require('cors')
const mong = require('mongoose')
const multer = require('multer')
const http = require('http').Server(app)
const User = require('./models/UserModel')
require('./pdfDetails')
app.use('/files', express.static('files'))


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


// const upload = multer({dest:'./files'})


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './files')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now()
      cb(null, uniqueSuffix+file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })



  const PdfSchema = mong.model('PdfSchema')

app.post('/upload-files', upload.single("file"),async (req, res)=>{
    console.log(req.file)
    // res.send('AYO IT WORKED !')
    const title = req.body.title
    const filename = req.file.filename;

    try{
        await PdfSchema.create({title:title, pdf:filename, user:'aftab'})
        res.send({status:'OKAYYY'})
    }
    catch(err){res.json(err)}



})


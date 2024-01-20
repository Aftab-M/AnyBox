const mong = require('mongoose')


const pdfSchema = new mong.Schema({
    pdf: String, 
    title: String, 
    user: String,
    
}, {collection:'pdfs'})

mong.model("PdfSchema", pdfSchema)
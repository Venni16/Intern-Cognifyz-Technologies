import express from 'express'
import { submitController } from './controller.js'

const app = express()

const PORT = 3000


//EJS as view engine
app.set('view engine','ejs')

app.use(express.urlencoded({ extended: true }));

//routes
app.get('/',(req,res)=>{
    res.render('index')
})

app.post('/submit',submitController)



app.listen(PORT,()=>{
    console.log(`Server is Running on http://localhost:${PORT}`)
})
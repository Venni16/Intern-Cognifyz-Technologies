import express from 'express'
import { Home, LoginVal, SignupVal, } from './controller.js'
import session from 'express-session'

const app = express()

const PORT = 3000

app.use(express.static('public'));


//EJS as view engine
app.set('view engine','ejs')

app.use(express.urlencoded({ extended: true }));


app.use(session({
    secret: "Venni1231678844",
    resave:false,
    saveUninitialized:true
}))


//temp in-memmory
export const users = []


//routes
app.get('/',Home)

app.get('/signup',(req,res)=>{
    res.render('signup',{error:null})
})

app.get('/login',(req,res)=>{
    res.render('login',{error:null})
})

app.post('/signup',SignupVal)


app.post('/login',LoginVal)

app.get('/logout' ,(req,res) =>{
    req.session.destroy();
    res.redirect('/login');
})



app.listen(PORT,()=>{
    console.log(`Server is Running on http://localhost:${PORT}`)
})
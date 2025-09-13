import { users } from './app.js';



export const Home = (req,res)=>{
    if (req.session.user){
    res.render('response',{user: req.session.user});
    } else{
        res.redirect('/login');
    }
}


export const SignupVal = (req,res)=>{
    const{ name, email, password }= req.body;

    //ss validation
    if (!name || !email || !password){
        return res.render('signup', { error: "All fields are required!" });
    }

    if (name.length < 3) {
        return res.render('signup', { error: "Name must be at least 3 characters long." });
    }

    

    if (password.length < 6) {
        return res.render('signup', { error: "Password must be at least 6 characters long." });
    }

    const existing = users.find(user => user.email === email);
    if (existing) {
        return res.render('signup', { error: "Email already exists!" });
    }

    users.push({ name, email, password});
    console.log('Current Users:', users);
    res.redirect('/login');
}




export const LoginVal = (req,res)=>{
    const {email, password }=req.body;

    if (!email || !password) {
        return res.render('login', { error: "All fields are required!" });
    }

    const user =users.find(u =>u.email === email && u.password === password);
    if(!user){
        return res.render('login', { error: "Invalid email or password!" });
    }

    req.session.user = user;
    res.redirect('/');
}
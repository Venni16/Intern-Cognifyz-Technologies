export const submitController = (req,res)=>{
    const { name, email} = req.body;
    res.render('response',{name,email});
}
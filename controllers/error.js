exports.get404 = (req,res,next)=>{
    res.render('404',{
        pageTitle:"F O F",
        msg:"This Page is not Exists ."
    })
}
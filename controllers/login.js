module.exports = (req,res) => {
    console.log(req.flash("errors"))
    res.render('login',{
        "errors":req.flash("errors")
    })
}
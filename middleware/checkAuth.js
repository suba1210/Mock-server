const passport = require('passport');
const Member = require('../Models/userModel');

module.exports.checkAuth = async(req,res,next)=>{
    if(req.isAuthenticated()){
        return next()
    }
    req.flash("error_msg", "You must log-in first!");
    res.redirect('/login');
}
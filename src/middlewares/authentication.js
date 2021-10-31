module.exports.isAuth = (req,res,next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.status(401).json({ message : "you are not logged on"})
    }
}
module.exports.isAdmin = (req,res,next) => {
    if(req.isAuthenticated() && req.user.admin) {
        next()
    } else {
        res.status(401).json({message : "you do not have admin capabilities, please redirect."})
    }
}
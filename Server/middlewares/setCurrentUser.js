import User from "../models/user.js";

export const setCurrentUser = async (req, res, next) => {
    const {email} = req.body;
    if (email) {
        const user = User.findOne({email});
        if (user) {
            req.user = user;
        }
        next();
    }else{
        res.redirect("/");
    }
}
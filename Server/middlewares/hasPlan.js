import User from "../models/user.js";

export const hasPlan = (plan) => {
    return async (req, res, next) => {
        if (req.user.plan === plan) {
            next();
        } else {
            res.status(401).send({message: "You are not authorized to access this route"});
        }
    }
}
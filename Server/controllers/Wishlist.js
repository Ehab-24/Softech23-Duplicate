import {Customer} from "../models/Customer.js";

export const addWishlist = async (req, res) => {
    try {
        const customer = await Customer.findById(req.user.customer_id);
        customer.wishlist.push(req.body.item_id);
        await customer.save();
        res.status(200).json({
            customer
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message,
        });       
    }
};
export const getWishlist = async (req, res) => {
    try {
        const customer = await Customer.findById(req.user.customer_id);
        res.status(200).json({
            customer
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message,
        });       
    }
};
export const deleteWishlist = async (req, res) => {
    try {
        const customer = await Customer.findById(req.user.customer_id);
        console.log(customer)
        customer.wishlist = customer.wishlist.filter((item) => item != req.params.id);
        await customer.save();
        res.status(200).json({
            customer
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message,
        });       
    }
};
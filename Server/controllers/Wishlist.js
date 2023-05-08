import {Customer} from "../models/Customer.js";
import Item from "../models/Item.js";

export const getWishlist = async (req, res) => {
    try {
        const customer = await Customer.findById(req.user.customer_id);
        const itemIds = customer.wishlist;
        const items = await Item.find({ _id: { $in: itemIds } });
        res.status(200).json({
            items
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message,
        });       
    }
};

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
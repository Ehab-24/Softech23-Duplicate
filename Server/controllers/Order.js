import Order from "../models/Order.js";

//Adding order
export const addOrder = async (req, res) => {
    try {
        const { order_date, order_status, order_total, order_items, customer_id } = req.body;
        const order = await Order.create({ order_date, order_status, order_total, order_items, customer_id });
        res.status(201).json({
            order
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
}

//Deleting order
export const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findByIdAndDelete(id);
        res.json({
            order
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });   
    }
}

//Getting order by id
export const getOrderById = async (req, res) => {
        try {
            const { id } = req.params;
            const order = await Order.findById(id);

            res.json({
                order
            });
        } catch (error) {
            res.status(400).json({
                status: 'fail',
                message: error.message
            });
        }
}

//Getting all orders
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.json({
            orders
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
}

//Updating order
export const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { order_date, order_status, order_total, order_items, customer_id } = req.body;
        const order = await Order.findByIdAndUpdate(id, { order_date, order_status, order_total, order_items, customer_id }, { new: true });
        res.json({
            order
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
}
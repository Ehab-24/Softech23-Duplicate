import Item from "../models/Item.js";

//Adding item

export const addItem = async (req, res) => {
    try {
        const { item_title, item_description, item_price, item_cost, item_quantity, inventory_type, item_images, minimum_age } = req.body;
        const item = await Item.create({ item_title, item_description, item_price, item_cost, item_quantity, inventory_type, item_images, minimum_age });
        res.status(201).json({
            item
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};

//Deleting item

export const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await Item.findByIdAndDelete(id);
        res.json({
            item
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });   
    }
}

//Getting item by id

export const getItemById = async (req, res) => {
        try {
            const { id } = req.params;
            const item = await Item.findById(id);

            res.json({
                item
            });
        } catch (error) {
            res.status(400).json({
                status: 'fail',
                message: error.message
            });
        }
}

//Getting all items

export const getAllItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.json({
            items
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
}

//Updating item

export const updateItem = async (req, res) => {
    try {
        const { id, item_title, item_description, item_price, item_cost, item_quantity, inventory_type, item_images, minimum_age } = req.body;
        const item = await Item.findByIdAndUpdate(id, { item_title, item_description, item_price, item_cost, item_quantity, item_images, inventory_type, minimum_age });
        res.json({
            item
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};

//Getting item by inventory_id 

export const getItemByInventoryType = async (req, res) => {
    try {
        let { inventory_type } = req.body;
        console.log(inventory_type);
        const item = await Item.find({ inventory_type });
        res.json({
            item
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};

// Getting item by title

export const getItemByTitle = async (req, res) => {
    try {
        const { item_title } = req.body;
        const item = await Item.find({ item_title });
        res.json({
            item
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
}

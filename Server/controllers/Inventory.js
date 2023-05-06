import Inventory from '../models/Inventory.js';

//Adding inventory

export const addInventory = async (req, res) => {
    try {
        const inventory = await Inventory.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                inventory
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
}
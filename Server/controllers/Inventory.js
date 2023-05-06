const Inventory = require('../models/inventory');

const addInventory = (req, res) => {
    const inventory = new Inventory(req.body);
    inventory.save()
        .then(inventory => {
            res.status(200).json(inventory);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        });
}

const getInventorys = (req, res) => {
    Inventory.find()
        .then(inventorys => {
            res.status(200).json(inventorys);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        });
}

const getInventoryById = (req, res) => {
    Inventory.findById(req.params.id)
        .then(inventory => {
            res.status(200).json(inventory);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        });
}

const updateInventory = (req, res) => {
    Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(inventory => {
            res.status(200).json(inventory);
        }
        )
        .catch(err => {
            res.status(500).json({ message: err.message });
        }
        );
}

const getInventoryItems = (req, res) => {
    Inventory.findById(req.params.id)
        .populate('items')
        .then(inventory => {
            res.status(200).json(inventory.items);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        });
}

const addInventoryItem = (req, res) => {
    Inventory.findById(req.params.id)
        .then(inventory => {
            inventory.items.push(req.body.itemId);
            inventory.save()
                .then(inventory => {
                    res.status(200).json(inventory);
                })
                .catch(err => {
                    res.status(500).json({ message: err.message });
                });
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        });
}


const Items = require('../models/Item');

const addItem = (req, res) => {
    const item = new Items(req.body);
    item.save()
        .then(item => {
            res.status(200).json(item);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        });
}

const getItems = (req, res) => {
    Items.find()
        .then(items => {
            res.status(200).json(items);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        });
}

const getItemById = (req, res) => {
    Items.findById(req.params.id)
        .then(item => {
            res.status(200).json(item);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        });
}
const Admin = require('../models/Admin');

const addAdmin = (req, res) => {
    const admin = new Admin(req.body);
    admin.save()
        .then(admin => {
            res.status(200).json(admin);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        });
}

const getAdmins = (req, res) => {
    Admin.find()
        .then(admins => {
            res.status(200).json(admins);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        });
}

const getAdminById = (req, res) => {
    Admin.findById(req.params.id)
        .then(admin => {
            res.status(200).json(admin);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        });
}

const updateAdmin = (req, res) => {
    Admin.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(admin => {
            res.status(200).json(admin);
        }
        )
        .catch(err => {
            res.status(500).json({ message: err.message });
        }
        );
}

module.exports = {
    addAdmin,
    getAdmins,
    getAdminById,
    updateAdmin
}
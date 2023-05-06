import { Support } from "../models/Support";

const createSupport = async (req, res) => {
    try {
        const support = await Support.create(req.body);
        return res.status(201).json({
            support
        });
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

const getAllSupports = async (req, res) => {
    try {
        const supports = await Support.find().populate("customer");
        return res.status(200).json({supports});
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const getSupportById = async (req, res) => {
    try {
        const { id } = req.params;
        const support = await Support.findById(id).populate("customer");
        if (support) {
            return res.status(200).json({support});
        }
        return res.status(404).send("Support with the specified ID does not exists");
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const updateSupportStatus = async (req, res) => {
    const id = req.params.id;
    const status = req.body.status;
    try {
        const support = await Support.findByIdAndUpdate(id, {status: status}, {new: true});
        return res.status(200).json({support});
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
}

const deleteSupport = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Support.findByIdAndDelete(id);
        if (deleted) {
            return res.status(200).send("Support deleted");
        }
        throw new Error("Support not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
}
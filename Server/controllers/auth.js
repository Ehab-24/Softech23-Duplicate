import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Customer } from "../models/Customer";
import { Admin } from "../models/Admin";

const registerCustomer = async (req, res) => {
    try {
        const { name, email, dob, password } = req.body;
        const hash_password = await bcrypt.hash(password, 10);
        const customer = await Customer.create({
        name,
        email,
        dob,
        hash_password,
        });
        res.status(201).json({
        status: "success",
        message: "Customer created successfully",
        customer,
        });
    } catch (error) {
        res.status(400).json({
        status: "fail",
        message: error.message,
        });
    }
}

const registerAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hash_password = await bcrypt.hash(password, 10);
        const admin = await Admin.create({
        name,
        email,
        hash_password,
        });
        res.status(201).json({
        status: "success",
        message: "Admin created successfully",
        admin,
        });
    } catch (error) {
        res.status(400).json({
        status: "fail",
        message: error.message,
        });
    }
}

const loginCustomer = async (req, res) => {
    Customer.findOne({ email: req.body.email })
    .exec(async (error, customer) => {
        if (error) return res.status(400).json({ error });
        if (customer) {
        const isPassword = await customer.authenticate(req.body.password);
        if (isPassword && customer.role === "customer") {
            const token = jwt.sign(
            { _id: customer._id, role: customer.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
            );
            const { _id, name, email, role } = customer;
            res.status(200).json({
            token,
            customer: { _id, name, email, role },
            });
        } else {
            return res.status(400).json({
            message: "Invalid password",
            });
        }
        } else {
        return res.status(400).json({ message: "Something went wrong" });
        }
    }
)}

const loginAdmin = async (req, res) => {
    Admin.findOne({ email: req.body.email })
    .exec(async (error, admin) => {
        if (error) return res.status(400).json({ error });
        if (admin) {
        const isPassword = await admin.authenticate(req.body.password);
        if (isPassword && admin.role === "admin") {
            const token = jwt.sign(
            { _id: admin._id, role: admin.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
            );
            const { _id, name, email, role } = admin;
            res.status(200).json({
            token,
            admin: { _id, name, email, role },
            });
        } else {
            return res.status(400).json({
            message: "Invalid password",
            });
        }
        } else {
        return res.status(400).json({ message: "Something went wrong" });
        }
    }
)}

export { registerCustomer, registerAdmin, loginCustomer, loginAdmin };
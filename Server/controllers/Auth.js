import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Customer } from "../models/Customer.js";
import { Admin } from "../models/Admin.js";

export const registerCustomer = async (req, res) => {
    try {
        const { name, email, password, dob, gender } = req.body;
        if (!(email && password && name && gender, dob)) {
            res.status(400).send("All input is required");
        }

        const oldUser = await Customer.findOne({ email });

        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        const encryptedPassword = await bcrypt.hash(password, 10);
        const customer = await Customer.create({
            name,
            email: email.toLowerCase(),
            hashedPassword: encryptedPassword,
            dob,
            gender,
        });
        const token = jwt.sign(
            { customer_id: customer._id, email },
            process.env.JWT_SECRET,
            {
                expiresIn: "2h",
            }
        );
        // return new user
        res.status(201).json({
            customer,
            token,
        });

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message,
        });
    }
}

export const registerAdmin = async (req, res) => {
    try {

        const { email, password  } = req.body;
        if (!(email && password  )) {
            res.status(400).send("All input is required");
        }
        const oldUser = await Admin.findOne({ email });

        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        const encryptedPassword = await bcrypt.hash(password, 10);
        const admin = await Admin.create({
            email: email.toLowerCase(),
            hashedPassword: encryptedPassword,
        });
        const token = jwt.sign(
            { admin_id: admin._id, email },
            process.env.JWT_SECRET,
            {
                expiresIn: "2h",
            }
        );

        // return new user
        res.status(201).json({
            admin,
            token,
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message,
        });
    }
}

export const loginCustomer = async (req, res) => {
    try {
        const {email, password} = req.body;
        //Checking if the email exists
        const customer = await Customer.findOne({email});
        if(!customer) return res.status(400).send("Email is not found");
        //Password is correct
        const validPass = await bcrypt.compare(password, customer.hashedPassword);
        if(!validPass) return res.status(400).send("Invalid password");
        //Create and assign a token
        const token = jwt.sign(
            { customer_id: customer._id, email },
            process.env.JWT_SECRET,
            {
                expiresIn: "2h",
            }
        );
        res.status(200).json({
            token,
            customer
        });
    } catch (error) {
        res.status(400).json({
                status: "fail",
                message: error.message,
        });
    }
}

export const loginAdmin = async (req, res) => {
    try {
        const {email, password} = req.body;

        //Checking if the email exists
        const admin = await Admin.findOne({email});
        if(!admin) return res.status(400).send("Email is not found");
        //Password is correct
        const validPass = await bcrypt.compare(password, admin.hashedPassword);
        if(!validPass) return res.status(400).send("Invalid password");
        //Create and assign a token
        const token = jwt.sign(
            { admin_id: admin._id, email },
            process.env.JWT_SECRET,
            {
                expiresIn: "2h",
            }
        );

        res.status(200).json({
            token,
            admin
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message,
        });   
    }
}

// Get all customers

export const getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();
        res.status(200).json({
            customers
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message,
        });
    }
}

// get customer by token

export const getCustomerByToken = async (req, res) => {
    try {
        const customer = await Customer.findById(req.customer._id);
        res.status(200).json({
            customer
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message,
        });
    }
}

// get admin by token

export const getAdmin = async (req, res) => {
    try {
        const admin = await Admin.findById(req.user.admin_id);
        res.status(200).json({
            admin
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message,
        });
    }
};

// get customer by token

export const getCustomer = async (req, res) => {
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
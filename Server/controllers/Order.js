import Order from "../models/Order.js";

//Adding order
export const addOrder = async (req, res) => {
    try {
        console.log(req.body);
        const {  order_status, order_total, order_items , customer_id} = req.body;
        const order_date = new Date();
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

//Getting orders by customer name
export const getOrderByCustomerName = async (req, res) => {
    const name = req.params.name;
    try {
      const orders = await Order.find({ 'customer.name': name });
      if (!orders) {
        return res.status(404).json({
          status: 'fail',
          message: `No orders found for customer with name ${name}`,
        });
      }
      return res.status(200).json({
        status: 'success',
        data: {
          orders,
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error',
      });
    }
  };

  
//Getting orders by customer email
export const getOrderByCustomerEmail = async (req, res) => {
    const email = req.params.email;
    try {
        const orders = await Order.find({ 'customer.email': email });
        if (!orders) {
            return res.status(404).json({
            status: 'fail',
            message: `No orders found for customer with email ${email}`,
            });
        }
        return res.status(200).json({
            status: 'success',
            data: {
            orders,
            },
        });
        }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
        }
};

// ger order by customer date
export const getOrderByCustomerDate = async (req, res) => {
    const date = req.params.date;
    Order.aggregate([
        {
            $match: {
                order_date: {
                    $gte: new Date(req.params.date)
                }
            }
        }
    ], (err, result) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(result);
        }
    }
    )
}
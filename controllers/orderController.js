const Order = require('../models/order');
const pdfGenerator = require('../config/pdfGenerator');

// Controller method to create a new order
const createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();

    // Generate PDF invoice for the order
    const pdf = await pdfGenerator.generatePdf(order);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=OrderInvoice_${order._id}.pdf`);
    res.send(pdf);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Controller method to get all orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.render('orders', { orders });
  } catch (err) {
    res.status(400).send(err);
  }
};

// Controller method to get a specific order by ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    res.render('order', { order });
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById
};

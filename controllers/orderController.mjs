import { Order, Flower, User } from '../models/index.mjs';

export const getOrders = async (req,res) => {
    if(req.user.role==='admin'){
        const orders = await Order.findAll({ include:[User,Flower] });
        res.json(orders);
    } else {
        const orders = await Order.findAll({ where:{ userId:req.user.id }, include:[Flower] });
        res.json(orders);
    }
};

export const getOrderById = async (req,res) => {
    const order = await Order.findByPk(req.params.id, { include:[Flower] });
    if(!order) return res.status(404).json({ message:'Not found' });
    if(req.user.role!=='admin' && order.userId!==req.user.id) return res.status(403).json({ message:'Forbidden' });
    res.json(order);
};

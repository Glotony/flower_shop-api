import { Flower, Order, OrderItem } from '../models/index.mjs';
let carts = {};

export const getCart = (req,res) => res.json(carts[req.user.id] || []);
export const addToCart = async (req,res) => {
    const { flowerId, quantity } = req.body;
    const flower = await Flower.findByPk(flowerId);
    if(!flower) return res.status(404).json({ message:'Flower not found' });

    if(!carts[req.user.id]) carts[req.user.id] = [];
    carts[req.user.id].push({ flowerId, name:flower.name, price:flower.price, quantity });
    res.json(carts[req.user.id]);
};

export const checkout = async (req,res) => {
    const items = carts[req.user.id];
    if(!items || items.length===0) return res.status(400).json({ message:'Cart empty' });

    const total = items.reduce((sum,i)=> sum+i.price*i.quantity,0);
    const order = await Order.create({ userId:req.user.id,total });

    for(const item of items){
        await OrderItem.create({ OrderId:order.id,FlowerId:item.flowerId,quantity:item.quantity });
    }

    carts[req.user.id] = [];
    res.json({ message:'Order placed', orderId:order.id });
};

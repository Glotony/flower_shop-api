import sequelize from '../config/db.mjs';
import UserModel from './user.mjs';
import FlowerModel from './flower.mjs';
import OrderModel from './order.mjs';
import OrderItemModel from './orderItem.mjs';

const User = UserModel(sequelize);
const Flower = FlowerModel(sequelize);
const Order = OrderModel(sequelize);
const OrderItem = OrderItemModel(sequelize);
// Associations
User.hasMany(Order);
Order.belongsTo(User);

Order.belongsToMany(Flower, { through: OrderItem });
Flower.belongsToMany(Order, { through: OrderItem });

export { sequelize, User, Flower, Order, OrderItem };

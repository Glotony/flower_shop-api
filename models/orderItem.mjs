import { DataTypes } from 'sequelize';
export default (sequelize) => sequelize.define('OrderItem', {
    quantity: DataTypes.INTEGER
});

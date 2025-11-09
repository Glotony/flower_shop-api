import { DataTypes } from 'sequelize';
export default (sequelize) => sequelize.define('Flower', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.FLOAT,
    stock: DataTypes.INTEGER
});

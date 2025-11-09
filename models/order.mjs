import { DataTypes } from 'sequelize';
export default (sequelize) => sequelize.define('Order', {
    total: DataTypes.FLOAT,
    status: { type: DataTypes.ENUM('pending','completed','cancelled'), defaultValue: 'pending' }
});

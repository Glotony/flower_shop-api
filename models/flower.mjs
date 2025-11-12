import { DataTypes } from 'sequelize';

export default (sequelize) => sequelize.define('Flower', {
  name: DataTypes.STRING,
  description: DataTypes.STRING,
  price: DataTypes.FLOAT,
  image_url: DataTypes.STRING
}, {
  tableName: 'Flowers',
  timestamps: true
});

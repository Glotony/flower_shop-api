import 'dotenv/config';
import express from 'express';
import { sequelize } from './models/index.mjs';
import authRoutes from './routes/authRoutes.mjs';
import flowerRoutes from './routes/flowerRoutes.mjs';
import cartRoutes from './routes/cartRoutes.mjs';
import orderRoutes from './routes/orderRoutes.mjs';

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/flowers', flowerRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5000;
sequelize.sync({ alter:true }).then(()=>{
    console.log('DB synced');
    app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));
});

import 'dotenv/config';
import express from 'express';
import { sequelize } from './models/index.mjs';

// Routes
import authRoutes from './routes/authRoutes.mjs';
import flowerRoutes from './routes/flowerRoutes.mjs';
import cartRoutes from './routes/cartRoutes.mjs';
import orderRoutes from './routes/orderRoutes.mjs';

const app = express();

// Middleware
app.use(express.json());

// ----------------------
// Routes
// ----------------------
app.use('/api/auth', authRoutes);
app.use('/api/flowers', flowerRoutes); // public & admin CRUD
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// ----------------------
// Health check
// ----------------------
app.get('/', (req, res) => {
  res.send('🌿 Flower Shop API is running');
});

// ----------------------
// Start server
// ----------------------
const PORT = process.env.PORT || 5000;

sequelize
  .sync({ alter: true }) // ensures DB tables match models
  .then(() => {
    console.log('✅ DB synced');
    app.listen(PORT, () => console.log(`🌸 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('❌ DB connection failed:', err);
  });

import express from 'express';
import cors from 'cors';
import productRoutes from './routers/productRoute';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

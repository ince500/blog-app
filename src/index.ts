import express from 'express';
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
app.use(userRoutes);
app.use(postRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

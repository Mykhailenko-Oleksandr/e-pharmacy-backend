import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { errors } from 'celebrate';
import 'dotenv/config';

import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

import authRoutes from './routes/authRoutes.js';
import storesRoutes from './routes/storesRoutes.js';
import productsRoutes from './routes/productsRoutes.js';
import reviewsRoutes from './routes/reviewsRoutes.js';
import usersRoutes from './routes/usersRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';

import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT ?? 3030;

app.use(logger);
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(cookieParser());

app.use(authRoutes);
app.use(usersRoutes);
app.use(storesRoutes);
app.use(productsRoutes);
app.use(reviewsRoutes);
app.use(cartRoutes);
app.use(categoryRoutes);

app.use(notFoundHandler);

app.use(errors());

app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

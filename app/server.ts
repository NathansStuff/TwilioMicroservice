import express from 'express';
import { errorHandler } from './middleware/errorMiddleware';
import { PORT } from './utils/config';
import authenticationRoutes from './routes/authenticationRoutes';

const app = express();
app.use(express.json());

app.use('/authentication', authenticationRoutes);

app.use(errorHandler);

app.listen(PORT, () => console.log(`server started on port ${PORT}`));

import express from 'express';
import { errorHandler } from './middleware/errorMiddleware';
import { checkEnvVariables, PORT } from './utils/config';
import authenticationRoutes from './routes/authenticationRoutes';

console.log('Initializing server...');
console.log('Checking environment variables...');
checkEnvVariables();

const app = express();
app.use(express.json());

app.use('/authentication', authenticationRoutes);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

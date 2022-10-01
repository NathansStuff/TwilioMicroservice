import express from 'express';
import { errorHandler } from './middleware/errorMiddleware';
import { PORT } from './utils/config';
// import PokemonRoutes from './routes/PokemonRoutes';
// import userRoutes from './routes/userRoutes';

const app = express();
app.use(express.json());

// app.use('/api/Pokemons', PokemonRoutes);
// app.use('/api/users', userRoutes);

app.use(errorHandler);

app.listen(PORT, () => console.log(`server started on port ${PORT}`));

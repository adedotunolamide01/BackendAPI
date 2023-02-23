import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import photoRoutes from './routes/photoRoutes.js';

const port = process.env.PORT;

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Unsplash API!' });
});

app.use('/api/photos', photoRoutes);

app.listen(port, () => console.log(` listening on port ${port}`));

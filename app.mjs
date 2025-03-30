import express from 'express';
import { connectDB } from "./config/dbConfig.mjs";
import superHeroRoutes from './routes/superHeroRoutes.mjs'

const app = express();
const PORT = process.env.PORT || 3500;

app.use(express.json());

connectDB();

app.use('/api/desa', superHeroRoutes);

app.use((req, res) => {
    res.status(404).send({ mensaje: "Ruta no encontrada" });
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
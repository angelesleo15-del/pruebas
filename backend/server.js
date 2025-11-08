import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';

const app = express();
const PORT = 3001; // Puerto diferente al de Vite (5173)

// Middlewares
app.use(cors()); // Permitir peticiones desde React
app.use(express.json());

// Ruta raíz
app.get('/', (req, res) => {
  res.json({ 
    mensaje: 'API de Autenticación - Sky App',
    version: '1.0.0',
    endpoints: {
      registro: 'POST /api/auth/registro',
      login: 'POST /api/auth/login'
    }
  });
});

// Rutas de autenticación
app.use('/api/auth', authRoutes);

// Manejo de errores
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Backend corriendo en http://localhost:${PORT}`);
});
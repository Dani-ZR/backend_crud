const express = require('express');
const cors = require('cors');

// Importar rutas
const usuariosRoutes = require('./routes/usuarios');
const postsRoutes = require('./routes/posts');
const productosRoutes = require('./routes/productos');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/productos', productosRoutes);

// Salud
app.get('/', (req, res) => res.send('API backend corriendo 🚀'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Backend escuchando en http://0.0.0.0:${PORT}`);
});


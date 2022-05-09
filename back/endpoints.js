import usuariosRoutes from './src/routes/usuarios.routes.js';
import aguaRoutes from './src/routes/agua.routes.js';

export default function setupEndpoints(app) {
    app.use('/api/usuarios', usuariosRoutes);
    app.use('/api/agua', aguaRoutes);
}
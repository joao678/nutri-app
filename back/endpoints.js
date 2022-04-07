import usuariosRoutes from './src/routes/usuarios.routes.js';

export default function setupEndpoints(app) {
    app.use('/api/usuarios', usuariosRoutes);
}
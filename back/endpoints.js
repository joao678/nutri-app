import usuariosRoutes from './src/routes/usuarios.routes.js';
import aguaRoutes from './src/routes/agua.routes.js';
import exercicioRoutes from './src/routes/exercicio.routes.js';

export default function setupEndpoints(app) {
    app.use('/api/usuarios', usuariosRoutes);
    app.use('/api/agua', aguaRoutes);
    app.use('/api/exercicio', exercicioRoutes);
}
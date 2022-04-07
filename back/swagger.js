import swaggerAutogen from 'swagger-autogen';
import server from './server.js';
import swaggerConfig from './swaggerConfig.js';

const outputFile = 'swagger_output.json'
const endpointsFiles = ['endpoints.js'];

swaggerAutogen()(outputFile, endpointsFiles, swaggerConfig).then(() => {
    server();
});
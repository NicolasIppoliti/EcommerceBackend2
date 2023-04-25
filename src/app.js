//Importando las dependencias
import app from './server.js';
import './db.js';

//Iniciando el servidor y puerto

const server = app.listen(app.get('port'), () => {
    console.log('Servidor corriendo en el puerto', app.get('port'));
});

//Manejo de errores
server.on('error', error => {
    console.log('Error de servidor', error);
});
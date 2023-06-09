// Configuracion de la conexion a Mongo
import mongoose from "mongoose";
import config from './config/config.js';

mongoose.connect(config.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));

export default mongoose;
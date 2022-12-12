import 'dotenv/config'
import './Config/connectdb.js'
import cookie from 'cookie-parser'
import express from 'express'
import cors from 'cors'

import authRouter from './routes/auth.route.js'
import linkRouter from './routes/link.route.js'
import redirectRouter from './routes/redirect.route.js'

const app = express();

const whiteList = [process.env.ORIGIN1,process.env.ORIGIN2];

app.use(cors({
    origin: function(origin,callback){
       if(!origin || whiteList.includes(origin)) {
        return this.callback(null, origin)
       }

       return callback("Cors Errors origin: " + origin + "No authorized");
    }
}));
//Middlewares
app.use(express.json());
app.use(cookie());
app.use(express.urlencoded({extended:false}));
//rutas
app.use('/', redirectRouter)
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/links', linkRouter);
//just to practice and test
app.use(express.static('public'))


//acceder todas las variables en el archivo .env CUANDO DESPLEGUEMOS ES NECESARIO PARA QUE LA PLATAFORMA
//LE ASIGNE UN PUERTO POR ESO NO SE CONFIGURA EN EL .ENV
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log('🔥🔥🔥 http://localhost:' + PORT));
import 'dotenv/config'
import './Config/connectdb.js'
import express, { application } from 'express'
import authRouter from './routes/auth.route.js'
import cookie from 'cookie-parser'
import linkRouter from './routes/link.route.js'

const app = express();
//Middlewares
app.use(express.json());
app.use(cookie());
app.use(express.urlencoded({extended:false}));
//rutas
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/links', linkRouter);
//just to practice and test
app.use(express.static('public'))


//acceder todas las variables en el archivo .env CUANDO DESPLEGUEMOS ES NECESARIO PARA QUE LA PLATAFORMA
//LE ASIGNE UN PUERTO POR ESO NO SE CONFIGURA EN EL .ENV
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log('🔥🔥🔥 http://localhost:' + PORT));
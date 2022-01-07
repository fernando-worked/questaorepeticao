import express from 'express';
import navigationRoutes from './routes/navigation/index';
import apiRoutes from './routes/api/api';
import loginRoute from './routes/navigation/login';
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config(); 
app.use(bodyParser.json());
import cookieParser from 'cookie-parser';
app.use(cookieParser()); 
import { verificarJWT, usuarioAutenticado } from './controller/middleware/AuthController';
 

app.use('/login', loginRoute);

app.use('/', navigationRoutes);
app.use('/api', apiRoutes); 

app.listen(3000); 
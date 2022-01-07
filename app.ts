import express from 'express';
import navigationRoutes from './routes/navigation/index';
import apiRoutes from './routes/api/api';
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config(); 
app.use(bodyParser.json());
import cookieParser from 'cookie-parser';
app.use(cookieParser()); 

app.use('/', navigationRoutes);  
app.use('/api', apiRoutes);

app.listen(3000); 
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

import login from './routes/login';
import register from './routes/register';
import save from './routes/save';

app.use(login);
app.use(register);
app.use(save);

export default app;
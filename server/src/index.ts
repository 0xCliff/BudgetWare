import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import http from 'http';
import dotenv from 'dotenv';

import { connect_db } from './db';

const app = express();

dotenv.config();
app.use(
  cors({
    credentials: true,
  })
);
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);
const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}/`);
});

connect_db(process.env.MONGO_URL);

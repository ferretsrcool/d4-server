// Rounting handled by express.
import express from 'express';
// Basic http server.
import http from 'http';
// Mongoose as ODM for mongodb.
import mongoose from 'mongoose';

import bodyParser from 'body-parser';
import cors from 'cors';

// Import routes configuration.
// tslint:disable-next-line:import-name
import route from './routes';

// Import volatile storage.
import Store from './Store';

import Socket from './Socket';

// tslint:disable-next-line:import-name
import seedReadings from './models/seed/Reading';

// Get env variables.
import { PORT, DB_URL, NODE_ENV } from './config';

const app: express.Application = express();
const server: http.Server = http.createServer(app);
Socket.init(server);

// Connect to database.
mongoose.connect(DB_URL, { useNewUrlParser: true })
.catch((err: Error) => {
  // tslint:disable-next-line:no-console
  console.log('Failed to connect to database.');

  throw err;
});

// Initialise client.
Store.init();

// Seed the database if in development or testing environment.
if (NODE_ENV !== 'production') {
  mongoose.connection.dropDatabase()
  .then(() => {
    seedReadings();
  });
}

// Set up cors header.
app.use(cors());

// Parse application/json.
app.use(bodyParser.json());

// Initialize routes.
route(app);

server.listen(PORT, (err: Error) => {
  if (err) {
    throw err;
  }
  // tslint:disable-next-line:no-console
  console.log(`App is listening on port ${PORT}`);
});

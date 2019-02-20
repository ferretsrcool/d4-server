import express from 'express';
import mongoose from 'mongoose';

// tslint:disable-next-line:import-name
import route from './routes';

import { PORT, DB_URL } from './config';

const app: express.Application = express();

mongoose.connect(DB_URL, { useNewUrlParser: true });

// Initialize routes.
route(app);

app.listen(PORT, (err: Error) => {
  if (err) {
    throw err;
  }
  console.log(`App is listening on port ${PORT}`);
});

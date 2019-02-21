import express from 'express';
import mongoose from 'mongoose';

// tslint:disable-next-line:import-name
import route from './routes';

// tslint:disable-next-line:import-name
import seedReadings from './models/seed/Reading';

import { PORT, DB_URL, NODE_ENV } from './config';

const app: express.Application = express();

mongoose.connect(DB_URL, { useNewUrlParser: true });

if (NODE_ENV !== 'production') {
  seedReadings();
}

// Initialize routes.
route(app);

app.listen(PORT, (err: Error) => {
  if (err) {
    throw err;
  }
  // tslint:disable-next-line:no-console
  console.log(`App is listening on port ${PORT}`);
});

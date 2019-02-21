import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

// tslint:disable-next-line:import-name
import route from './routes';

// tslint:disable-next-line:import-name
import seedReadings from './models/seed/Reading';

// Get env variables.
import { PORT, DB_URL, NODE_ENV } from './config';

const app: express.Application = express();

// Connect to database.
mongoose.connect(DB_URL, { useNewUrlParser: true })
.catch((err: Error) => {
  // tslint:disable-next-line:no-console
  console.log('Failed to connect to database.');

  throw err;
});

// Seed the database if in development or testing environment.
if (NODE_ENV !== 'production') {
  seedReadings();
}

// Parse application/json.
app.use(bodyParser.json());

// Initialize routes.
route(app);

app.listen(PORT, (err: Error) => {
  if (err) {
    throw err;
  }
  // tslint:disable-next-line:no-console
  console.log(`App is listening on port ${PORT}`);
});

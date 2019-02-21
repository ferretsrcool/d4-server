import { Application } from 'express';

// tslint:disable-next-line:import-name
import readingController from './controllers/Reading';

export default (app: Application) => {

  app.use('/reading', readingController);
};

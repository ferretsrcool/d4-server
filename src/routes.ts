import { Application } from 'express';

// tslint:disable-next-line:import-name
import readingController from './controllers/Reading';
// tslint:disable-next-line:import-name
import fileController from './controllers/File';

export default (app: Application) => {

  app.use('/reading', readingController);
  app.use('/file', fileController);
};

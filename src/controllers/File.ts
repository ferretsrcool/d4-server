import { Router, Request, Response } from 'express';

// Import persistent storage models.
import { Document } from 'mongoose';
import File from '../models/File';

const fileRouter = Router();

fileRouter.get('/', (req: Request, res: Response) => {
  File.find({}, { updatedAt: 0, samples: 0, __v: 0 })
  .then((files: Document[]) => res.status(200).send(files))
  .catch((err: Error) => res.status(500).send(err.message));
});

export default fileRouter;

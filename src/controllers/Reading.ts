import { Router, Request, Response } from 'express';

import { Document } from 'mongoose';
import Reading from '../models/Reading';

const readingRouter = Router();

readingRouter.get('/', (req: Request, res: Response) => {
  Reading.find({})
  .then((readings: Document[]) => res.status(200).send(readings))
  .catch((err: Error) => res.status(500).send(err));
});

readingRouter.get('/:id', (req: Request, res: Response) => {
  Reading.findById(req.params.id)
  .then((reading: Document | null) => {
    if (reading === null) {
      res.status(401).send('Reading with given id could not be found.');
    }
    res.status(200).send(reading);
  })
  .catch((err: Error) => res.status(401).send(err));
});

readingRouter.post('/', (req: Request, res: Response) => {
  Reading.create({
    user: req.body.user,
    samples: JSON.parse(req.body.samples),
  })
  .then((reading: Document) => res.status(201).send(reading))
  .catch((err: Error) => res.status(400).send(err));
});

export default readingRouter;

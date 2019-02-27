import { Router, Request, Response } from 'express';

// Import volatile storage model.
import Store from '../Store';

// Import client socket emitter.
import Socket from '../Socket';

// Import persistent storage models.
import { Document } from 'mongoose';
import Reading from '../models/Reading';

const readingRouter = Router();

readingRouter.get('/', (req: Request, res: Response) => {
  Reading.find({}, { updatedAt: 0, samples: 0, __v: 0 })
  .then((readings: Document[]) => res.status(200).send(readings))
  .catch((err: Error) => res.status(500).send(err.message));
});

readingRouter.get('/:id', (req: Request, res: Response) => {
  Reading.findById(req.params.id)
  .then((reading: Document | null) => {
    if (reading === null) {
      throw Error('Reading with given id could not be found.');
    }
    res.status(200).send(reading);
  })
  .catch((err: Error) => res.status(400).send(err.message));
});

readingRouter.post('/:sample', (req: Request, res: Response) => {

  if (isNaN(req.params.sample)) {
    throw Error('Value is not a number');
  }

  Store.addSample(req.params.sample)
  .then((listLength: number) => {

    Socket.emitSample(req.params.sample);
    res.status(200).send(`Sample saved. ${listLength} samples currently stored.`);
  })
  .catch((err: Error) => res.status(400).send(err.message));
});

readingRouter.post('/', (req: Request, res: Response) => {

  Store.getSamples()
  .then((samples: string[]) => {
    if (samples.length <= 0) {
      throw Error('Cannot save reading with no samples');
    }
    return Reading.create({ samples });
  })
  .then((reading: Document) => res.status(201).send(reading))
  .then(() => Store.dropSamples())
  .then(() => Socket.emitRefreshHistory())
  .catch((err: Error) => res.status(400).send(err.message));
});

export default readingRouter;

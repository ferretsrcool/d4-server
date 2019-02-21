import User from '../User';
import Reading from '../Reading';

import { Document } from 'mongoose';

export default () => {
  User.deleteMany({})
  .then(() => Reading.deleteMany({}))
  .then(() => {
    User
    .create({ name: 'Dan Goje' })
    .then((user: Document) => {
      [
        {
          user: user._id,
          samples: [2.3, 4.2, 5.5],
        },
        {
          user: user._id,
          samples: [2.4, 5.6, 3.3, 2.3],
        },
        {
          user: user._id,
          samples: [5.5, 1.4],
        },
      ].forEach((reading) => {
        Reading.create(reading);
      });
    })
    .catch((err: Error) => {
      throw err;
    });
  });
};

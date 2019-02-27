import Reading from '../Reading';

export default () => {
  [
    {
      samples: [2.3, 4.2, 5.5],
    },
    {
      samples: [2.4, 5.6, 3.3, 2.3],
    },
    {
      samples: [5.5, 1.4],
    },
  ].forEach((reading) => {
    Reading.create(reading);
  });
};

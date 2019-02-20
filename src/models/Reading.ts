import { Schema, model } from 'mongoose';

const readingSchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  samples: [Number],
});

export default model('Reading', readingSchema);

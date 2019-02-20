import { Schema, model } from 'mongoose';

const readingSchema: Schema = new Schema({
  user: Number,
  samples: [Number],
});

export default model('Reading', readingSchema);

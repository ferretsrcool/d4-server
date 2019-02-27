import { Schema, model } from 'mongoose';

const readingSchema: Schema = new Schema({
  samples: {
    type: [String],
    required: true,
  },
}, {
  timestamps: true,
});

export default model('Reading', readingSchema);

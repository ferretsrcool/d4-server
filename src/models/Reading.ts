import { Schema, model } from 'mongoose';

const readingSchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: String,
  samples: {
    type: [Number],
    required: true,
  }
}, {
  timestamps: true,
});

export default model('Reading', readingSchema);

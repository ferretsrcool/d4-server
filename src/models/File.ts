import { Schema, model } from 'mongoose';

const fileSchema: Schema = new Schema({
  fileName: String,
  fileData: String,
}, {
  timestamps: true,
});

export default model('File', fileSchema);

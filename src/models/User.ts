import { Schema, model } from 'mongoose';

const userSchema: Schema = new Schema({
  name: String,
});

export default model('User', userSchema);

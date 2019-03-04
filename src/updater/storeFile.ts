import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';

import File from '../models/File';

import { DB_URL } from '../config';

type StoredFile = {
  fileData: string,
  fileName: string,
};

const fileData: string = fs.readFileSync(process.argv[2], { encoding: 'utf8' });
const fileName: string = path.basename(process.argv[2]);
const storeData: StoredFile = {
  fileName,
  fileData,
};

mongoose.connect(DB_URL, { useNewUrlParser: true })
.catch((err: Error) => {
  // tslint:disable-next-line:no-console
  console.log('Failed to connect to database.');

  throw err;
});

File.create(storeData)
.then((file: mongoose.Document) => {
  // tslint:disable-next-line:no-console
  console.log(`File with name ${fileName} was created`);
  // tslint:disable-next-line:no-console
  console.log(file.toJSON());
})
.catch((err: Error) => {
  // tslint:disable-next-line:no-console
  console.log('Failed to connect to database.');

  throw err;
});

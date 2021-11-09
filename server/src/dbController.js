import fs from 'fs';
import {resolve} from 'path';

const bashPath = resolve();

const filenames = {
  messages: resolve(bashPath, 'src/db/messages.json'),
  users: resolve(bashPath, 'src/db/users.json')
}

export const readDB = target => {
  try {
    return JSON.parse(fs.readFileSync(filenames[target], 'utf-8'))
  } catch (err) {
    console.err("err", err);
  }
}



export const writeDB = (target, data) => {
  try {
    return fs.writeFileSync(filenames[target], JSON.stringify(data))
  } catch (err) {
    console.err("err", err);
  }

}
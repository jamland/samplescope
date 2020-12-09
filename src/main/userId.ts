import { app } from 'electron';
import { JSONStorage } from 'node-localstorage';
import uuidv4 from 'uuid/v4';

const nodeStorage = new JSONStorage(app.getPath('userData'));

let userId: string;
if (process.env?.DEV_MODE === 'true') {
  userId = 'dev-user';
} else {
  // Retrieve the userid value, and if it's not there, assign it a new uuid.
  userId = nodeStorage.getItem('userid') || uuidv4();
}

// (re)save the userid, so it persists for the next app session.
nodeStorage.setItem('userid', userId);

export default userId;

import mongoose from 'mongoose';

export const connect_db = (connectionString: string): void => {
  mongoose.Promise = Promise;
  mongoose
    .connect(connectionString)
    .then(() => console.log('Connected to db.'))
    .catch((error) => console.log(`Error connecting to db: ${error}`));
};

export * from './actions/userActions';

import mongoose from 'mongoose';

mongoose.set('strictQuery', true);
const MONGODB_URI = process.env.MONGODB_URI;

//added this for debugging
if (!MONGODB_URI) {
  throw new Error('There is no MongoDB Connection URI');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectingMongoDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const mongoOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, mongoOptions)
      .then((mongoose) => {
        console.log('.connect 33');
        return mongoose;
      });
  }

  cached.conn = await cached.promise;
  console.log('Connected');
  return cached.conn;
};

export default connectingMongoDB;

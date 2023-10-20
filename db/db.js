import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    if (mongoose.connection?.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('MongoDB connected successfully');
      //console.log(mongoose.connection)
    }

  } catch (error) {
    console.error('MongoDB connection failed:', error);
  }
};


export default connectDB;

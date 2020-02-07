import mongoose from 'mongoose';

const Person = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

export default {
  Person,
};

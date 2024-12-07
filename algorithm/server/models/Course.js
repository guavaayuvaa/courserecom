import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  instructor: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  is_paid: {
    type: Boolean,
    default: false,
  },
  price: {
    type: String,
    default: "",
  },
  course_cover_image: {
    type: String,
  },
  ratings: {
    type: Number,
    default: 0,
  },
});

export const Course = mongoose.model('Course', CourseSchema);


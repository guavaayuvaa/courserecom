import { Course } from '../models/Course.js';

export const saveTopCourses = async (courses) => {
    try {
      for (let course of courses) {
        // Adjust the fields based on the structure of your incoming data
        const courseData = {
          title: course.title,
          description: course.headline || course.description,
          instructor: course.instructor,
          url: course.url || `https://example.com/course/${course.title.replace(/\s+/g, '-').toLowerCase()}`,
          is_paid: course.is_paid,
          price: course.price,
          course_cover_image: course.course_cover_image,
          ratings: course.ratings,
        };
  
        await Course.findOneAndUpdate(
          { title: courseData.title }, // Use title as a unique identifier
          courseData,
          { upsert: true, new: true }
        );
      }
      return { success: true, message: 'Courses saved successfully' };
    } catch (error) {
      console.error('Error saving courses:', error);
      return { success: false, message: 'Failed to save courses' };
    }
  };


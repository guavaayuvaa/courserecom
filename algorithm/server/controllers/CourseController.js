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

export const saveUserCourse = async (course, userEmail) => {
  try {
    const courseData = {
      ...course,
      userId: userEmail
    };
    console.log(courseData)

    const savedCourse = await Course.findOneAndUpdate(
      { title: courseData.title, userId: userEmail },
      courseData,
      { upsert: true, new: true }
    );

    console.log(savedCourse)

    return { success: true, message: 'Course saved successfully', course: savedCourse };
  } catch (error) {
    console.error('Error saving course:', error);
    return { success: false, message: 'Failed to save course' };
  }
};

export const getSavedCourses = async (userEmail) => {
  try {
    const savedCourses = await Course.find({ userId: userEmail });
    return { success: true, courses: savedCourses };
  } catch (error) {
    console.error('Error fetching saved courses:', error);
    return { success: false, message: 'Failed to fetch saved courses' };
  }
};


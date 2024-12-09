import React from 'react';

const SavedCourses = ({ courses }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Saved Courses</h2>
      {courses.length === 0 ? (
        <p>No saved courses yet.</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {courses.map((course, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{course.instructor}</p>
              <p className="text-sm text-gray-800 mb-4">{course.description}</p>
              <span className="text-blue-600 font-semibold">
                {course.is_paid ? `$${course.price}` : 'Free'}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedCourses;


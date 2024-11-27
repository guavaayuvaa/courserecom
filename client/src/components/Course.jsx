import React from "react";

const capitalizeWords = (str) => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

const Course = ({ courses }) => {
  return (
    <>
      {courses.map((course, index) => (
        <div
          key={index}
          className="bg-white rounded-lg p-4 h-50 flex flex-col justify-between"
        >
          <p className="text-lg font-bold text-blue-800">
            {capitalizeWords(course.title)}
          </p>
          <p className="text-sm font-semibold text-blue-400 mt-5">
            {course.headline}
          </p>
          <div className="mt-5 font-semibold text-gray-600">
            <p className="text-sm">Instructor: {course.instructor}</p>
            <p className="text-sm">Price: {course.price}</p>
            <p className="text-sm">Ratings: {course.ratings}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Course;

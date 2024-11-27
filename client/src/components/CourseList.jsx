import React from "react";

const CourseList = ({ courses, title }) => {
  return (
    <div className="course-list">
      <h2>{title}</h2>
      <ul>
        {courses.map((course, index) => (
          <li key={index} className="course-item">
            <h3>{course.title}</h3>
            <p>{course.headline}</p>
            <p>
              <strong>Instructor:</strong> {course.instructor}
            </p>
            <p>
              <strong>Price:</strong> {course.price}
            </p>
            <p>
              <strong>Rating:</strong> {course.ratings}
            </p>
            <img
              src={course.course_cover_image}
              alt={course.title}
              width="200"
            />
            <br />
            
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;

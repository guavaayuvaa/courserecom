const Course = ({ courses, onSave }) => {
  return (
    <>
      {courses.map((course) => (
        <div key={course._id} className="bg-white p-4 rounded-lg shadow-md">
          <img
            src={course.course_cover_image}
            alt={course.title}
            className="w-full h-40 object-cover rounded-md mb-4"
          />
          <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
          <p className="text-sm text-gray-600 mb-2">{course.instructor}</p>
          <p className="text-sm text-gray-800 mb-4">{course.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold">
              {course.is_paid ? `$${course.price}` : "Free"}
            </span>
            <div className="flex items-center">
              <span className="text-yellow-500 mr-1">★</span>
              <span>{course.ratings.toFixed(1)}</span>
            </div>
          </div>
          {onSave && (
            <button
              onClick={() => onSave(course)}
              className="mt-4 flex items-center justify-center w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
            >
              <span className="mr-2">&#128278;</span>
              Save Course
            </button>
          )}
        </div>
      ))}
    </>
  );
};

export default Course;


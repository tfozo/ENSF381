import React from 'react';

const EnrolledCourse = ({ course, count, onDrop }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
      <h4>{course.name}</h4>
      <p>Credit Hours: {course.creditHours}</p>
      <p>Enrolled Count: {count}</p>
      <button onClick={() => onDrop(course)}>Drop Course</button>
    </div>
  );
};

export default EnrolledCourse;

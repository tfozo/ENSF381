import React, { useState } from 'react';

const CourseItem = ({ course, onEnroll }) => {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <div 
      style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', width: '200px', textAlign: 'center' }}
      onMouseEnter={() => setShowDescription(true)}
      onMouseLeave={() => setShowDescription(false)}
    >
      <img src={course.image} alt={course.name} style={{ width: '100%' }} />
      <h3>{course.name}</h3>
      <p>{course.instructor}</p>
      {showDescription && <p>{course.description}</p>}
      <button onClick={() => onEnroll(course)}>Enroll Now</button>
    </div>
  );
};

export default CourseItem;

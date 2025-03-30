import React from 'react';
import CourseItem from './CourseItem';
import coursesData from '../data/courses';

const CourseCatalog = ({ onEnroll }) => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {coursesData.map(course => (
        <CourseItem key={course.id} course={course} onEnroll={onEnroll} />
      ))}
    </div>
  );
};

export default CourseCatalog;

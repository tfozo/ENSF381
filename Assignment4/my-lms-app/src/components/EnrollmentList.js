import React, { useEffect, useState } from 'react';
import EnrolledCourse from './EnrolledCourse';

const EnrollmentList = ({ enrolledCourses, onDrop }) => {
  const [totalCredits, setTotalCredits] = useState(0);

  useEffect(() => {
    // Calculate total credit hours
    const total = Object.values(enrolledCourses).reduce((sum, item) => sum + (item.course.creditHours * item.count), 0);
    setTotalCredits(total);

    // Save enrollment data to localStorage
    localStorage.setItem('enrolledCourses', JSON.stringify(enrolledCourses));
  }, [enrolledCourses]);

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
      <h2>Enrollment List</h2>
      {Object.values(enrolledCourses).length === 0 ? (
        <p>No courses enrolled.</p>
      ) : (
        Object.values(enrolledCourses).map(item => (
          <EnrolledCourse 
            key={item.course.id} 
            course={item.course} 
            count={item.count}
            onDrop={onDrop}
          />
        ))
      )}
      <h3>Total Credit Hours: {totalCredits}</h3>
    </div>
  );
};

export default EnrollmentList;

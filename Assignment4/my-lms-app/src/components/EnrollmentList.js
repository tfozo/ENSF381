import React, { useEffect, useState } from 'react';
import EnrolledCourse from './EnrolledCourse';

const EnrollmentList = ({ enrolledCourses, onDrop }) => {
  const [totalCredits, setTotalCredits] = useState(0);

  useEffect(() => {
    // Calculate total credit hours
    const total = Object.values(enrolledCourses).reduce(
      (sum, item) => sum + (item.course.creditHours * item.count),
      0
    );
    setTotalCredits(total);
  }, [enrolledCourses]);

  // Save enrollment data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('enrolledCourses', JSON.stringify(enrolledCourses));
  }, [enrolledCourses]);

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', minWidth: '225px' }}>
      <h2>Enrollment List</h2>
      {Object.values(enrolledCourses).length === 0 ? (
        <p>No courses enrolled.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
          {Object.values(enrolledCourses).map(item => (
            <div key={item.course.id} style={{ flex: '0 0 auto', minWidth: '225px' }}>
              <EnrolledCourse 
                course={item.course} 
                count={item.count}
                onDrop={onDrop}
              />
            </div>
          ))}
        </div>
      )}
      <h3>Total Credit Hours: {totalCredits}</h3>
    </div>
  );
};

export default EnrollmentList;

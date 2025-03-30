import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import CourseCatalog from './CourseCatalog';
import EnrollmentList from './EnrollmentList';

const CoursesPage = () => {
  const [enrolledCourses, setEnrolledCourses] = useState({});

  useEffect(() => {
    // Load enrollment data from localStorage
    const saved = localStorage.getItem('enrolledCourses');
    if (saved) {
      setEnrolledCourses(JSON.parse(saved));
    }
  }, []);

  const handleEnroll = (course) => {
    setEnrolledCourses(prev => {
      const newState = { ...prev };
      if (newState[course.id]) {
        newState[course.id].count += 1;
      } else {
        newState[course.id] = { course, count: 1 };
      }
      return newState;
    });
  };

  const handleDrop = (course) => {
    setEnrolledCourses(prev => {
      const newState = { ...prev };
      if (newState[course.id]) {
        newState[course.id].count -= 1;
        if (newState[course.id].count <= 0) {
          delete newState[course.id];
        }
      }
      return newState;
    });
  };

  return (
    <div className="courses-page">
      <Header />
      <div className="content" style={{ display: 'flex', justifyContent: 'space-around' }}>
        <CourseCatalog onEnroll={handleEnroll} />
        <EnrollmentList enrolledCourses={enrolledCourses} onDrop={handleDrop} />
      </div>
      <Footer />
    </div>
  );
};

export default CoursesPage;

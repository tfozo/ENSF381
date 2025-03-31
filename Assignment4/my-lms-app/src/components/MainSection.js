import React, { useState, useEffect } from 'react';
import coursesData from '../data/courses';
import testimonialsData from '../data/testimonials';

const MainSection = () => {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [featuredTestimonials, setFeaturedTestimonials] = useState([]);

  useEffect(() => {
    // Randomly select 3 courses
    const shuffledCourses = [...coursesData].sort(() => 0.5 - Math.random());
    setFeaturedCourses(shuffledCourses.slice(0, 3));

    // Randomly select 2 testimonials
    const shuffledTestimonials = [...testimonialsData].sort(() => 0.5 - Math.random());
    setFeaturedTestimonials(shuffledTestimonials.slice(0, 2));
  }, []);

  return (
    <main style={{ padding: '20px', textAlign: 'center', backgroundColor: '#f4f4f4' }}>
      <section id="about">
        <h2>About LMS</h2>
        <p>The Learning Management System (LMS) helps students and instructors manage courses, quizzes, and track performance efficiently.</p>

      </section>
      <section id="featured-courses">
        <h2>Featured Courses</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
          {featuredCourses.map(course => (
            <div key={course.id} style={{ border: '1px solid #ccc', padding: '10px', width: '200px' }}>
              <img src={require(`../${course.image}`)}  alt={course.name} style={{ width: '100%' }} />
              <h3>{course.name}</h3>
              <p>{course.instructor}</p>
            </div>
          ))}
        </div>
      </section>
      <section id="testimonials" style={{ marginTop: '20px' }}>
        <h2>Testimonials</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
          {featuredTestimonials.map((testimonial, index) => (
            <div key={index} style={{ border: '1px solid #ccc', padding: '10px', width: '250px' }}>
              <p><strong>{testimonial.studentName}</strong></p>
              <p>{testimonial.review}</p>
              <p>{'★'.repeat(testimonial.rating) + '☆'.repeat(5 - testimonial.rating)}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default MainSection;

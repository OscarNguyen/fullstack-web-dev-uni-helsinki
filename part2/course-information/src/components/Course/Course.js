import React from 'react';
import Content from '../Content/Content';
import Header from '../Header/Header';
import Total from '../Total/Total';

const Course = ({ course }) => {
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

export default Course;

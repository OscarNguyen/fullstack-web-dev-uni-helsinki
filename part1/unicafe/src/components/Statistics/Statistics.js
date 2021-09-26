import React from 'react';
import Statistic from '../Statistic/Statistic';

const Statistics = ({ good, neutral, bad }) => {
  let total = good + neutral + bad;
  let result = null;
  let average = good !== 0 && neutral !== 0 && bad !== 0 ? ((good * 1 + neutral * 0 - bad * 1) / total).toFixed(1) : 0;
  let positive = good !== 0 ? `${((good / total) * 100).toFixed(1)}%` : 0;

  if (good !== 0 || neutral !== 0 || bad !== 0) {
    result = (
      <table>
        <tbody>
          <Statistic text="Good" value={good} />
          <Statistic text="Neutral" value={neutral} />
          <Statistic text="Bad" value={bad} />
          <Statistic text="Total" value={total} />
          <Statistic text="Average" value={average} />
          <Statistic text="Positive" value={positive} />
        </tbody>
      </table>
    );
  } else {
    result = <p> No feedback is given</p>;
  }
  return (
    <>
      <h1>Statistics</h1>
      {result}
    </>
  );
};

export default Statistics;

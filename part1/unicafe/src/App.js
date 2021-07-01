import React, { useState } from 'react';
import Button from './components/Button/Button';
import Statistics from './components/Statistics/Statistics';

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div style={{ padding: '16px' }}>
      <h1>Give Feedback</h1>

      <Button clickHandler={() => setGood(good + 1)}>good</Button>
      <Button clickHandler={() => setNeutral(neutral + 1)}>neutral</Button>
      <Button clickHandler={() => setBad(bad + 1)}>bad</Button>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;

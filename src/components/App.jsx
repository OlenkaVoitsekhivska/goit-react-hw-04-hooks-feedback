import { useState } from 'react';
import Statistics from './Statistics/Statistics';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Section from './Section/Section';
import Notification from './Notification/Notification';

function App() {
  const [options, setOptions] = useState({ good: 0, neutral: 0, bad: 0 });

  const processClick = e => {
    let key = e.target.id;
    setOptions(options => ({ ...options, [key]: options[key] + 1 }));
  };

  const countTotalFeedback = () => {
    return Object.values(options).reduce((prevVal, currentVal) => {
      return prevVal + currentVal;
    }, 0);
  };

  const countPositiveFeedbackPercentage = () => {
    let total = countTotalFeedback();
    return Math.round((options.good * 100) / total);
  };

  let stateProps = Object.keys(options);
  let total = countTotalFeedback();

  return (
    <>
      <Section
        title="Please leave feedback"
        children={
          <FeedbackOptions
            options={stateProps}
            onLeaveFeedback={processClick}
          />
        }
      />

      <Section title="Statistics">
        {total ? (
          <Statistics
            good={options.good}
            neutral={options.neutral}
            bad={options.bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        ) : (
          <Notification message="No feedback" />
        )}
      </Section>
    </>
  );
}

export default App;

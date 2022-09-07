import React from 'react';
import './GoalList.css';

const GoalList = props => {
  // Dev tools on web, you could see the data
  console.log(props.goals);

  // return () is for proper syntax Javascript
  return (
      <ul className="goal-list">
        {props.goals.map(goal => {
          return <li key={goal.id}>{goal.text}</li>;
        })}
      </ul>
  );
};

export default GoalList
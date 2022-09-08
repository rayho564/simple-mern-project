// use useState to manage the state of props to update
import React, { useState } from 'react';

// This also works the same above
// class App extends React.Component {
//   render () {
//     return <h1 title="This works!">Hi, <span>this</span> is ReactJS</h1>;
//     // return React.createElement('h1', {}, 'Hi, this is React');
//   }
// }

// const App = () => {
//   // Same results
//     // return <h1>A React App!</h1>;
//     // Learning from docs, it's better to create this in it's own class,
//     // but I'll continue following the guide
//   return React.createElement('h1', {}, 'Hi, this is React');
// };

// Injects the App.css style into this file
import './App.css'
// Injects the GoalList component to be allowed to be used below
import GoalList from './components/GoalList/GoalList';
import NewGoal from './components/NewGoal/NewGoal';


const App = () => {
  // first param, the initial state of variables
  // second param, a function to update the state and rerender (usually begins with set)
  const [courseGoals, setCourseGoals] = useState([
    {id: 'cg1', text: 'Finish the Course'},
    {id: 'cg2', text: 'Learn all about the Course Main Topic'},
    {id: 'cg3', text: 'Help other students in the Course Q&A'},
  ]);

  const addNewGoalHandler = newGoal => {
    // be careful with state updates as it's handled by react at certain timings
      // if there's a bunch of stuff going on then there could be a lag of a few millis
    // currently using concat cause setCourseGoals needs a new array to update
    // setCourseGoals(courseGoals.concat(newGoal));

    // this handles it better as the state update will depend on if the previous state data changes
    // setCourseGoals((prevCourseGoals) => {
    //   return prevCourseGoals.concat(newGoal);
    // });
    // can be shortened to since there's only one expression
    setCourseGoals(prevCourseGoals => prevCourseGoals.concat(newGoal));
  };

  // Pass functions down to component to handle the adding of the name then the handler pushes to courseGoals
  return (
  <div className="course-goals">
    <h2> Course Goals</h2>
    <NewGoal onAddGoal={addNewGoalHandler} />
    <GoalList goals={courseGoals}/>
  </div>
  );
}

export default App;

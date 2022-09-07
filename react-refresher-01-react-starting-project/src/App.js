import React from 'react';

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
  const courseGoals = [
    {id: 'cg1', text: 'Finish the Course'},
    {id: 'cg2', text: 'Learn all about the Course Main Topic'},
    {id: 'cg3', text: 'Help other students in the Course Q&A'},
  ];

  return <div className="course-goals">
    <h2> Course Goals</h2>
    <NewGoal />
    <GoalList goals={courseGoals}/>
  </div>
}

export default App;

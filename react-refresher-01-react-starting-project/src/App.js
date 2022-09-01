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
import GoalList from './components/GoalList';

const App = () => {
  return <div className="course-goals">
    <h2> Course Goals</h2>
    <GoalList />
  </div>
}

export default App;

import React from 'react'
import './NewGoal.css';


// OnDefault a request is sent to the server to reload the page when a button of type submit is clicked in a form.
// Not what we want though
// const NewGoal = () => {
//     return (
//     <form className="new-goal">
//         <input type="text"/>
//         <button type="submit">Add Goal</button>
//     </form>
//     );
// };

const NewGoal = () => {
    const addGoalHandler = event => {
        event.preventDefault();

        const newGoal = {
            id: Math.random().toString(),
            text: 'My new goal!'
        };

        console.log(newGoal);
    };

    return (
        <form className="new-goal" onSubmit={addGoalHandler}>
            <input type="text"/>
            <button type="submit">Add Goal</button>
        </form>
    );
};


export default NewGoal;
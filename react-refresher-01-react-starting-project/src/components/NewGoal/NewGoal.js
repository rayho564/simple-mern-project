import React, {useState} from 'react'
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

const NewGoal = props => {

    const [enteredText, setEnteredText] = useState('');

    const addGoalHandler = event => {
        event.preventDefault();

        const newGoal = {
            id: Math.random().toString(),
            text: enteredText
        };

        setEnteredText('');

        // Holds a pointer to the AddNewGoalHandler. so we can execute on AddGoal
        props.onAddGoal(newGoal);
    };

    const textChangeHandler = event => {
        setEnteredText(event.target.value);
    };

    return (
        // For value,
        // we're binding the value of the input on every keystroke 
        // and we're updating the value which we then bind back to the input
        // This is called two-way binding
        <form className="new-goal" onSubmit={addGoalHandler}>
            <input type="text" value={enteredText} onChange={textChangeHandler} />
            <button type="submit">Add Goal</button>
        </form>
    );
};


export default NewGoal;
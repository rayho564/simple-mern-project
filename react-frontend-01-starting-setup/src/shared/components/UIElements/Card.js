import React from "react";

import './Card.css'
// these are presentational(dumb) components, same with UserItem and UsersList in the shared folder
// all they do is present the data
// Pages/Users.js on the other hand is a stateful(smart) component because we'll be fetching data
const Card = props => {
  return (
    <div className={`card ${props.className}`} style={props.style}>
      {props.children}
    </div>
  );
};

export default Card;

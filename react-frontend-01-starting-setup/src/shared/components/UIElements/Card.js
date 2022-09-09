import React from "react";

// current unneeded as it does not work. Added border to user_item a

const Card = (props) => {
  return (
    <div className={`card ${props.className}`} style={props.style}>
      {props.children}
    </div>
  );
};

export default Card;

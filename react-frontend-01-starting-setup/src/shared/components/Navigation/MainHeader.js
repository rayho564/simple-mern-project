import React from "react";
import './MainHeader.css'

const MainHeader = props => {
    // props.childern
    // always refer to the things you passthrough between your opening and closing tag 
    // components of the parent

    return <header className="main-header">
        {props.children}
    </header>
};

export default MainHeader;
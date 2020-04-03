import React from 'react';
import ReactDOM from "react-dom";
import CheckN from "./CheckN";
export default (subS, task, md, checkeds, ids, c) => {

    const sub = document.getElementById(subS);
    ReactDOM.unmountComponentAtNode(sub);
    
    ReactDOM.render(
        <CheckN
            checkedIndexes={checkeds}
            tasksIndexes={task}
            md={md}
            ids={ids}
            c = {c}
        />,
        sub
    )

}
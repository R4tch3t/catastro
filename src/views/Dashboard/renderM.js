import React from 'react';
import ReactDOM from "react-dom";
import CheckM from "./CheckM";
export default (subS, task, md, checkeds, ids, c) => {

    const sub = document.getElementById(subS);
    ReactDOM.unmountComponentAtNode(sub);
    
    ReactDOM.render(
        <CheckM
            checkedIndexes={checkeds}
            tasksIndexes={task}
            md={md}
            ids={ids}
            c = {c}
        />,
        sub
    )

}
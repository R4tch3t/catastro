import React from 'react';
import ReactDOM from "react-dom";
import CheckI from "./CheckI";
export default (subS, task, md, checkeds, strsa, strsb, ids, c) => {

    const sub = document.getElementById(subS);
    ReactDOM.unmountComponentAtNode(sub);
    
    ReactDOM.render(
        <CheckI
            checkedIndexes={checkeds}
            tasksIndexes={task}
            md={md}
            strsa={strsa}
            strsb={strsb}
            ids={ids}
            c = {c}
        />,
        sub
    )

}
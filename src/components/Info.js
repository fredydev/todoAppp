import React from "react";

export default function Infos(props){
    let itemLeft = props.tasks.filter(item=>!item.done).length
    return(
        <div className="info">
        <div className="totalItem">{itemLeft} {itemLeft>1?" items left":" item left"}</div>
        <button onClick={props.clearCompleted} className="clear">clear completed</button>
        </div>
    );
} 
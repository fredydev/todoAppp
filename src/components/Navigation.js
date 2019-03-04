import React from "react";

export default function Navigation(props){
    return(
        <nav className="nav-bar">
            <ul className="menu">
                <li  className="item"><button value="all" onClick={props.handleStatus} style={props.status==="all"?{background: "#e66d1ce6 "}: null}><span className="pop">all</span></button></li>
                <li className="item"><button value="active" onClick={props.handleStatus} style={props.status==="active"?{background: "#e66d1ce6 "}: null}>active</button></li>
                <li className="item"><button value="completed" onClick={props.handleStatus} style={props.status==="completed"?{background: "#e66d1ce6 "}: null}>completed</button></li>
            </ul>
        </nav>
    );
}
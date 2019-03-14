import React from "react";

export default function Navigation(props){
    return(
        <nav className="nav-bar">
            <ul className="menu">
                <li  className="item"><button value="all" onClick={props.handleView} style={props.view==="all"?{background: "#e66d1ce6 ",color:"white"}: null}><span className="pop">all</span></button></li>
                <li className="item"><button value="active" onClick={props.handleView} style={props.view==="active"?{background: "#e66d1ce6 ",color:"white"}: null}>active</button></li>
                <li className="item"><button value="completed" onClick={props.handleView} style={props.view==="completed"?{background: "#e66d1ce6 ",color:"white"}: null}>completed</button></li>
            </ul>
        </nav>
    );
}
import React from "react";

export default function InputButton(props){
    return(
        <div className="wrapper">
            {props.errorMessage && <div className="error">{props.errorMessage}</div>}
            <input value={props.input}  onChange={props.handleChange} onBlur={props.handleError}/>
            <button className="add-button" onClick={props.addItem}>Ajouter</button>
        </div>
    );
}

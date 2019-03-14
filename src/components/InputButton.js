import React from "react";

export default class InputButton extends React.Component{
    componentDidMount() {
        document.addEventListener("keydown",this.keyp)
      }
      componentWillUnmount() {
        document.removeEventListener("keydown",this.keyp)
      }
      keyp =(e)=>{
        if(e.keyCode===13){
            this.props.ajouter()
        }
      }
      
    render(){
        return(
        <div className="wrapper">
            <input value={this.props.input} placeholder="What needs to be done ?" onChange={this.props.handleChange} onBlur={this.props.handleError}/>
            <button className="add-button" onClick={this.props.ajouter}>Ajouter</button>
        </div>
    )
    }
    ;
}

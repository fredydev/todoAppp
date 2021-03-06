import React from "react";

export default class PlayGround extends React.Component{
    constructor(props){
        super(props);
        this.state={
            thv: false,
            selectedItem: null
        }
    }
    onmouseover= (e)=>{
        e.preventDefault()
        const target = e.currentTarget;
        let cible = target.querySelector(".task-handler")
        this.setState({selectedItem: target });
        cible.classList.add("tsk-hdl-viz")
        target.classList.add("item-wrapper-bg")
    }
    onMouseOut = (e)=>{
        e.preventDefault();
        const elem = this.state.selectedItem
        let cible = elem.querySelector(".task-handler")
        this.state.selectedItem.classList.remove("item-wrapper-bg")
        cible.classList.remove("tsk-hdl-viz")
    }
    render(){
        console.log(this.props.tasks)
        const all = this.props.tasks.map(item=>{
        
            return(
                <div className="item" key={item.id}  >
                {this.props.selectedTask===item.id ? <div className="wrapper"  /*onMouseOut={this.taskHandlerVisibility}*/ >
                        <input value={this.props.input}  onChange={this.props.handleChange}/>
                        <button className="add-button" onClick={()=>this.props.saveEdition(item.id)}>save</button>
                    </div>:
                <div className="item-wrapper" key={item.id} onMouseOver={this.onmouseover} onMouseOut={this.onMouseOut}>
                   
                    <div className="task" >

                        <div style={item.done ?{color: "green"}:null } className="fa fa-check" onClick={()=>this.props.completeTask(item.id)}><i></i></div>
                        <div className="task-name">{item.taskName}</div>
                    </div>
                    <div className="task-handler"  >
                        <span className="edit fa fa-edit" onClick={()=>this.props.handleEdit(item.id)}></span>
                        <span onClick={()=>this.props.deleteItem(item.id)} className="delete fa fa-window-close"></span>
                    </div>
                </div>}
                </div>
            );
        })
        const active = this.props.tasks.filter(e=>!e.done).map(item=>{
            return(
                <div className="item" key={item.id}>
                {this.props.selectedTask===item.id ? <div className="wrapper" >
                        <input value={this.props.input}  onChange={this.props.handleChange}/>
                        <button className="add-button" onClick={()=>this.props.edit(item.id)}>save</button>
                    </div>:
                <div className="item-wrapper" key={item.id} onMouseOver={this.onmouseover} onMouseOut={this.onMouseOut}>
                   
                    <div className="task" >
                        <div style={item.done ?{color: "green"}: null} className="fa fa-check" onClick={()=>this.props.completeTask(item.id)}></div>
                        <div className="task-name">{item.taskName}</div>
                    </div>
                    <div className="task-handler" >
                        <span className="edit fa fa-edit" onClick={()=>this.props.handleEdit(item.id)}></span>
                        <span onClick={()=>this.props.deleteItem(item.id)} className="delete fa fa-window-close"></span>
                    </div>
                </div>}
                </div>
            );
        })
        const completed = this.props.tasks.filter(e=>e.done).map(item=>{
            return(
                <div className="item" key={item.id}>
                {this.props.selectedTask===item.id ? <div id={"item"+item.id} className="wrapper" >
                        <input value={this.props.input}  onChange={this.props.handleChange}/>
                        <button className="add-button" onClick={()=>this.props.saveEdition(item.id)}>save</button>
                    </div>:
                <div className="item-wrapper" key={item.id} onMouseOver={this.onmouseover} onMouseOut={this.onMouseOut}>
                   
                    <div className="task" >
                        <div style={item.done ?{color: "green"}: null} className="fa fa-check" onClick={()=>this.props.completeTask(item.id)}></div>
                        <div className="task-name">{item.taskName}</div>
                    </div>
                    <div className="task-handler" >
                        <span className="edit fa fa-edit" onClick={()=>this.props.handleEdit(item.id)}></span>
                        <span onClick={()=>this.props.deleteItem(item.id)} className="delete fa fa-window-close"></span>
                    </div>
                </div>}
                </div>
            );
        })
        return(
            <div className="playground">
                {this.props.view==="all" && all}
                {this.props.view==="active" && active}
                {this.props.view==="completed" && completed}
            </div>
        );
    }
    
}
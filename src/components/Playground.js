import React from "react";

export default function PlayGround(props){
    const all = props.tasks.map(item=>{
        
        return(
            <>
            {props.selectedTask===item.id ? <div className="wrapper" >
                    <input value={props.input}  onChange={props.handleChange}/>
                    <button className="add-button" onClick={()=>props.edit(item.id)}>save</button>
                </div>:
            <div className="item-wrapper" key={item.id}>
               
                <div className="task" >
                    <div style={item.done ?{color: "green"}: null} className="fa fa-check" onClick={()=>props.completeTask(item.id)}></div>
                    <div className="task-name">{item.taskName}</div>
                </div>
                <div className="task-handler" >
                    <span className="edit fa fa-edit" onClick={()=>props.handleEdit(item.id)}></span>
                    <span className="delete fa fa-window-close"></span>
                </div>
            </div>}
            </>
        );
    })
    const active = props.tasks.filter(e=>!e.done).map(item=>{
        return(
            <>
            {props.selectedTask===item.id ? <div className="wrapper" >
                    <input value={props.input}  onChange={props.handleChange}/>
                    <button className="add-button" onClick={()=>props.edit(item.id)}>save</button>
                </div>:
            <div className="item-wrapper" key={item.id}>
               
                <div className="task" >
                    <div style={item.done ?{color: "green"}: null} className="fa fa-check" onClick={()=>props.completeTask(item.id)}></div>
                    <div className="task-name">{item.taskName}</div>
                </div>
                <div className="task-handler" >
                    <span className="edit fa fa-edit" onClick={()=>props.handleEdit(item.id)}></span>
                    <span className="delete fa fa-window-close"></span>
                </div>
            </div>}
            </>
        );
    })
    const completed = props.tasks.filter(e=>e.done).map(item=>{
        return(
            <>
            {props.selectedTask===item.id ? <div className="wrapper" >
                    <input value={props.input}  onChange={props.handleChange}/>
                    <button className="add-button" onClick={()=>props.edit(item.id)}>save</button>
                </div>:
            <div className="item-wrapper" key={item.id}>
               
                <div className="task" >
                    <div style={item.done ?{color: "green"}: null} className="fa fa-check" onClick={()=>props.completeTask(item.id)}></div>
                    <div className="task-name">{item.taskName}</div>
                </div>
                <div className="task-handler" >
                    <span className="edit fa fa-edit" onClick={()=>props.handleEdit(item.id)}></span>
                    <span className="delete fa fa-window-close"></span>
                </div>
            </div>}
            </>
        );
    })
    return(
        <div className="playground">
            {props.status==="all" && all}
            {props.status==="active" && active}
            {props.status==="completed" && completed}
        </div>
    );
}
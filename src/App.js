import React, { Component } from 'react';
import './App.css';
import InputButton from './components/InputButton';
import PlayGround from './components/Playground';
import Navigation from './components/Navigation';
import Infos from './components/Info';
import {connect} from "react-redux";
import {addTask,delTask, changeView,completeTask,clearCompleted,editTask} from "./redux/ActionCreators"

const mapStateToProps = (state)=>{
  return{
    tasks: state.tasks,
    view: state.view
  }
}
const mapDispatchToProps = (dispatch)=>{
  return{
    addNewItem: (taskName)=>{
      dispatch(addTask(taskName))
    },
    delItem: (id)=>{
      dispatch(delTask(id))
    },
    completeTask: (id)=>{
      dispatch(completeTask(id))
    },
    clearCompleted:()=>{
      dispatch(clearCompleted())
    },
    editTask: (id,newName)=>{
      dispatch(editTask(id,newName))
    },
    newView:(view)=>{
      dispatch(changeView(view))
    }
  }
}
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      input: "",
      inputEdit: "",
      selectedTask: null
    }
  }
  handleChange = (e)=>{
    this.setState({input: e.target.value})
  }
  handleInput = (e)=>{
    this.setState({inputEdit: e.target.value})
  }
  
  addItem = ()=>{
    let tempName = this.state.input;
    if(tempName.length===0){
      this.setState({errorMessage: "entrer du texte"})
    }
    else{
      this.props.addNewItem(tempName)
      this.setState({
        input: ""
      });
    }
    

  }
  
  makeItemEditorVisible = (id)=>{
    let tempTasks=[...this.props.tasks];
    let elemToEdit = tempTasks[id];
    this.setState({
      selectedTask: id,
      inputEdit: elemToEdit.taskName 
    })
  }
  completeTask = (id)=>{
    this.props.completeTask(id);
  }
  saveEdition = (id)=>{
    let newName=this.state.inputEdit;
    this.props.editTask(id,newName)
    this.setState({
      input: "",
      selectedTask:null
    })

  }
  deleteTask = (id)=>{
    this.props.delItem(id)
  }
  clearCompleted = ()=>{
    this.props.clearCompleted();
  }
  handleView = (e)=>{
    this.props.newView(e.target.value) ;
  }
  render() {
    console.log(this.props.tasks)
    return (
      <div className="App">
        <InputButton input={this.state.input} handleChange={this.handleChange} ajouter={this.addItem}  />
        <Navigation handleView={this.handleView} view={this.props.view}/>
        <PlayGround tasks={this.props.tasks}
                    view={this.props.view}
                    handleEdit={this.makeItemEditorVisible} 
                    saveEdition={this.saveEdition} 
                    input={this.state.inputEdit} 
                    handleChange={this.handleInput}
                    completeTask={this.completeTask}
                    selectedTask={this.state.selectedTask}
                    deleteItem = {this.deleteTask}/>
        <Infos tasks={this.props.tasks} clearCompleted={this.clearCompleted}/>

      </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);

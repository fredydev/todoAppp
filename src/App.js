import React, { Component } from 'react';
import './App.css';
import InputButton from './components/InputButton';
import PlayGround from './components/Playground';
import Navigation from './components/Navigation';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      input: "",
      tasks:[],
      status: "all",
      inputEdit: "",
      selectedTask: null,
      
    }
  }
  handleChange = (e)=>{
    this.setState({input: e.target.value})
  }
  handleInput = (e)=>{
    this.setState({inputEdit: e.target.value})
  }
  handleError = ()=>{
    this.setState({errorMessage: null})
  }
  addItem = ()=>{
    let tempName = this.state.input;
    if(tempName.length===0){
      this.setState({errorMessage: "entrer du texte"})
    }
    else{
      let item = {
        id: this.state.tasks.length,
        taskName: this.state.input,
        done: false,
      };
      let tempTask = [...this.state.tasks, item];
      this.setState({
        tasks: tempTask,
        input: ""
      });
    }
    

  }
  getElement = (id)=>{
    let tempTasks=[...this.state.tasks];
    return tempTasks.filter(item=>item.id===id)[0];
  }
  handleEdit = (id)=>{
    let el = this.getElement(id);
    let tempTasks=[...this.state.tasks];
    let index = tempTasks.indexOf(el);
    let elemToEdit = tempTasks[index];
    elemToEdit.editing= true;
    this.setState({
      selectedTask: id,
      tasks: tempTasks,
      inputEdit: elemToEdit.taskName 
    })
  }
  completeTask = (id)=>{
    let el = this.getElement(id);
    let tempTasks=[...this.state.tasks];
    let index = tempTasks.indexOf(el);
    let elemToEdit = tempTasks[index];
    elemToEdit.done= !elemToEdit.done;
    this.setState({
      tasks: tempTasks,
    })
  }
  edit = (id)=>{
    let el = this.getElement(id);
    let tempTasks=[...this.state.tasks];
    let index = tempTasks.indexOf(el);
    let elemToEdit = tempTasks[index];
    elemToEdit.taskName=this.state.inputEdit;
    elemToEdit.editing= false
    this.setState({
      tasks: tempTasks,
      input: "",
      selectedTask:null
      
    })

  }
  handleStatus = (e)=>{
    this.setState({status: e.target.value})
  }
  render() {
    
    return (
      <div className="App">
        <InputButton input={this.state.input} handleChange={this.handleChange} addItem={this.addItem} errorMessage={this.state.errorMessage} handleError={this.state.handleError}/>
        <Navigation handleStatus={this.handleStatus} status={this.state.status}/>
        <PlayGround tasks={this.state.tasks}
                    status={this.state.status}
                    handleEdit={this.handleEdit} 
                    edit={this.edit} 
                    input={this.state.inputEdit} 
                    handleChange={this.handleInput}
                    completeTask={this.completeTask}
                    selectedTask={this.state.selectedTask}/>

      </div>
    );
  }
}

export default App;

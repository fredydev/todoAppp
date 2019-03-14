import {TASKS} from "../shared/TASKS";
import * as ActionTypes from "./ActionTypes";

export const Tasks = (state=TASKS,action)=>{
    switch(action.type){
        case ActionTypes.ADD_TASK:
            let task = action.payload;
            task.id = state.length;
            task.done=false
            return [...state,task];
        case ActionTypes.DEL_TASK:
            let id = action.id
            let tempTask = [...state]
            let remItemArr = tempTask.filter(item=>tempTask.indexOf(item)!==id);
            remItemArr.forEach((item,index)=>{
                item.id=index;
            })
            return remItemArr
        case ActionTypes.COMPLETE_TASK:
            tempTask = [...state]
            tempTask[action.id].done = !tempTask[action.id].done;
            return tempTask ;
        case ActionTypes.CLEAR_COMPLETED:
            return [...state].filter(item=>!item.done);
        case ActionTypes.EDIT:
            let tempTasks=[...state];
            let elemToEdit = tempTasks[action.id];
            elemToEdit.taskName=action.newName;
            return tempTasks
        default:
            return state;
    }
} 
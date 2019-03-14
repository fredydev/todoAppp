import * as ActionTypes from "./ActionTypes";

export const addTask = (taskName)=>{
    return{
        type: ActionTypes.ADD_TASK,
        payload:{
            taskName
        }
    }
}
export const delTask =(id)=>{
    return{
        type: ActionTypes.DEL_TASK,
        id
    }
}
export const completeTask = (id)=>{
    return{
        type: ActionTypes.COMPLETE_TASK,
        id
    }
}
export const clearCompleted = ()=>{
    return{
        type: ActionTypes.CLEAR_COMPLETED
    }
}
export const editTask = (id,newName)=>{
    return{
        type: ActionTypes.EDIT,
        id,
        newName
    }
}
export const changeView = (view)=>{
    return{
        type: view
    }
}
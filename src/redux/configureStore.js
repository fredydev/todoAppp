import {createStore, combineReducers} from "redux";
import {View} from "./view"
import {Tasks} from "./tasks"



export const store = createStore(combineReducers({
    view: View,
    tasks: Tasks
}))
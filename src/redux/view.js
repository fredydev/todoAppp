export const View = (state="all",action)=>{
    switch(action.type){
        case "completed":
            return "completed"
        case "active":
            return "active";
            case "all":
            return "all"
        default:
            return state;
    }
}
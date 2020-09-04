import { ADD_CLASS, DELETE_CLASS, SET_CLASSES } from "./classActionTypes";

const initialState={
    classes=[],
    error={}
}

const classReducer=(state = initialState,action)=>{
    switch (action.type) {
        
        case ADD_CLASS:
            state.classes.push(action.payload)
            return state;
            
        case DELETE_CLASS:
            const del_index=action.payload;
            const newArray=state.classes.filter((value, index)=>{return index!=del_index});
            state.classes=newArray;
            return state;
            
        case SET_CLASSES:
            state.classes=action.payload;
            return state;

        case SET_CLASS_ERROR:
            state.error=action.payload;
            return state;
        default:
            return state;
    }
}

export default classReducer;
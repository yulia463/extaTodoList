import {TaskType} from "../Todolist";
import {v1} from "uuid";


export const tasksReducer = (state: TaskType[], action: TsarType): TaskType[] => {

    switch (action.type) {
        case "REMOVE-TASK": {
            return state.filter(el=>el.id !== action.payload.id)
        }  case "ADD-TASK": {
        let task = { id: v1(), title: action.payload.title, isDone: false };
            return [...state,task]
        }
        default:
            return state
    }
}
export type TsarType = RemoveTaskACType | AddTaskACType

export type RemoveTaskACType=ReturnType<typeof removeTaskAC>
// type obj
export type AddTaskACType=ReturnType<typeof addTaskAC>


//type RemoveTaskACType=typeof removeTaskAC
// type func

export const removeTaskAC = (id:string) => {
    return{
        type:"REMOVE-TASK",
        payload:{
            id
        }
    }as const
}
export const addTaskAC = (title: string) => {
    return{
        type:"ADD-TASK",
        payload:{
            title
        }
    }as const
}
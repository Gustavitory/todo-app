import {SliceCaseReducers, createSlice} from '@reduxjs/toolkit'

type tasksProps={
    tasksList:Record<string,any>[];
}
const InitialState:tasksProps={
    tasksList:[]
}

const tasks=createSlice<tasksProps,SliceCaseReducers<typeof InitialState>>({
    name:'tasks',
    initialState:InitialState,
    reducers:{
        createTaskAction(state,action){
            return {
                ...state,
                tasksList:[...state.tasksList,action.payload]
            }
        },
        deleteTask(state,action){
                let list=[...state.tasksList]
                let index=list.findIndex((el)=>el.id===action.payload);
                list.splice(index,1);
            return {
                ...state,
                tasksList:list
            }
        },
        editTask(state,action){
            // console.log(action.payload)
            let list=[...state.tasksList]
            let index=list.findIndex((el)=>el.id===action.payload.taskId);
            let newObject=Object.assign({...list[index]},{...action.payload.props});
            list[index]=newObject;
            // console.log(newObject);
            return {
                ...state,
                tasksList:list
            }
        }
        // filtterPending(state,action){
        //     return {
        //         ...state,
        //         pendingTasks:state.pendingTasks.filter((el)=>action.payload(el))
        //     }
        // },
        // filtterInProgress(state,action){
        //     return {
        //         ...state,
        //         inProgressTasks:state.inProgressTasks.filter((el)=>action.payload(el))
        //     }
        // },
        // filtterSuccess(state,action){
        //     return {
        //         ...state,
        //         successTasks:state.successTasks.filter((el)=>action.payload(el))
        //     }
        // },
    }
})

export const {createTaskAction,deleteTask,editTask}=tasks.actions;
export default tasks.reducer;
import {SliceCaseReducers, createSlice} from '@reduxjs/toolkit'

type tasksProps={
    tasksList:Record<string,any>[];
    // pendingTasks: Record<string,any>[];
    // inProgressTasks: Record<string,any>[];
    // successTasks: Record<string,any>[];
    // canceledTasks: Record<string,any>[];
    // expiredTasks: Record<string,any>[];
    metricsData: Record<string,any>[];
}
const InitialState:tasksProps={
    tasksList:[],
    // pendingTasks:[],
    // inProgressTasks:[],
    // successTasks:[],
    // canceledTasks:[],
    // expiredTasks:[],
    metricsData:[],
}

const tasks=createSlice<tasksProps,SliceCaseReducers<typeof InitialState>>({
    name:'tasks',
    initialState:InitialState,
    reducers:{
        // setTasks(state,action){
        //     return {
        //         // ...state,
        //         // pendingTasks:action.payload.pendingTasks,
        //         // inProgressTasks:action.payload.inProgressTasks,
        //         // successTasks:action.payload.successTasks,
        //         // canceledTasks:action.payload.canceledTasks,
        //         // expiredTasks:action.payload.expiredTasks
        //     }
        // },
        setMetrics(state,action){
            return {
                ...state,
                metricsData:action.payload
            }
        },
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
        changeStatus(state,action){
            let list=[...state.tasksList]
            let index=list.findIndex((el)=>el.id===action.payload.id);
            list[index].status=action.payload.status;
            return {
                ...state,
                tasksList:list
            }
        },
        editTask(state,action){
            let list=[...state.tasksList]
            let index=list.findIndex((el)=>el.id===action.payload.id);
            list[index].status=action.payload;
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

export const {setMetrics,createTaskAction,deleteTask,changeStatus,editTask}=tasks.actions;
export default tasks.reducer;
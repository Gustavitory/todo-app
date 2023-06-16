import {SliceCaseReducers, createSlice} from '@reduxjs/toolkit'

type tasksProps={
    pendingTasks: Record<string,any>[];
    inProgressTasks: Record<string,any>[];
    successTasks: Record<string,any>[];
    canceledTasks: Record<string,any>[];
    expiredTasks: Record<string,any>[];
    metricsData: Record<string,any>[];
}
const InitialState:tasksProps={
    pendingTasks:[],
    inProgressTasks:[],
    successTasks:[],
    canceledTasks:[],
    expiredTasks:[],
    metricsData:[],
}

const tasks=createSlice<tasksProps,SliceCaseReducers<typeof InitialState>>({
    name:'tasks',
    initialState:{
        pendingTasks:[],
        inProgressTasks:[],
        successTasks:[],
        canceledTasks:[],
        expiredTasks:[],
        metricsData:[],
    },
    reducers:{
        setTasks(state,action){
            return {
                ...state,
                pendingTasks:action.payload.pendingTasks,
                inProgressTasks:action.payload.inProgressTasks,
                successTasks:action.payload.successTasks,
                canceledTasks:action.payload.canceledTasks,
                expiredTasks:action.payload.expiredTasks
            }
        },
        setMetrics(state,action){
            return {
                ...state,
                metricsData:action.payload
            }
        },
        createTaskAction(state,action){
            return {
                ...state,
                pendingTasks:[...state.pendingTasks,action.payload]
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

export const {setTasks,setMetrics,createTaskAction}=tasks.actions;
export default tasks.reducer;
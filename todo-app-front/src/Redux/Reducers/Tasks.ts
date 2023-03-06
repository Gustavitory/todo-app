import {createSlice} from '@reduxjs/toolkit'


const tasks=createSlice({
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

export const {setTasks,setMetrics}=tasks.actions;
export default tasks.reducer;
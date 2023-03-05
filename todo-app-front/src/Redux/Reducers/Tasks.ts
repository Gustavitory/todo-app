import {createSlice} from '@reduxjs/toolkit'


const tasks=createSlice({
    name:'tasks',
    initialState:{
        allTasks:{
            pendingTasks:[],
            inProgressTasks:[],
            successTasks:[],
            canceledTasks:[],
            expiredTasks:[]
        },
        metricsData:[],
    },
    reducers:{
        setTasks(state,action){
            return {
                ...state,
                allTasks:action.payload
            }
        },
        setMetrics(state,action){
            return {
                ...state,
                metricsData:action.payload
            }
        },
    }
})

export const {setTasks,setMetrics}=tasks.actions;
export default tasks.reducer;
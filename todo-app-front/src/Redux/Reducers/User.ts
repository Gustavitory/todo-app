import {createSlice} from '@reduxjs/toolkit'


const user=createSlice({
    name:'user',
    initialState:{
        userName:''
    },
    reducers:{
        setName(state,action){
            return {
                ...state,
                userName:action.payload
            }
        }
    }
})

export const {setName}=user.actions;
export default user.reducer;
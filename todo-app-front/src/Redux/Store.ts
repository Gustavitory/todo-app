import { configureStore } from "@reduxjs/toolkit";
import tasks from './Reducers/Tasks';
import user from './Reducers/User';

const store = configureStore({
    reducer:{
        tasks,
        user
    }
})
export default store

export type RootState=ReturnType<typeof store.getState>
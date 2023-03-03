import { configureStore } from "@reduxjs/toolkit";
import tasks from './Reducers/Tasks';
import user from './Reducers/User';


export default configureStore({
    reducer:{
        tasks,
        user
    }
})
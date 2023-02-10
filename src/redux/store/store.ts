import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../slices/user.slices";
const store = configureStore({
    reducer:{
        user: userSlice
    }
})
export type RootState = ReturnType<typeof store.getState>
export default store;
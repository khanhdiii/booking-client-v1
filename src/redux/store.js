import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./authSlice"
import userReducer from "./userSlice"
import destinationReducer from "./destinationSlice"
import searchReducer from "./searchSlice"


export default configureStore({
    reducer: {
        search: searchReducer,
        auth: authReducer,
        users: userReducer,
    }
})
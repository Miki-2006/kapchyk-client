import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlices'

export default configureStore({
    reducer: {
        user: userReducer
    }
})
import {createSlice} from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userNumber: '',
        isAuthenticated: false
    },
    reducers: {
        setUser: (state, action) => {
            state.userNumber = action.payload.userNumber
            state.isAuthenticated = true
        },
        logout: state => {
            state.userNumber = ''
            state.isAuthenticated = false
        }
    }
})

export const {setUser, logout} = userSlice.actions

export default userSlice.reducer
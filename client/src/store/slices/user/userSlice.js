import {createSlice} from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'userSlice',
    initialState: {
        email: '',
        isLogged: null,
        isAdmin: false
        
    },
    reducers: {
        loginUser: (state, action) => {
            return {
                ...state,
                id: action.payload.id,
                email: action.payload.email,
                isLogged: true,
                isAdmin: action.payload.isAdmin
            }
        },
        logoutUser: (state) => {
            return {
                ...state,
                email: '',
                isLogged: null,
                isAdmin: null
            }
        }
    }
})

export const {loginUser, logoutUser} = userSlice.actions

export default userSlice.reducer
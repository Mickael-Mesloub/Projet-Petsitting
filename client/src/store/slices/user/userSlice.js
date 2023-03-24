import {createSlice} from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'userSlice',
    initialState: {
        isLogged: null,
        isAdmin: false
    },
    reducers: {
        loginUser: (state, action) => {
            return {
                ...state,
                _id: action.payload._id,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                phone: action.payload.phone,
                avatar: action.payload.avatar,
                email: action.payload.email,
                isLogged: true,
                isAdmin: action.payload.isAdmin
            }
        },
        logoutUser: (state) => {
            return {
                ...state,
                _id: '',
                email: '',
                isLogged: null,
                isAdmin: null
            }
        }
    }
})

export const {loginUser, logoutUser} = userSlice.actions

export default userSlice.reducer
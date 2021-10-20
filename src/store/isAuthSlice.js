import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { setUser } from "./userSlice"
import { login, registration, logout } from "../services/authService"
import { setData, getUserData } from "./dataSlice"
import {setLists} from "./listsSlice"
import { setIsEmailActivated } from "./IsEmailActivatedSlice"
import { API_URL } from "../http"

export const loginApi = createAsyncThunk(
    "isAuth/login",
    async (payload, { dispatch }) => {
        try {
            const { email, password } = payload
            const response = await login(email, password)
            localStorage.setItem("token", response.data.accessToken)
            localStorage.setItem("refreshToken", response.data.refreshToken)
            dispatch(setUser(response.data))
            dispatch(setIsAuth(true))
            dispatch(setErrorMessage(null))
            return response.data
        } catch (e) {
            dispatch(setErrorMessage(e.response?.data?.message))
            dispatch(setIsAuth(false))
            console.log(e.response?.data?.message)
        }
    }
)

export const registrationApi = createAsyncThunk(
    "isAuth/registration",
    async (payload, { dispatch }) => {
        try {
            const { email, password } = payload
            const response = await registration(email, password)
            console.log("response", response)
            localStorage.setItem("token", response.data.accessToken)
            localStorage.setItem("refreshToken", response.data.refreshToken)
            dispatch(setUser(response.data))
            dispatch(setIsAuth(true))
            dispatch(setErrorMessage(null))
            return response.data
        } catch (e) {
            dispatch(setErrorMessage(e.response?.data?.message))
            dispatch(setIsAuth(false))
            console.log(e.response?.data?.message)
        }
    }
)

export const logoutApi = createAsyncThunk(
    "isAuth/logout",
    async (payload, { dispatch }) => {
        try {
            const refreshToken = localStorage.getItem("refreshToken")
            dispatch(setUser(null))
            dispatch(setData(null))
            dispatch(setLists(null))
            dispatch(setIsEmailActivated(null))
            dispatch(setErrorMessage(null))
            dispatch(setIsAuth(false))
            const response = await logout(refreshToken)
            localStorage.removeItem("token")
            // localStorage.removeItem("refreshToken")
            
            return response.data
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }
)

export const checkAuth = createAsyncThunk(
    "isAuth/checkAuth",
    async (payload, { dispatch }) => {
        try {
            dispatch(setIsLoading(true))
            const refreshToken = localStorage.getItem("refreshToken")
            const response = await axios.post(`${API_URL}/refresh`, {
                refreshToken
            })
            localStorage.setItem("token", response.data.accessToken)
            localStorage.setItem("refreshToken", response.data.refreshToken)
            dispatch(setUser(response.data))
            dispatch(getUserData(response.data.user.id))
            dispatch(setIsAuth(true))
            dispatch(setIsLoading(false))
            return response.data
        } catch (e) {
            console.log(e.response?.data?.message)
            dispatch(setIsAuth(false))
        }
    }
)

const isAuthSlice = createSlice({
    name: "isAuth",
    initialState: { 
        isLoading: false, 
        isAuth: false, 
        errorMessage: null
    },
    reducers: {
        setIsLoading(state, action) {
            state.isLoading = action.payload
        },
        setIsAuth(state, action) {
            state.isAuth = action.payload
        },
        setErrorMessage(state, action) {
            state.errorMessage = action.payload
        }
    },
    extraReducers: {
 
    },
})

export const { setIsAuth, setIsLoading, setErrorMessage } = isAuthSlice.actions

export default isAuthSlice.reducer

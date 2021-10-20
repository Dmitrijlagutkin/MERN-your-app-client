import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { addList, update, remove } from "../services/listService"
import { getUserData } from "./dataSlice"
import { setIsLoading } from "./isAuthSlice"

export const addNewList = createAsyncThunk(
    "lists/addList",
    async (payload, { dispatch }) => {
        
        try {
            dispatch(setIsLoading(true))
            const {listTitle, 
                date, 
                category, 
                listItem, 
                isFavorites, 
                userId}= payload
            const response = await addList(listTitle, 
                date, 
                category, 
                listItem, 
                isFavorites)
            dispatch(getUserData(userId))
            dispatch(setIsLoading(false))
            return response.data
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }
)

export const updateList = createAsyncThunk(
    "lists/updateList",
    async (payload, { dispatch }) => {
      
        try {
            dispatch(setIsLoading(true))
            const {listTitle, 
                date, 
                category, 
                listItem, 
                isFavorites, 
                id,
                userId}= payload
            const response = await update(listTitle, 
                date, 
                category, 
                listItem, 
                isFavorites,
                id)
            console.log(response.data)
            dispatch(getUserData(userId))
            dispatch(setIsLoading(false))
            return response.data
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }
)

export const deleteList = createAsyncThunk(
    "lists/deleteList",
    async (payload, { dispatch }) => {
        dispatch(setIsLoading(true))
        try {
            const {id, userId}= payload
            const response = await remove(id)
            console.log(response.data)
            dispatch(getUserData(userId))
            dispatch(setIsLoading(false))
            return response.data
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }
)

const listsSlice = createSlice({
    name: "lists",
    initialState: {
        lists: null,
        tempListItem: []
    },
    reducers: {
        setLists(state, action) {
            state.lists = action.payload
        },
        setTempListItem(state, action) {
            if(!!action.payload) {
                state.tempListItem.push(action.payload)
            } else {
                state.tempListItem = []
            }
        }
    },
    extraReducers: {

    },
})

export const { setLists, setTempListItem } = listsSlice.actions

export default listsSlice.reducer

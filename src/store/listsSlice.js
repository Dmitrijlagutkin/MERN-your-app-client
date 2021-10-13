import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { addList, update, remove } from "../services/listService"
import { getUserData } from "./dataSlice"
import { setIsLoading } from "./isAuthSlice"
import { setIsActivated } from "./IsEmailActivatedSlice"

// export const addList = createAsyncThunk(
//     "lists/addList",
//     async (id, { dispatch }) => {
//         try {
//             const response = await getData(id)
//             dispatch(setIsActivated(response.data.isActivated))
//             return response.data
//         } catch (e) {
//             console.log(e)
//         }
//     }
// )

export const addNewList = createAsyncThunk(
    "lists/addList",
    async (payload, { dispatch }) => {
        console.log("in slice", 
        payload.listTitle, 
        payload.date, 
        payload.category, 
        payload.listItem, 
        payload.isFavorites, 
        payload.userId)
        try {
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
            console.log(response.data)
            dispatch(getUserData(userId))
            return response.data
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }
)

export const updateList = createAsyncThunk(
    "lists/updateList",
    async (payload, { dispatch }) => {
        console.log("in slice", 
        payload.listTitle, 
        payload.date, 
        payload.category, 
        payload.listItem, 
        payload.isFavorites, 
        payload.id)
        try {
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
            return response.data
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }
)

export const deleteList = createAsyncThunk(
    "lists/deleteList",
    async (payload, { dispatch }) => {
        console.log("in slice", payload.id, payload.userId)
        try {
            const {id, userId}= payload
            const response = await remove(id)
            console.log(response.data)
            dispatch(getUserData(userId))
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
            state.tempListItem.push(action.payload)
        }
    },
    extraReducers: {
        // [loginApi.pending]: (state, action) => {
        //     state.isLoading = true
        // },
        // [loginApi.fulfilled]: (state, action) => {
        //     state.isLoading = false
        //     // state.isAuth = true
        // },
        // [registrationApi.pending]: (state, action) => {
        //     state.isLoading = true
        // },
        // [registrationApi.fulfilled]: (state, action) => {
        //     state.isLoading = false
        //     state.isAuth = true
        // },
        // [logoutApi.pending]: (state, action) => {
        //     state.isLoading = true
        // },
        // [logoutApi.fulfilled]: (state, action) => {
        //     state.isLoading = false
        //     state.isAuth = false
        // },
        // [checkAuth.pending]: (state, action) => {
        //     state.isLoading = true
        // },
        // [checkAuth.fulfilled]: (state, action) => {
        //     state.isLoading = false
        //     // state.isAuth = true
        // },
    },
})

export const { setLists, setTempListItem } = listsSlice.actions

export default listsSlice.reducer

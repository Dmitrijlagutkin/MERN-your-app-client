import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getData } from "../services/dataService"
import { setIsLoading } from "./isAuthSlice"
import { setIsEmailActivated } from "./IsEmailActivatedSlice"
import { setLists } from "./listsSlice"

export const getUserData = createAsyncThunk(
    "data/getData",
    async (id, { dispatch }) => {
        try {
            dispatch(setIsLoading(true))
            const response = await getData(id)
            dispatch(setIsEmailActivated(response.data.isActivated))
            dispatch(setLists(response.data.lists))
            dispatch(setIsLoading(false))
            return response.data
        } catch (e) {
            console.log(e)
        }
    }
)

const dataSlice = createSlice({
    name: "data",
    initialState: {
        // isLoading: false,
        data: null,
    },
    reducers: {
        setData(state, action) {
            state.data = action.payload
        },
    },
    extraReducers: {
        // [getUserData.pending]: (state) => {
        //     state.isLoading = true
        // },
        // [getUserData.fulfilled]: (state, action) => {
        //     if (!action.payload) {
        //         state.data = null
        //     }
        //     if (action.payload) {
        //         state.data = action.payload
        //     }

        //     state.isLoading = false
        // },
        // [getUserData.rejected]: (state, action) => {
        //     state.data = null
        //     state.isLoading = false
        // },
    },
})

export const { setData } = dataSlice.actions

export default dataSlice.reducer

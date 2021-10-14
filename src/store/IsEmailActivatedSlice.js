import { createSlice } from "@reduxjs/toolkit"

const isEmailActivatedSlice = createSlice({
    name: "isEmailActivated",
    initialState: {
        isEmailActivated: null,
    },
    reducers: {
        setIsEmailActivated(state, action) {
            state.isEmailActivated = action.payload
        },
    },
})

export const { setIsEmailActivated } = isEmailActivatedSlice.actions

export default isEmailActivatedSlice.reducer

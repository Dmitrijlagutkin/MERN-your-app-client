import { createSlice } from "@reduxjs/toolkit"

const isEmailActivatedSlice = createSlice({
    name: "isEmailActivated",
    initialState: {
        isActivated: null,
    },
    reducers: {
        setIsActivated(state, action) {
            state.isActivated = action.payload
        },
    },
})

export const { setIsActivated } = isEmailActivatedSlice.actions

export default isEmailActivatedSlice.reducer

import { createSlice } from '@reduxjs/toolkit'

export const paginationSlice = createSlice({
    name: 'pagination',
    initialState: {
        limit: 10,
        page: 0,
    },
    reducers: {
        changeLimit: (state, action) => {
            state.limit = action.payload
        },
        changePage: (state, action) => {
            state.page = action.payload
        },
    },
})

export const { changeLimit, changePage } = paginationSlice.actions

export default paginationSlice.reducer
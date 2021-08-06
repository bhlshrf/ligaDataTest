import { createSlice } from '@reduxjs/toolkit'

export const coronaSlice = createSlice({
    name: 'corona',
    initialState: {
        region: '',
        orderBy: '',
        desc: false,
    },
    reducers: {
        changeRegion: (state, action) => {
            state.region = action.payload
        },
        changeOrderBy: (state, action) => {
            state.orderBy = action.payload
        },
        toggleDesc: (state) => {
            state.desc = !state.desc
        },
    },
})

export const { changeRegion, changeOrderBy, toggleDesc } = coronaSlice.actions

export default coronaSlice.reducer
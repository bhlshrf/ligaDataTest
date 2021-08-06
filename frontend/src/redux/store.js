import { configureStore } from '@reduxjs/toolkit'

import coronaReducer from './coronaSlice';
import paginationReducer from './paginationSlice';
import apiReducer from './apiSlice';


export const store = configureStore({
    reducer: {
        corona: coronaReducer,
        pagination: paginationReducer,
        api: apiReducer,
    },
})
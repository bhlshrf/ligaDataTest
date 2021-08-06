import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'


const fetchRegions = createAsyncThunk('api/fetchRegions', () => axios.get(`/api/regions`)
  .then(res => res.data).catch(err => err)
)

const fetchCountries = createAsyncThunk('api/fetchCountries',
  ({ region, orderBy, desc, limit, page }) => {
    console.log(region, orderBy, desc, limit, page)
    return axios.get(
      `/api/countries?region_id=${region}` +
      `&orderBy=${orderBy}&desc=${desc}&limit=${limit}&page=${page + 1}`)
      .then(res => res.data).catch(err => err);
  }
)


export const apiSlice = createSlice({
  name: 'api',
  initialState: {
    regions: {
      status: 'idle', data: {}, error: {}
    },
    countries: {
      status: 'idle', data: {}
    }
  },
  reducers: {},
  extraReducers: {
    [fetchRegions.pending]: (state) => {
      state.regions.status = 'loading';
    },
    [fetchRegions.fulfilled]: (state, action) => {
      state.regions.status = 'success';
      state.regions.data = action.payload;
    },
    [fetchRegions.rejected]: (state, action) => {
      state.regions.status = 'error';
    },


    [fetchCountries.pending]: (state) => {
      state.countries.status = 'loading';
    },
    [fetchCountries.fulfilled]: (state, action) => {
      state.countries.status = 'success';
      state.countries.data = action.payload;
    },
    [fetchCountries.rejected]: (state, action) => {
      state.countries.status = 'error';
    },
  },
})


export { fetchRegions, fetchCountries }

export default apiSlice.reducer
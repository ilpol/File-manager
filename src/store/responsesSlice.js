import { createSlice } from '@reduxjs/toolkit'

export const responsesSlice = createSlice({
  name: 'responses',
  initialState: {
    responses: {},
  },
  reducers: {
    setStoreResponses: (state, payload) => {
        const payloadValue = payload.payload;
        const payloadId = payload.payload.id;
        const payloadToStore = {};
        payloadToStore[payloadId] = payloadValue;

      state.responses = {
          ...state.responses,
          ...payloadToStore

      }
    },
  },
})

export const { setStoreResponses } = responsesSlice.actions

export default responsesSlice.reducer
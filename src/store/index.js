import { configureStore } from '@reduxjs/toolkit'
import responsesReducer from './responsesSlice';

export default configureStore({
  reducer: {
    responses: responsesReducer,
  },
})
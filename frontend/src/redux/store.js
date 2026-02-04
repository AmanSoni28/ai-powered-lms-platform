import {configureStore} from '@reduxjs/toolkit'
import userReducer from './userSlice.js'
import courseReducer from './courseSlice.js'
import lectureReducer from './lectureSlice.js'
import reviewReducer from './reviewSlice.js'

const store = configureStore({
    reducer:{
      user:userReducer,
      course:courseReducer,
      lecture:lectureReducer,
      review:reviewReducer
    }
})


export default store
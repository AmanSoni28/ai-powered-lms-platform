import { createSlice } from "@reduxjs/toolkit";

const initialState={
    reviewData:[],
}

const reviewSlice=createSlice({
    name:"review",
    initialState,
    reducers:{
        setReviewData:(state,action)=>{
          state.reviewData=action.payload
        }
    }
})

export const {setReviewData} = reviewSlice.actions
export default reviewSlice.reducer
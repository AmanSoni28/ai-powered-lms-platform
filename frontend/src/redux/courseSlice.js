import { createSlice } from "@reduxjs/toolkit";

const initialState={
    creatorCoursesData:[],
    publishedCoursesData:[],
    selectedCourse:null
}

const courseSlice=createSlice({
    name:"course",
    initialState,
    reducers:{
        setCreatorCoursesData:(state,action)=>{
          state.creatorCoursesData=action.payload
        },
        setPublishedCoursesData:(state,action)=>{
          state.publishedCoursesData=action.payload
        },
        setSelectedCourse:(state,action)=>{
          state.selectedCourse=action.payload
        },
    }
})

export const {setCreatorCoursesData,setPublishedCoursesData,setSelectedCourse} = courseSlice.actions
export default courseSlice.reducer
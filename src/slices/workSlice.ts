import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { dataref } from "../firebase";
export const fetchWorkData = createAsyncThunk(
  "/fetchWork",
  async (_, { rejectWithValue }) => {
    try {
      const response = await dataref.ref("Our Work").once("value");
      
        
        let workList = response.val().works;
        if(workList==undefined){
          workList=[];
        }
        let showWorkSection = response.val().show;
        if(showWorkSection==undefined){
          showWorkSection=true;
        }
        return {workList,showWorkSection};
     
    } catch (error:any) {
      return rejectWithValue(error.message);
    }
  }
);
interface WorkType{
  workTitle:string,
  workDesc:string,
  Image:string,
  workId:string
}
interface FetchType{
  workList:WorkType[],
  showWorkSection:boolean
}
interface InitialStateType{
  showWorkSection:boolean,
  pending:boolean,
  allWorks:WorkType[]
}
const initialState:InitialStateType={
  showWorkSection:true,
  pending:true,
  allWorks:[]
}
export const workSlice = createSlice({
  name: "Work",
  initialState,
  reducers: {
    addWork(state, action) {
      state.allWorks = [...state.allWorks, action.payload];
      dataref.ref("Our Work").set({
        works: state.allWorks,
      });
      toast.success("New Work Added Successfully");
    },
    deleteWork(state, action) {
      const indexToDelete = state.allWorks.findIndex((object) => {
        return object.workId == action.payload;
      });
      
      state.allWorks.splice(indexToDelete, 1);
      
      dataref.ref("Our Work").set({
    works: state.allWorks,
      });
      toast.success(" Work Deleted Successfully");

    },
    showSection(state,action){
      
      state.showWorkSection=action.payload;
      dataref.ref("Our Work").update({
        show:state.showWorkSection
      })
    },
    updateWork(state, action) {
        const id =action.payload.workId;
      const index = state.allWorks.findIndex((work) => {
        return work.workId == id;
      });
      
      state.allWorks[index]=action.payload;
      dataref.ref("Our Work").set({works:state.allWorks});
      toast.success("Updated Successfully");

    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkData.pending, (state) => {
        state.pending = true;
      })
      .addCase(fetchWorkData.fulfilled, (state, action) => {
        state.pending = false;
   
        state.allWorks = action.payload.workList;
        state.showWorkSection=action.payload.showWorkSection;
      })
      .addCase(fetchWorkData.rejected, (state) => {
        state.pending = false;
      });
  },
});
export const { addWork, deleteWork,showSection,updateWork } = workSlice.actions;
export default workSlice.reducer;
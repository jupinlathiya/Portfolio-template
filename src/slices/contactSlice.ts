import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { dataref, db } from "../firebase";
import { toast } from "react-toastify";

export const fetchContactData = createAsyncThunk(
  "/fetchContactData",
  async (_, { rejectWithValue }) => {
    try {
      let data = (await dataref.ref("Contact Details").once("value")).val().contactDetails;
      console.log(data);
      
      return data;
    } catch (error:any) {
      return rejectWithValue(error.message);
    }
  }
);
interface initialStateType{
  pending:boolean,
  contactDetails:{
    ["Portfolio Name"]:string,
        Address:string,
        Email:string,
        ["Instagram Url"]:string,
        ["Facebook Url"]:string,
        ["Twitter Url"]:string,
        ["Recieve Mail"]:boolean,
        ["Recieve Whatsapp"]:boolean,
        ["Whatsapp Number"]:string,
        ["Phone Number"]:string,
        isNumberDifferent:boolean,
  }|null
}
const initialState:initialStateType={
  pending: true,
  contactDetails:{
      ["Portfolio Name"]:"",
      Address:"",
      Email:"",
      ["Instagram Url"]:"",
      ["Facebook Url"]:"",
      ["Twitter Url"]:"",
      ["Recieve Mail"]:false,
      ["Recieve Whatsapp"]:false,
      ["Whatsapp Number"]:"",
      ["Phone Number"]:"",
      isNumberDifferent:false,
  },
}
export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    addDetails(state, action) {
      toast.success('Details Updated Successfully');
      let details =action.payload;
      state.contactDetails ={...state.contactDetails,...details};
      
      dataref.ref("Contact Details").set({
        contactDetails: state.contactDetails,
      })
    },
    
    resetDetails(state){
      state.contactDetails=null;
      dataref.ref("Contact Details").set({
        contactDetails: state.contactDetails,
      });
      toast.success('Details reset Successfully');

    }
   

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContactData.pending, (state) => {
        state.pending = true;
      })
      .addCase(fetchContactData.fulfilled, (state, action) => {
        state.pending = false;
        
        state.contactDetails = action.payload;
      })
      .addCase(fetchContactData.rejected, (state) => {
        state.pending = false;
      })
     
  },
});
export const { addDetails,resetDetails } = contactSlice.actions;
export default contactSlice.reducer;
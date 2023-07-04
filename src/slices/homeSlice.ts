import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { dataref, db } from "../firebase";
import { toast } from "react-toastify";

export const fetchCarouselData = createAsyncThunk(
  "/fetchCarousel",
  async (_, { rejectWithValue }) => {
    try {
      let data = (await dataref.ref("Carousel").once("value")).val().image;
       if(data==undefined){
        data=[];
       }
      return data;
    } catch (error:any) {
      return rejectWithValue(error.message);
    }
  }
);
interface ImageType{
  active:boolean,
  imageId:string,
  image:string
}
interface InitialStateType{
  pending:boolean,
  allImages:ImageType[]
}
const initialState:InitialStateType={
  pending:false,
  allImages:[]
}
export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    addImage(state, action) {
      toast.success('Image Added Successfully');
      state.allImages = [...state.allImages, action.payload];
      dataref.ref("Carousel").set({
        image: state.allImages,
      })
    },
    deleteImage(state, action) {
      const indexToDelete = state.allImages.findIndex((object) => {
        return object.imageId == action.payload;
      });
      state.allImages.splice(indexToDelete, 1);
      toast.success("Image Deleted Successfully");
      dataref.ref("Carousel").set({
        image: state.allImages,
      });
    },
    updateState(state, action) {
      const id =action.payload.id;
      const checked = action.payload.checked;
    const index = state.allImages.findIndex((image) => {
      return image.imageId == id;
    });
    state.allImages[index].active=checked;
  
    dataref.ref("Carousel").set({image:state.allImages});
  },

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarouselData.pending, (state) => {
        state.pending = true;
      })
      .addCase(fetchCarouselData.fulfilled, (state, action) => {
        state.pending = false;
        state.allImages = action.payload;
      })
      .addCase(fetchCarouselData.rejected, (state) => {
        state.pending = false;
      })
     
  },
});
export const { addImage, deleteImage,updateState } = homeSlice.actions;
export default homeSlice.reducer;
import { configureStore } from "@reduxjs/toolkit";
import imagesReducer from './imageSlice'

const imageStore = configureStore({
    reducer: {
        images: imagesReducer
    }   
})

export default imageStore;
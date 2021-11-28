import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getVideos } from '../../data'

const videosSlice = createSlice({
    name: "videos",
    initialState: {
        id: '',
        title: '',
        description: '',
        thumbnails: [],
        author: ''
    },
    reducers: { }
});
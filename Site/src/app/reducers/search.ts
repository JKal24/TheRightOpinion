import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getVideos } from '../../data'

export const readVideos = createAsyncThunk('videos/input',
    async (query: string, { rejectWithValue }) => {
        try {
            const data = await getVideos(query);
            return data;
        } catch (err) {
            rejectWithValue("Could not gather stats for the given url");
        }
    }
)

let videos : { id : string, title : string, description : string, thumbnails: string, author : string}[] = [];

const videosSlice = createSlice({
    name: "videos",
    initialState: {
        videos
    },
    reducers: { },
    extraReducers: (builder) => {
        builder.addCase(readVideos.fulfilled, (state, action) => {
            const data = action.payload;

            state.videos = data;
        })
    }
});

export default videosSlice.reducer;
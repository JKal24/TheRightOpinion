import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPageStats } from '../../data'

export const readStats = createAsyncThunk('stats/input',
    async (id : String, { rejectWithValue }) => {
        try {
            const data = await getPageStats(id);
            return data;
        } catch (err) {
            rejectWithValue("Could not gather stats for the given url");
        }
    }
)

const example = {
    dislikes: 33,
    viewCount: 4510,
    upvoteCount: 954,
    sentiment: 0.082543521456,
    author: 'Joey',
    thumbnailUrl: 'https://i.ytimg.com/vi/sRz8IfHsp9Y/default.jpg',
    description: 'The Anime Man channel is in a bit of danger, and I just wanna say some things. Twitter: https://twitter.com/TheAn1meMan Main Channel: ...',
    videoName: 'My YouTube Channel Might Disappear Soon.'
}

const statsSlice = createSlice({
    name: "stats",
    initialState: example,
    // initialState: {
    //     dislikes: 0,
    //     viewCount: 0,
    //     upvoteCount: 0,
    //     sentiment: 0,
    //     author: '',
    //     thumbnailUrl: '',
    //     description: '',
    //     videoName: ''
    // },
    reducers: {
        addDislike: (state, action) => {
            state.dislikes = state.dislikes + 1;
        },

        revertDislike: (state, action) => {
            state.dislikes = state.dislikes - 1;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(readStats.fulfilled, (state, action) => {
            const newState = action.payload;

            state.dislikes = newState.dislikes;
            state.viewCount = newState.viewCount;
            state.upvoteCount = newState.upvoteCount;
            state.sentiment = newState.sentiment;

            state.author = newState.name;
            state.videoName = newState.videoName;
            state.description = newState.description;
            state.thumbnailUrl = newState.thumbnails.default.url;
        })
    }
})

export const { addDislike, revertDislike } = statsSlice.actions;

export default statsSlice.reducer;
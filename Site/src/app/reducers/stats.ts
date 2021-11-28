import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPageStats, updateDislikes, getDislikes } from '../../data'

export const readStats = createAsyncThunk('stats/input',
    async (id: string, { rejectWithValue }) => {
        try {
            const data = await getPageStats(id);
            const dislikes = await getDislikes(id);
            data.dislikes = dislikes;
            return data;
        } catch (err) {
            rejectWithValue("Could not gather stats for the given url");
        }
    }
)

export const changeDislike = createAsyncThunk('stats/dislike',
    async (itemData : { id : string, isDisliked : string}) => {
        let { id, isDisliked } = itemData;
        const dislikes = await updateDislikes(isDisliked, id);

        return dislikes;
    }
)

const statsSlice = createSlice({
    name: "stats",
    initialState: {
        dislikes: 0,
        viewCount: 0,
        upvoteCount: 0,
        sentiment: 0,
        author: '',
        thumbnailUrl: '',
        description: '',
        videoName: '',
        videoID: ''
    },
    reducers: { },
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
            state.videoID = newState.id;
        })
        builder.addCase(changeDislike.fulfilled, (state, action) => {
            const dislikes = action.payload;

            state.dislikes = dislikes;
        })
    }
})

export default statsSlice.reducer;
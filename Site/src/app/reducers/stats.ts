import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPageStats, updateDislikes } from '../../data'

export const readStats = createAsyncThunk('stats/input',
    async (id: String, { rejectWithValue }) => {
        try {
            const data = await getPageStats(id);
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

const example = {
    dislikes: 33,
    viewCount: 4510,
    upvoteCount: 954,
    sentiment: 0.082543521456,
    author: 'Joey',
    thumbnailUrl: 'https://i.ytimg.com/vi/sRz8IfHsp9Y/default.jpg',
    description: 'The Anime Man channel is in a bit of danger, and I just wanna say some things. Twitter: https://twitter.com/TheAn1meMan Main Channel: ...' +
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    videoName: 'My YouTube Channel Might Disappear Soon.',
    videoID: 'sRz8IfHsp9Y'
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
    //     videoName: '',
    //     videoID: ''
    // },
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
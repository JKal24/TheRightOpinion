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

const statsSlice = createSlice({
    name: "stats",
    initialState: {
        dislikes: 0,
        viewCount: 0,
        upvoteCount: 0,
        sentiment: 0
    },
    reducers: {
        input: (state, action) => {
            const newState = action.payload;

            state = newState;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(readStats.fulfilled, (state, action) => {
            const newState = action.payload;

            console.log(newState);

            state = newState;

            console.log(state);
        })
    }
})

export const { input  } = statsSlice.actions;

export default statsSlice.reducer;
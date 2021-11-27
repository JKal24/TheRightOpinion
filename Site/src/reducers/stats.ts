import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPageStats } from '../data'

export const readStats = createAsyncThunk('stats/input',
    async (id : String, { rejectWithValue }) => {
        try {
            return await getPageStats(id);
        } catch (err) {
            rejectWithValue("Could not gather stats for the given url");
        }
    }
)

const statsSlice = createSlice({
    name: "stats",
    initialState: {
        dislikes: 0,
        views: 0,
        upvotes: 0,
        sentiment: 0
    },
    reducers: {
        input: (state, action) => {
            const newState = action.payload;

            state = {...newState};
        }
    },
    extraReducers: (builder) => {
        builder.addCase(readStats.fulfilled, (state, action) => {
            const newState = action.payload;

            state = {...newState};
        })
    }
})

export const { input  } = statsSlice.actions;

export default statsSlice.reducer;
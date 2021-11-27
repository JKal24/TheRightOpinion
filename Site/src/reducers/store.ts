import { configureStore } from '@reduxjs/toolkit';
import statsReducer from './stats';

export default configureStore({
    reducer: {
        stats: statsReducer,
    }
});
import { configureStore } from '@reduxjs/toolkit';

import teamReducer from './teamSlice';
import playerReducer from './playerSlice';

export const store = configureStore({
  reducer: {
    players: playerReducer,
    team: teamReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

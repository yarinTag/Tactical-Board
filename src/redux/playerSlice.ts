import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAxisPoint } from '../component/tacticalBoard/interface';
import { IPlayerData } from '../component/player/interface';

interface PlayerState {
  players: IPlayerData[];
}

const initialState: PlayerState = {
  players: [],
};

const playerSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    setPlayers: (state, action: PayloadAction<IPlayerData[]>) => {
      state.players = action.payload;
    },
    updatePlayerPosition: (
      state,
      action: PayloadAction<{ id: number; axis: IAxisPoint }>
    ) => {
      const playerIndex = state.players.findIndex(
        (player) => player.id === action.payload.id
      );
      if (playerIndex !== -1) {
        state.players[playerIndex].axis = action.payload.axis;
      }
    },
    updatePlayerName: (
      state,
      action: PayloadAction<{ id: number; name: string }>
    ) => {
      const playerIndex = state.players.findIndex(
        (player) => player.id === action.payload.id
      );
      if (playerIndex !== -1) {
        state.players[playerIndex].name = action.payload.name;
      }
    },
    updatePlayerNumber: (
      state,
      action: PayloadAction<{ id: number; number: number }>
    ) => {
      const playerIndex = state.players.findIndex(
        (player) => player.id === action.payload.id
      );
      if (playerIndex !== -1) {
        state.players[playerIndex].shirtNumber = action.payload.number;
      }
    },
  },
});

export const {
  setPlayers,
  updatePlayerPosition,
  updatePlayerNumber,
  updatePlayerName,
} = playerSlice.actions;

export default playerSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SelectOptions } from '../component/tacticalBoard/interface';

export interface TeamState {
  shirtColor: string;
  shortColor: string;
  isColorPickerOpen: boolean;
  selectedFormation: string;
  boardOption: SelectOptions;
}

const initialState: TeamState = {
  shirtColor: 'Blue',
  shortColor: 'Blue',
  isColorPickerOpen: false,
  selectedFormation: '4-2-4',
  boardOption: SelectOptions.DRAWLINE,
};

const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    toggleColorPicker(state) {
      state.isColorPickerOpen = !state.isColorPickerOpen;
    },
    setFormation(state, action: PayloadAction<string>) {
      state.selectedFormation = action.payload;
    },
    setBoardOption(state, action: PayloadAction<SelectOptions>) {
      state.boardOption = action.payload;
    },
    updateColors(
      state,
      action: PayloadAction<{ shirtColor: string; shortColor: string }>
    ) {
      const { shirtColor, shortColor } = action.payload;
      state.shirtColor = shirtColor;
      state.shortColor = shortColor;
      state.isColorPickerOpen = !state.isColorPickerOpen;
    },
  },
});

export const { toggleColorPicker, setFormation, setBoardOption, updateColors } =
  teamSlice.actions;

export default teamSlice.reducer;

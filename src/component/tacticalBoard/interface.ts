import { IPlayerData } from '../player/interface';

export enum SelectOptions {
  DRAWLINE = 'draw-line',
  BALLPASS = 'ball-pass',
}

export const selectOptions = [
  {
    key: 'DRAWLINE',
    value: SelectOptions.DRAWLINE,
  },
  { key: 'BALLPASS', value: SelectOptions.BALLPASS },
];

export interface ITacticalBoardProps {
  players: IPlayerData[];
  selectOption: SelectOptions;
  selectedFormation: {
    id: string;
    x: number;
    y: number;
  }[];
}
export type ActionType = 'DRAW' | 'PLAYER_MOVE';

export type UndoSteps = {
  [key: number]: Point[];
};

export interface Point {
  offsetX: number;
  offsetY: number;
  actionType?: ActionType;
}

export interface IAxisPoint {
  x: number;
  y: number;
}

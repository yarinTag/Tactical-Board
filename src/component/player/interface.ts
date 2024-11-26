import { IAxisPoint } from '../tacticalBoard/interface';

export interface IPlayerData {
  id: number;
  name: string;
  shirtNumber: number;
  shirtColor: string;
  shortColor: string;
  title: string;
  position: string;
  axis?: IAxisPoint;
  prevUndo?: boolean;
  yellowCard?: string;
  redCard?: number;
}

export interface IPlayerUpdate {
  name?: string;
  shirtNumber?: number;
  shirtColor?: string;
  shortColor?: string;
  position?: string;
  axis?: IAxisPoint;
  prevUndo?: boolean;
  yellowCard?: string;
  redCard?: number;
}

export interface PlayerProps {
  player: IPlayerData;
  onUpdatePlayer: (updatedPlayer: IPlayerUpdate,type?:string) => void;
}

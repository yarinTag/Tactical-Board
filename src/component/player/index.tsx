import { createRoot } from 'react-dom/client';
import { IPlayerData, IPlayerUpdate } from './interface';
import { PlayerContent } from './PlayerContent';

export const createPlayer = (props: IPlayerData): HTMLDivElement => {
  const element = document.createElement('div');
  element.setAttribute('data-testid', `player_container_${props.name}`);

  const handlePlayerUpdate = (updatedPlayer: IPlayerUpdate) => {
    console.log('Player updated:', updatedPlayer);
  };

  createRoot(element).render(
    <PlayerContent player={props} onUpdatePlayer={handlePlayerUpdate} />
  );

  return element;
};

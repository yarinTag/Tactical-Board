import React from 'react';
import { useDispatch } from 'react-redux';

import Player from './Player';
import {
  updatePlayerName,
  updatePlayerNumber,
  updatePlayerPosition,
} from '../../redux/playerSlice';
import { IPlayerData, PlayerProps } from './interface';

export const PlayerContent: React.FC<PlayerProps> = ({
  player,
  onUpdatePlayer,
}) => {
  const dispatch = useDispatch();

  const handlePlayerUpdate = (updates: Partial<IPlayerData>, type?: string) => {
    switch (type) {
      case 'name':
        dispatch(updatePlayerName({ id: player.id, name: updates.name! }));
        break;
      case 'position':
        dispatch(updatePlayerPosition({ id: player.id, axis: updates.axis! }));
        break;
      case 'shirtNumber':
        dispatch(
          updatePlayerNumber({ id: player.id, number: updates.shirtNumber! })
        );
        break;
    }
  };

  return <Player player={player} onUpdatePlayer={handlePlayerUpdate} />;
};

import React from 'react';

import Player from './Player';
import { IPlayerData, PlayerProps } from './interface';

export const PlayerContent: React.FC<PlayerProps> = ({
  player,
  onUpdatePlayer,
}) => {
  const handlePlayerUpdate = (updates: Partial<IPlayerData>) => {
    onUpdatePlayer({ ...player, ...updates });
  };

  return <Player player={player} onUpdatePlayer={handlePlayerUpdate} />;
};

import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../redux/store';
import { IPlayerUpdate } from './player/interface';
import { PlayerContent } from './player/PlayerContent';

const Team: React.FC = () => {
  const players = useSelector((state: RootState) => state.players.players);

  const handlePlayerUpdate = (updatedPlayer: IPlayerUpdate) => {
    // setPlayers((prevPlayers) =>
    //   prevPlayers.map((player) =>
    //     player.name === updatedPlayer.name
    //       ? {
    //           ...player,
    //           ...updatedPlayer,
    //           shirtColor: player.shirtColor,
    //           shortColor: player.shortColor,
    //         }
    //       : player
    //   )
    // );
  };

  return (
    <div>
      {players.map((player, index) => (
        <PlayerContent
          key={index}
          player={player}
          onUpdatePlayer={handlePlayerUpdate}
        />
      ))}
    </div>
  );
};

export default Team;

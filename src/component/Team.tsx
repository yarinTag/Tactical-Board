import React from 'react';
import { IPlayerData, IPlayerUpdate } from './player/interface';
import ColorPickerDialog from './ColorPicker';
import { PlayerContent } from './player/PlayerContent';
import {
  formationsKeys,
  getFormationHorizontally,
} from '../utils/FormationPos';
import FormationOptions from './FormationOptions';

interface ITeamProps {
  players: IPlayerData[];
}

const Team: React.FC<ITeamProps> = (props) => {
  const [players, setPlayers] = React.useState(props.players);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const handleFormationChange = (formation: string) => {
    const newFormation = getFormationHorizontally(formation);

    setPlayers((prevPlayers) =>
      prevPlayers.map((player, index) => ({
        ...player,
        axis: newFormation[index],
      }))
    );
  };

  const handleButtonClick = () => {
    setIsOpen(true);
  };

  const handleCloseDialog = (shirtC: string, pantsC: string) => {
    updateAllShirtColors(shirtC, pantsC);
    setIsOpen((prev) => !prev);
  };

  const updateAllShirtColors = (shirtColor: string, shortColor: string) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) => ({ ...player, shirtColor, shortColor }))
    );
  };

  const handlePlayerUpdate = (updatedPlayer: IPlayerUpdate) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) =>
        player.name === updatedPlayer.name
          ? {
              ...player,
              ...updatedPlayer,
              shirtColor: player.shirtColor,
              shortColor: player.shortColor,
            }
          : player
      )
    );
  };

  return (
    <div style={{ display: 'flex' }}>
      <FormationOptions
        formations={formationsKeys}
        selectedFormation={'4-2-4'}
        onFormationChange={handleFormationChange}
      />
      <button onClick={handleButtonClick}>Open Color Picker</button>
      {isOpen && (
        <ColorPickerDialog
          onClose={handleCloseDialog}
          shirtC={players[0].shirtColor}
          pantsC={players[0].shortColor}
        />
      )}
      <div>
        {players.map((player, index) => (
          <PlayerContent
            key={index}
            player={player}
            onUpdatePlayer={handlePlayerUpdate}
          />
        ))}
      </div>
    </div>
  );
};

export default Team;

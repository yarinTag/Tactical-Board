import React from 'react';
import { IPlayerUpdate } from './player/interface';
import ColorPickerDialog from './ColorPicker';
import { PlayerContent } from './player/PlayerContent';
import {
  formationsKeys,
  getFormationHorizontally,
} from '../utils/FormationPos';
import FormationOptions from './FormationOptions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setPlayers } from '../redux/playerSlice';

const Team: React.FC = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const players = useSelector((state: RootState) => state.players.players);

  const handleFormationChange = (formation: string) => {
    const newFormation = getFormationHorizontally(formation);

    dispatch(
      setPlayers(
        players.map((player, index) => ({
          ...player,
          axis: newFormation[index],
        }))
      )
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
    dispatch(
      setPlayers(
        players.map((player, index) => ({
          ...player,
          shirtColor,
          shortColor,
        }))
      )
    );
  };

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
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <button onClick={handleButtonClick}>Open Color Picker</button>
      <FormationOptions
        formations={formationsKeys}
        selectedFormation={'4-2-4'}
        onFormationChange={handleFormationChange}
      />
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

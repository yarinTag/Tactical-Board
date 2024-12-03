import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  setBoardOption,
  setFormation,
  TeamState,
  toggleColorPicker,
  updateColors,
} from '../../redux/teamSlice';
import {
  formationsKeys,
  getFormationHorizontally,
} from '../../utils/FormationPos';
import BoardOptions from './BoardOptions';
import { SelectOptions } from './interface';
import { RootState } from '../../redux/store';
import ColorPickerDialog from '../ColorPicker';
import FormationOptions from '../FormationOptions';
import { setPlayers } from '../../redux/playerSlice';
import ActionButtons, { ActionButton } from '../actionbtn/ActionButtons';

interface IBoardActions {
  eraserSize: number;
  btns: ActionButton[];
  teamOptions: TeamState;
  handleSelectedOption: (value: SelectOptions) => void;
  handleEraserSize: (size: number) => void;
}

const BoardActions: React.FC<IBoardActions> = ({
  btns,
  eraserSize,
  teamOptions,
  handleEraserSize,
  handleSelectedOption,
}) => {
  const dispatch = useDispatch();
  const players = useSelector((state: RootState) => state.players.players);

  const handleButtonClick = () => {
    dispatch(toggleColorPicker());
  };

  const handleFormationChange = (formation: string) => {
    const newFormation = getFormationHorizontally(formation);
    dispatch(setFormation(formation));
    dispatch(
      setPlayers(
        players.map((player, index) => ({
          ...player,
          axis: newFormation[index],
        }))
      )
    );
  };

  const handleCloseDialog = (shirtC: string, pantsC: string) => {
    dispatch(updateColors({ shirtColor: shirtC, shortColor: pantsC }));
    updateAllShirtColors(shirtC, pantsC);
  };

  const updateAllShirtColors = (shirtColor: string, shortColor: string) => {
    dispatch(
      setPlayers(
        players.map((player) => ({
          ...player,
          shirtColor,
          shortColor,
        }))
      )
    );
  };

  const handleOption = (option: SelectOptions) => {
    dispatch(setBoardOption(option));
    handleSelectedOption(option);
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
      }}
    >
      <ActionButtons buttons={btns} />

      <button onClick={handleButtonClick}>Open Color Picker</button>
      <FormationOptions
        formations={formationsKeys}
        selectedFormation={teamOptions.selectedFormation}
        onFormationChange={handleFormationChange}
      />
      <BoardOptions
        selectOption={teamOptions.boardOption}
        handleSelectedOption={handleOption}
      />
      {teamOptions.isColorPickerOpen && (
        <ColorPickerDialog
          onClose={handleCloseDialog}
          shirtC={teamOptions.shirtColor}
          pantsC={teamOptions.shortColor}
        />
      )}
      {teamOptions.boardOption === SelectOptions.ERASER && (
        <div>
          <label>Eraser</label>
          <input
            type='range'
            min='2'
            max='10'
            value={eraserSize}
            onChange={(e) => handleEraserSize(Number(e.target.value))}
          />
          <span>{eraserSize * 10}px</span>
        </div>
      )}
    </div>
  );
};

export default BoardActions;

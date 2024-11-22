import React from 'react';
import './App.css';
import TacticalBoard from './component/tacticalBoard/TacticalBoard';
import { IPlayerData } from './component/player/interface';
import { getFormationHorizontally } from './utils/FormationPos';
import ColorPickerDialog from './component/ColorPicker';

const initialPlayers: IPlayerData[] = [
  {
    id: 1,
    name: 'Cristiano Ronaldo',
    shirtNumber: 7,
    title: 'Forward',
    position: 'ST',
    axis: undefined,
    shirtColor: '',
    shortColor: '',
  },
  {
    id: 2,
    name: 'Lionel Messi',
    shirtNumber: 33,
    title: 'Forward',
    position: 'MCL',
    axis: undefined,
    shirtColor: '',
    shortColor: '',
  },
  {
    id: 3,
    name: 'Neymar Jr.',
    shirtNumber: 11,
    title: 'Forward',
    position: 'RW',
    axis: undefined,
    shirtColor: '',
    shortColor: '',
  },
  {
    id: 4,
    name: 'Kylian Mbappé',
    shirtNumber: 17,
    title: 'Forward',
    position: 'LW',
    axis: undefined,
    shirtColor: '',
    shortColor: '',
  },
  {
    id: 5,
    name: 'Kevin De Bruyne',
    shirtNumber: 17,
    title: 'Midfielder',
    position: 'MCR',
    axis: undefined,
    shirtColor: '',
    shortColor: '',
  },
  {
    id: 6,
    name: 'Luka Modric',
    shirtNumber: 10,
    title: 'Midfielder',
    position: 'DMC',
    axis: undefined,
    shirtColor: '',
    shortColor: '',
  },
  {
    id: 7,
    name: 'Sergio Ramos',
    shirtNumber: 4,
    title: 'Defender',
    position: 'DCL',
    axis: undefined,
    shirtColor: '',
    shortColor: '',
  },
  {
    id: 8,
    name: 'Virgil van Dijk',
    shirtNumber: 43,
    title: 'Defender',
    position: 'DCR',
    axis: undefined,
    shirtColor: '',
    shortColor: '',
  },
  {
    id: 9,
    name: 'Andrew Robertson',
    shirtNumber: 26,
    title: 'Defender',
    position: 'DR',
    axis: undefined,
    shirtColor: '',
    shortColor: '',
  },
  {
    id: 10,
    name: 'Trent Alexander-Arnold',
    shirtNumber: 66,
    title: 'Defender',
    position: 'DL',
    axis: undefined,
    shirtColor: '',
    shortColor: '',
  },
  {
    id: 11,
    name: 'Alisson Becker',
    shirtNumber: 1,
    title: 'Goalkeeper',
    position: 'GK',
    axis: undefined,
    shirtColor: '',
    shortColor: '',
  },
];

function App() {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [shirtColor, setShirtColor] = React.useState<string>('Blue');
  const [shortColor, setShortColor] = React.useState<string>('Blue');

  const handleButtonClick = () => {
    setIsOpen(true);
  };

  const handleCloseDialog = (shirtC: string, pantsC: string) => {
    shirtC && setShirtColor(shirtC);
    pantsC && setShortColor(pantsC);
    setIsOpen(false);

    //move this logic inside the board
  };

  const generateAvilablePlayers = React.useCallback(
    (players: IPlayerData[]) => {
      const formation = getFormationHorizontally('4-4-2');
      return players.map((player, index) => {
        return {
          ...player,
          axis: formation[index],
          shirtColor,
          shortColor,
        };
      });
    },
    []
  );

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <button onClick={handleButtonClick}>Open Color Picker</button>
        {isOpen && (
          <ColorPickerDialog
            onClose={handleCloseDialog}
            shirtC={shirtColor}
            pantsC={shortColor}
          />
        )}
      </div>
      <TacticalBoard players={generateAvilablePlayers(initialPlayers)} />
    </div>
  );
}

export default App;

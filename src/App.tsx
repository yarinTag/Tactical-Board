import React from 'react';
import { useDispatch } from 'react-redux';
import * as htmlToImage from 'html-to-image';

import './App.css';
import Team from './component/Team';
import { setPlayers } from './redux/playerSlice';
import { IPlayerData } from './component/player/interface';
import { getFormationHorizontally } from './utils/FormationPos';
import TacticalBoard from './component/tacticalBoard/TacticalBoard';
import { ActionButton } from './component/actionbtn/ActionButtons';

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
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();

  const generateAvilablePlayers = (players: IPlayerData[]) => {
    const formation = getFormationHorizontally('4-2-4');
    dispatch(
      setPlayers(
        players.map((player, index) => {
          return {
            ...player,
            axis: formation[index],
            shirtColor: 'Blue',
            shortColor: 'Blue',
          };
        })
      )
    );
  };

  const convertToImage = () => {
    if (containerRef.current) {
      htmlToImage
        .toPng(containerRef.current)
        .then((dataUrl: string) => {
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = 'image.png';
          link.click();
        })
        .catch((error: Error) => {
          console.error('Failed to convert div to image:', error);
        });
    }
  };

  React.useEffect(() => {
    generateAvilablePlayers(initialPlayers);
  }, []);

  const actionBtns: ActionButton[] = [
    { title: 'Download', onClick: convertToImage },
  ];

  return (
    <div ref={containerRef} data-testid={`containerRef`} id='containerRef'>
      <Team />
      <TacticalBoard btns={actionBtns} />
    </div>
  );
}

export default App;

import React from 'react';
import Kit from './kit/Kit';
import { PlayerProps } from './player/interface';

const Uniform: React.FC<PlayerProps> = ({ player, onUpdatePlayer }) => {
  const [isNameEditing, setIsNameEditing] = React.useState(false);
  const [isNumberEditing, setIsNumberEditing] = React.useState(false);

  const handleNameClick = () => {
    setIsNameEditing(true);
  };

  const handleNumberClick = () => {
    setIsNumberEditing(true);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdatePlayer({ ...player, name: e.target.value }, 'name');
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNumber = parseInt(e.target.value, 10);
    if (!isNaN(newNumber)) {
      onUpdatePlayer({ ...player, shirtNumber: newNumber }, 'shirtNumber');
    }
  };

  const handleNameBlur = () => {
    setIsNameEditing(false);
  };

  const handleNumberBlur = () => {
    setIsNumberEditing(false);
  };

  return (
    <>
      <Kit
        shirtFill={player.shirtColor}
        shirtStroke='#ffffff'
        shortsFill={player.shortColor}
        shortsStroke='#ffffff'
        stripes={false}
        stripeColor={'red'}
      />
      {/* Name */}
      {isNameEditing ? (
        <input
          type='text'
          defaultValue={player.name}
          onChange={handleNameChange}
          onBlur={handleNameBlur}
          style={{
            position: 'absolute',
            top: '0%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'black',
            fontWeight: 'bold',
            fontSize: '1.8vw',
            textAlign: 'center',
          }}
        />
      ) : (
        <div
          onClick={handleNameClick}
          style={{
            position: 'absolute',
            top: '24%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: '#ffffff',
            fontWeight: 'bold',
            fontSize: '6px',
            textAlign: 'center',
            cursor: 'pointer',
          }}
        >
          {player.name}
        </div>
      )}

      {/* Shirt Number */}
      {isNumberEditing ? (
        <input
          type='number'
          defaultValue={player.shirtNumber}
          onChange={handleNumberChange}
          onBlur={handleNumberBlur}
          style={{
            position: 'absolute',
            bottom: '50%',
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'black',
            fontWeight: 'bold',
            fontSize: '1vw',
            textAlign: 'center',
          }}
        />
      ) : (
        <div
          onClick={handleNumberClick}
          style={{
            position: 'absolute',
            bottom: '50%',
            left: +player.shirtNumber > 9 ? '45%' : '48%',
            transform: 'translateX(-50%, 50%)',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '10px',
            textAlign: 'center',
            cursor: 'pointer',
          }}
        >
          {player.shirtNumber}
        </div>
      )}
    </>
  );
};

export default Uniform;

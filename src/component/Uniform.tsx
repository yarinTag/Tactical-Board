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
    <div
      style={{
        position: 'relative',
        textAlign: 'center',
      }}
    >
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
          maxLength={20}
          style={{
            position: 'absolute',
            top: '10%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '70%',
            fontSize: '12px',
            padding: '4px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            textAlign: 'center',
            lineHeight: '1.2em',
            maxHeight: '2.4em',
            overflow: 'hidden',
            whiteSpace: 'normal',
            textOverflow: 'ellipsis',
          }}
        />
      ) : (
        <div
          onClick={handleNameClick}
          style={{
            position: 'absolute',
            top: '22%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: '#ffffff',
            fontSize: '6px',
            textAlign: 'center',
            fontWeight: 'bold',
            cursor: 'pointer',
            lineHeight: '1.2em',
            maxHeight: '2.4em',
            overflow: 'hidden',
            whiteSpace: 'normal',
            textOverflow: 'ellipsis',
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
            bottom: '15%',
            left: '50%',
            transform: 'translate(-50%, 50%)',
            width: '30px',
            fontSize: '12px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            textAlign: 'center',
          }}
        />
      ) : (
        <div
          onClick={handleNumberClick}
          style={{
            position: 'absolute',
            bottom: '45%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
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
    </div>
  );
};

export default Uniform;

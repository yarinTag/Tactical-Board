import React, { useState } from 'react';
import { PlayerProps } from './interface';
import Kit from '../kit/Kit';

const Player: React.FC<PlayerProps> = ({ player, onUpdatePlayer }) => {
  const [isNameEditing, setIsNameEditing] = useState(false);
  const [isNumberEditing, setIsNumberEditing] = useState(false);
  const [editedName, setEditedName] = useState(player.name);
  const [editedNumber, setEditedNumber] = useState(player.shirtNumber);
  const dragging = React.useRef(false);
  const playerRef = React.useRef<HTMLDivElement | null>(null);
  const [dragStart, setDragStart] = useState({
    x: 0,
    y: 0,
  });

  const handleNameClick = () => {
    setIsNameEditing(true);
  };

  const handleNumberClick = () => {
    setIsNumberEditing(true);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedName(e.target.value);
    onUpdatePlayer({ name: e.target.value });
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedNumber(parseInt(e.target.value, 10));
    onUpdatePlayer({ shirtNumber: parseInt(e.target.value, 10) });
  };

  const handleNameBlur = () => {
    setIsNameEditing(false);
  };

  const handleNumberBlur = () => {
    setIsNumberEditing(false);
  };

  const updatePosition = (
    e: MouseEvent | React.TouchEvent<HTMLDivElement>,
    isMouse: boolean
  ) => {
    if (!dragging.current || !playerRef.current) return;

    const parentRect = document
      .querySelector(`[data-testid^="WrapperPlayers"]`)
      ?.getBoundingClientRect();
    if (!parentRect) return;

    const clientX = isMouse
      ? (e as MouseEvent).clientX
      : (e as React.TouchEvent).touches[0].clientX;
    const clientY = isMouse
      ? (e as MouseEvent).clientY
      : (e as React.TouchEvent).touches[0].clientY;

    // Mouse is within the parent bounds
    const isMouseInsideParent =
      clientX >= parentRect.left &&
      clientX <= parentRect.right &&
      clientY >= parentRect.top &&
      clientY <= parentRect.bottom;

    // Mouse is outside the parent container, prevent dragging
    if (!isMouseInsideParent) isMouse ? handleMouseUp() : handleTouchEnd();

    const playerRect = playerRef.current.getBoundingClientRect();
    const playerWidth = playerRect.width;
    const playerHeight = playerRect.height;

    let newX = clientX - dragStart.x - playerWidth / 2;
    let newY = clientY - dragStart.y - playerHeight / 2;

    newX = Math.max(
      parentRect.left,
      Math.min(parentRect.right - playerWidth, newX)
    );
    newY = Math.max(
      parentRect.top,
      Math.min(parentRect.bottom - playerHeight, newY)
    );

    onUpdatePlayer({ axis: { x: newX, y: newY } });
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    dragging.current = true;
    if (playerRef.current) {
      setDragStart({
        x: e.clientX,
        y: e.clientY,
      });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    updatePosition(e, true);
  };

  const handleMouseUp = () => {
    dragging.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    // Prevent default behavior to avoid scrolling or zooming
    e.preventDefault();

    const touch = e.touches[0];
    dragging.current = true;
    setDragStart({ x: touch.clientX, y: touch.clientY });
    playerRef.current?.style?.setProperty('touch-action', 'none');
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    updatePosition(e, false);
  };

  const handleTouchEnd = () => {
    dragging.current = false;
    playerRef.current?.style?.setProperty('touch-action', 'auto');
  };

  React.useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging]);

  // console.log(player.shirtColor);

  return (
    <div
      ref={playerRef}
      style={{
        display: 'flex',
        width: '70px',
        height: '70px',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'absolute',
        left: player.axis!.x,
        top: player.axis!.y,
        cursor: dragging.current ? 'grab' : 'move',
      }}
      className={'player'}
      data-testid={`player_by_${player.name}`}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        style={{
          position: 'relative',
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
            value={editedName}
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
            {editedName}
          </div>
        )}

        {/* Shirt Number */}
        {isNumberEditing ? (
          <input
            type='number'
            value={editedNumber}
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
            {editedNumber}
          </div>
        )}
      </div>
    </div>
  );
};

export default Player;

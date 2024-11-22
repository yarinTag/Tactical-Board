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
    x: player.axis?.x ?? 0,
    y: player.axis?.y ?? 0,
  });
  console.log(player);

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

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    dragging.current = true;
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragging.current || !playerRef.current) return;

    const parentRect = document
      .querySelector(`[data-testid^="WrapperPlayers"]`)
      ?.getBoundingClientRect();
    if (!parentRect) return;
    const playerRect = playerRef.current.getBoundingClientRect();

    let newX = e.clientX - dragStart.x - playerRect.width / 2;
    let newY = e.clientY - dragStart.y - playerRect.height / 2;
    const axisXCondition =
      e.clientX > parentRect.left && e.clientX < parentRect.right;
    const axisYCondition =
      e.clientY > parentRect.top && e.clientY < parentRect.bottom;
    const withinParentRect =
      e.clientX > parentRect.left &&
      e.clientX < parentRect.right &&
      e.clientY > parentRect.top &&
      e.clientY < parentRect.bottom;

    // If mouse is outside the parent rectangle, prevent dragging
    if (!withinParentRect) return;

    if (!axisXCondition && !axisYCondition) {
      playerRef.current.style.left = `${newX}px`;
      playerRef.current.style.top = `${newY}px`;
    } else {
      if (axisXCondition && e.clientX < 735 && e.clientX > 34) {
        playerRef.current.style.left = `${newX}px`;
      }
      if (axisYCondition && e.clientY < 502 && e.clientY > 80) {
        playerRef.current.style.top = `${newY}px`;
      }
    }

    onUpdatePlayer({ axis: { x: newX, y: newY } });
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
    if (!dragging.current || !playerRef.current) return;
    e.preventDefault();
    const parentRect = document
      .querySelector(`[data-testid^="WrapperPlayers"]`)
      ?.getBoundingClientRect();
    if (!parentRect) return;

    const touch = e.touches[0];
    const playerRect = playerRef.current.getBoundingClientRect();
    const newX = touch.clientX - dragStart.x - playerRect.width / 2;
    const newY = touch.clientY - dragStart.y - playerRect.height / 2;
    const axisXCondition =
      playerRect.x >= parentRect.left && playerRect.right <= parentRect.right;
    const axisYCondition =
      playerRect.y >= parentRect.top && playerRect.bottom <= parentRect.bottom;

    if (axisXCondition && axisYCondition) {
      playerRef.current.style.left = `${newX}px`;
      playerRef.current.style.top = `${newY}px`;
    } else {
      if (!axisXCondition && touch.clientX < 700 && touch.clientX > 34) {
        playerRef.current.style.left = `${newX}px`;
      }
      if (!axisYCondition && touch.clientY < 446 && touch.clientY > 146) {
        playerRef.current.style.top = `${newY}px`;
      }
    }
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

  React.useEffect(() => {
    if (playerRef.current && player.prevUndo) {
      playerRef.current.style.top = `${player.axis?.y}px`;
      playerRef.current.style.left = `${player.axis?.x}px`;
      setDragStart({ x: player.axis?.x ?? 0, y: player.axis?.y ?? 0 });
    }
  }, [player]);

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

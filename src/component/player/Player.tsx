import React from 'react';

import Uniform from '../Uniform';
import { PlayerProps } from './interface';

const Player: React.FC<PlayerProps> = ({ player, onUpdatePlayer }) => {
  const dragging = React.useRef(false);
  const playerRef = React.useRef<HTMLDivElement | null>(null);
  const playerPosition = React.useRef({ x: player.axis!.x, y: player.axis!.y });
  const [dragStart, setDragStart] = React.useState({
    x: 0,
    y: 0,
  });

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

    // Update the position in the ref
    playerPosition.current = { x: newX, y: newY };

    // Apply the new position visually (without causing re-render)
    if (playerRef.current) {
      playerRef.current.style.left = `${newX}px`;
      playerRef.current.style.top = `${newY}px`;
    }
    // setLocalAxis({ x: newX, y: newY });
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
    if (!dragging.current) return;

    dragging.current = false;
    onUpdatePlayer({ ...player, axis: playerPosition.current }, 'position');
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
    onUpdatePlayer({ ...player, axis: playerPosition.current }, 'position');
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
    if (playerRef.current) {
      playerRef.current.style.left = `${player.axis!.x}px`;
      playerRef.current.style.top = `${player.axis!.y}px`;
    }
  }, [player.axis]);

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
        // left: localAxis!.x,
        // top: localAxis!.y,
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
        <Uniform player={player} onUpdatePlayer={onUpdatePlayer} />
      </div>
    </div>
  );
};

export default Player;

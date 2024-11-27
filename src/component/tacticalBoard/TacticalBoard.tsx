import React, { useState, useEffect, useRef } from 'react';
import * as htmlToImage from 'html-to-image';
import { IAxisPoint, Point, SelectOptions, UndoSteps } from './interface';
import { drawPitch } from '../../utils/CanvasUtils';
import BoardOptions from './BoardOptions';
import ActionButtons from '../actionbtn/ActionButtons';

interface TacticsBoardProps {}

const TacticalBoard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef(new Image());
  const [ballPosition, setBallPosition] = useState({ x: 362, y: 240 });
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const [isBallDrag, setIsBallDrag] = useState<boolean>(false);
  const startX = React.useRef<number | null>(null);
  const startY = React.useRef<number | null>(null);
  const canvas = canvasRef.current;
  const ctx = canvas?.getContext('2d');
  const [storedLines, setStoredLines] = useState<Array<IAxisPoint>>([]);
  const [undoSteps, setUndoSteps] = useState<UndoSteps>({});
  const [redoStep, setRedoStep] = useState<UndoSteps>({});

  const [selectOption, setSelectOption] = React.useState(
    SelectOptions.DRAWLINE
  );

  const handleSelectedOption = (value: SelectOptions) => {
    setSelectOption(value);
    switch (value) {
      case SelectOptions.BALLPASS:
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        // Load the image
        imageRef.current.src =
          'https://cdn.pixabay.com/photo/2013/07/13/10/51/football-157930_1280.png';
        imageRef.current.onload = () => {
          // Once the image is loaded, draw it on the canvas
          ctx.drawImage(imageRef.current, 362, 240, 20, 20);
          setBallPosition({ x: 362, y: 240 });
        };
        break;
      case SelectOptions.DRAWLINE:
        clearCanvas();
        break;
      default:
        break;
    }
  };

  const [undo, setUndo] = useState<number>(0);
  const [redo, setRedo] = useState<number>(0);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx && canvas) {
      ctx?.clearRect(0, 0, canvas?.width, canvas?.height);
      drawPitch(ctx, canvas?.width, canvas?.height);
    }
  };

  const handleReset = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    drawPitch(ctx, canvas.width, canvas.height);
  };

  const drawLinesForBall = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    clearCanvas();

    ctx.beginPath();
    ctx.moveTo(storedLines[0].x, storedLines[0].y);

    storedLines.forEach((point) => {
      ctx.lineTo(point.x, point.y);
    });

    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 1;
    ctx.stroke();
  };

  const animateLine = () => {
    if (!canvasRef.current || !storedLines[0] || !imageRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    let currentIndex = 0;
    const animationSpeed = 2;

    const drawFrame = () => {
      const targetX = storedLines[currentIndex + 1].x;
      const targetY = storedLines[currentIndex + 1].y;

      const dx = targetX - storedLines[currentIndex].x;
      const dy = targetY - storedLines[currentIndex].y;

      const distance = Math.sqrt(dx * dx + dy * dy);
      const steps = distance / animationSpeed;

      let stepCount = 0;

      const animationInterval = setInterval(() => {
        if (stepCount >= steps) {
          currentIndex++;
          clearInterval(animationInterval);
          if (currentIndex < storedLines.length - 1) {
            drawFrame();
          }
        } else {
          const x = storedLines[currentIndex].x + (dx / steps) * stepCount;
          const y = storedLines[currentIndex].y + (dy / steps) * stepCount;

          clearCanvas();
          drawLinesForBall(); // Draw lines on each frame

          const imageWidth = 20;
          const imageHeight = 20;

          // Calculate the center dynamically at each step
          const centerX = x - imageWidth / 2;
          const centerY = y - imageHeight / 2;

          ctx.drawImage(
            imageRef.current,
            centerX,
            centerY,
            imageWidth,
            imageHeight
          );

          stepCount++;
          setBallPosition({ x: centerX, y: centerY });
        }
      }, 16);
    };

    drawLinesForBall(); // Draw lines before starting the animation
    drawFrame();
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const target = e.target as HTMLElement;
    const playerName = target.dataset.playerName;
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsMouseDown(true);
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    if (canvas && ctx) {
      switch (selectOption) {
        case SelectOptions.BALLPASS:
          const canvasMouseX = x;
          const canvasMouseY = y;
          setStoredLines((prev) => [
            ...prev,
            {
              x: canvasMouseX,
              y: canvasMouseY,
            },
          ]);
          const count = storedLines.length;
          let X = canvasMouseX - (count < 10 ? 4 : 7);
          ctx.strokeStyle = 'orange';
          ctx.fillStyle = 'black';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(canvasMouseX, canvasMouseY, 8, 0, 2 * Math.PI, false);
          ctx.fillText(count.toString(), X, canvasMouseY + 4);
          ctx.stroke();
          break;
        case SelectOptions.DRAWLINE:
          ctx.beginPath();
          ctx.moveTo((startX.current = x), (startY.current = y));
          const temp = {
            ...undoSteps,
            [undo + 1]: [] as Point[],
          };
          const { offsetX, offsetY } = e.nativeEvent;

          temp[undo + 1]?.push({ offsetX, offsetY });
          setUndoSteps(temp);
          setUndo(undo + 1);
          break;
        default:
          break;
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isMouseDown) {
      if (canvas && ctx && startX.current !== null && startY.current !== null) {
        const x = e.pageX - canvas.getBoundingClientRect().left;
        const y = e.pageY - canvas.getBoundingClientRect().top;
        switch (selectOption) {
          case SelectOptions.BALLPASS:
            // Check if the mouse is within the bounds of the ball
            if (
              (x >= ballPosition.x &&
                x <= ballPosition.x + 25 &&
                y >= ballPosition.y &&
                y <= ballPosition.y + 25) ||
              isBallDrag
            ) {
              setBallPosition({ x, y });
              clearCanvas();
              setIsBallDrag(true);
              ctx.drawImage(imageRef.current, x, y, 20, 20);
              return;
            }
            break;
          case SelectOptions.DRAWLINE:
            ctx.beginPath();
            ctx.moveTo(startX.current, startY.current);
            ctx.lineTo(x, y);
            ctx.stroke();
            startX.current = x;
            startY.current = y;
            ctx.closePath();
            const temp = {
              ...undoSteps,
            };
            const { offsetX, offsetY } = e.nativeEvent;

            temp[undo]?.push({ offsetX, offsetY });
            setUndoSteps(temp);
            break;
          default:
            break;
        }
      }
    }
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
    isBallDrag && setIsBallDrag(false);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault(); // Prevent default touch behavior
    setIsMouseDown(true);
    if (canvas && ctx) {
      const touch = e.touches[0];
      ctx.beginPath();
      ctx.moveTo(
        (startX.current = touch.pageX - canvas.offsetLeft),
        (startY.current = touch.pageY - canvas.offsetTop)
      );
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (isMouseDown) {
      if (canvas && ctx && startX.current !== null && startY.current !== null) {
        const touch = e.touches[0];
        const x = touch.pageX - canvas.offsetLeft;
        const y = touch.pageY - canvas.offsetTop;
        ctx.beginPath();
        ctx.moveTo(startX.current, startY.current);
        ctx.lineTo(x, y);
        ctx.stroke();
        startX.current = x;
        startY.current = y;
        ctx.closePath();
      }
    }
  };

  const handleTouchEnd = () => {
    setIsMouseDown(false);
  };

  const handleStoredLine = () => {
    if (canvas && ctx && storedLines.length > 0) {
      drawPitch(ctx, canvas?.width, canvas?.height);
      ctx.strokeStyle = 'red';
      ctx.fillStyle = 'blue';
      ctx.lineWidth = 2;
      // ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.moveTo(storedLines[0].x, storedLines[0].y);
      for (let i = 0; i < storedLines.length; i++) {
        ctx.lineTo(storedLines[i].x, storedLines[i].y);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      setStoredLines([]);
    }
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

  const getAllPointsExceptUndoKey = (undoKey: number): Point[] => {
    const allPoints: Point[] = [];

    for (const key in undoSteps) {
      if (parseInt(key) !== undoKey) {
        allPoints.push(...undoSteps[key]);
      }
    }

    return allPoints;
  };

  const redoLastOperation = () => {
    if (redo > 0 && ctx) {
      const data = redoStep[redo];
      ctx.beginPath();
      ctx.moveTo(data[0].offsetX, data[0].offsetY);
      data.forEach((item, index) => {
        if (index !== 0) {
          ctx.lineTo(item.offsetX, item.offsetY);
          ctx.stroke();
        }
      });
      ctx.closePath();
      const temp = {
        ...redoStep,
        [redo]: [],
      };
      setUndo(undo + 1);
      setRedo(redo - 1);
      setRedoStep(temp);
      setUndoSteps({
        ...undoSteps,
        [undo + 1]: [...data],
      });
    }
  };

  const undoLastOperation = () => {
    if (undo > 0 && ctx) {
      const data = getAllPointsExceptUndoKey(undo);
      const redoData = undoSteps[undo];

      clearCanvas();
      if (data.length === 0) {
        setUndo(undo - 1);
        setRedo(redo + 1);
        const te = {
          ...redoStep,
          [redo + 1]: [...redoData],
        };
        setRedoStep(te);
        return;
      }
      ctx.beginPath();
      ctx.moveTo(data[0].offsetX, data[0].offsetY);
      data.forEach((item, index) => {
        if (index !== 0) {
          ctx.lineTo(item.offsetX, item.offsetY);
          ctx.stroke();
        }
      });
      ctx.closePath();
      const temp = {
        ...undoSteps,
        [undo]: [],
      };
      const te = {
        ...redoStep,
        [redo + 1]: [...redoData],
      };
      setUndo(undo - 1);
      setRedo(redo + 1);
      setRedoStep(te);
      setUndoSteps(temp);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    handleReset();
  }, []);

  const actionBtns = [
    { title: 'Undo', onClick: undoLastOperation, disabled: undo === 0 },
    { title: 'Redo', onClick: redoLastOperation, disabled: redo === 0 },
    { title: 'Save', onClick: convertToImage },
    { title: 'Animation ball', onClick: animateLine },
    { title: 'Clear', onClick: clearCanvas },
    { title: 'Reset', onClick: handleReset },
    { title: 'Draw path', onClick: handleStoredLine },
  ];

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <ActionButtons buttons={actionBtns} />

        <BoardOptions
          selectOption={SelectOptions.DRAWLINE}
          handleSelectedOption={handleSelectedOption}
        />
      </div>
      <canvas
        ref={canvasRef}
        width={750}
        height={500}
        style={{ border: '1px solid black' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={handleMouseEnter}
        data-testid={`WrapperPlayers`}
        // onMouseOut={handleMouseUp}
      />
    </div>
  );
};

export default TacticalBoard;

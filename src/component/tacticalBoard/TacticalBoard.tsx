import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import {
  drawPitch,
  FILL_STYLE,
  isLineIntersectingWithEraser,
  LINE_WIDTH,
  STROKE_STYLE,
} from '../../utils/CanvasUtils';
import BoardActions from './BoardActions';
import { RootState } from '../../redux/store';
import { PADDING } from '../../utils/FormationPos';
import { ActionButton } from '../actionbtn/ActionButtons';
import { IAxisPoint, Point, SelectOptions, UndoSteps } from './interface';

interface TacticsBoardProps {
  btns: ActionButton[];
}

const TacticalBoard: React.FC<TacticsBoardProps> = ({ btns }) => {
  const teamOptions = useSelector((state: RootState) => state.team);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageRef = useRef(new Image());
  const [undo, setUndo] = useState<number>(0);
  const [redo, setRedo] = useState<number>(0);
  const [ballPosition, setBallPosition] = useState({ x: 0, y: 0 });
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const [isBallDrag, setIsBallDrag] = useState<boolean>(false);
  const startX = React.useRef<number | null>(null);
  const startY = React.useRef<number | null>(null);
  const [storedBallPoint, setStoredBallPoint] = useState<Array<IAxisPoint>>([]);
  const [lines, setLines] = useState<UndoSteps>({});
  const [redoStep, setRedoStep] = useState<UndoSteps>({});
  const [undoSteps, setUndoSteps] = useState<UndoSteps>({});
  const [eraserSize, setEraserSize] = useState<number>(3);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const [canvasSize, setCanvasSize] = useState({
    width: window.innerWidth - PADDING,
    height: window.innerHeight - PADDING,
  });
  const canvas = canvasRef.current;
  const ctx = canvas?.getContext('2d');

  const handleSelectedOption = (value: SelectOptions) => {
    switch (value) {
      case SelectOptions.BALLPASS:
        if (!ctx || !canvas) return;
        imageRef.current.src =
          'https://cdn.pixabay.com/photo/2013/07/13/10/51/football-157930_1280.png';
        imageRef.current.onload = () => {
          const margin = 10;
          const centerX = canvas.width / 2;
          const centerY = canvas.height / 2;

          ctx.drawImage(
            imageRef.current,
            centerX - margin,
            centerY - margin,
            20,
            20
          );
          setBallPosition({ x: centerX, y: centerY });
        };
        break;
      case SelectOptions.DRAWLINE:
        drawLiness();
        break;
      default:
        break;
    }
  };

  const handleEraserSize = (size: number) => {
    setEraserSize(size);
  };

  const clearCanvas = () => {
    if (!ctx || !canvas) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPitch(ctx, canvas.width, canvas.height);
    setStoredBallPoint([]);
  };

  const handleReset = () => {
    if (!ctx || !canvas) return;

    drawPitch(ctx, canvas.width, canvas.height);
    setStoredBallPoint([]);
    setUndo(0);
    setRedo(0);
    setLines({});
    setUndoSteps({});
    setRedoStep({});
    setBallPosition({ x: 0, y: 0 });
  };

  const drawLinesForBall = () => {
    pathTo(storedBallPoint[0], storedBallPoint, 'blue', undefined, 1);
  };

  const animateLine = () => {
    if (!canvasRef.current || !storedBallPoint[0] || !imageRef.current || !ctx)
      return;

    let currentIndex = 0;
    const animationSpeed = 4;

    const drawFrame = () => {
      const targetX = storedBallPoint[currentIndex + 1].x;
      const targetY = storedBallPoint[currentIndex + 1].y;

      const dx = targetX - storedBallPoint[currentIndex].x;
      const dy = targetY - storedBallPoint[currentIndex].y;

      const distance = Math.sqrt(dx * dx + dy * dy);
      const steps = distance / animationSpeed;

      let stepCount = 0;

      const animationInterval = setInterval(() => {
        if (stepCount >= steps) {
          currentIndex++;
          clearInterval(animationInterval);
          if (currentIndex < storedBallPoint.length - 1) {
            drawFrame();
          }
        } else {
          const x = storedBallPoint[currentIndex].x + (dx / steps) * stepCount;
          const y = storedBallPoint[currentIndex].y + (dy / steps) * stepCount;

          clearCanvas();
          drawLinesForBall();

          const imageWidth = 20;
          const imageHeight = 20;

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

    drawLinesForBall();
    drawFrame();
    setStoredBallPoint([]);
  };

  const eraseAtPosition = (x: number, y: number, size: number) => {
    if (!ctx) return;
    let index: number = -1;
    const newStoredLines = Object.entries(lines).filter(([key, points]) => {
      const isIntersecting = isLineIntersectingWithEraser(points, x, y, size);
      if (isIntersecting) index = +key;
      return !isIntersecting;
    });

    if (index === -1) return;
    // const updatedUndoSteps = { ...undoSteps, [index]: [] };

    // setUndo((prev) => prev - 1);
    // setUndoSteps(updatedUndoSteps);

    // setRedo((prev) => prev + 1);
    // setRedoStep((prevRedoSteps) => ({
    //   ...prevRedoSteps,
    //   [redo + 1]: [...undoSteps[index]],
    // }));

    setLines(Object.fromEntries(newStoredLines));
    drawLiness(Object.fromEntries(newStoredLines));
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsMouseDown(true);
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    if (canvas && ctx) {
      switch (teamOptions.boardOption) {
        case SelectOptions.BALLPASS:
          const canvasMouseX = x;
          const canvasMouseY = y;
          setStoredBallPoint((prev) => [
            ...prev,
            {
              x: canvasMouseX,
              y: canvasMouseY,
            },
          ]);
          const count = storedBallPoint.length;
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
          setUndo((prev) => prev + 1);
          break;
        default:
          break;
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });

    if (isMouseDown) {
      if (canvas && ctx && startX.current !== null && startY.current !== null) {
        const x = e.pageX - canvas.getBoundingClientRect().left;
        const y = e.pageY - canvas.getBoundingClientRect().top;
        switch (teamOptions.boardOption) {
          case SelectOptions.BALLPASS:
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
            pathTo({ x: startX.current, y: startY.current }, { x, y });
            startX.current = x;
            startY.current = y;
            const temp = {
              ...undoSteps,
            };
            const { offsetX, offsetY } = e.nativeEvent;

            temp[undo]?.push({ offsetX, offsetY });
            setUndoSteps(temp);
            setLines(temp);
            break;
          case SelectOptions.ERASER:
            eraseAtPosition(x, y, eraserSize);
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
    e.preventDefault();
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
        pathTo({ x: startX.current, y: startY.current }, { x, y });
        startX.current = x;
        startY.current = y;
      }
    }
  };

  const handleTouchEnd = () => {
    setIsMouseDown(false);
  };

  const pathTo = (
    moveTo: IAxisPoint,
    lineTo: IAxisPoint | IAxisPoint[],
    strokeStyle = STROKE_STYLE,
    fillStyle = FILL_STYLE,
    lineWidth = LINE_WIDTH
  ) => {
    if (canvas && ctx) {
      ctx.strokeStyle = strokeStyle;
      ctx.fillStyle = fillStyle;
      ctx.lineWidth = lineWidth;
      ctx.beginPath();
      ctx.moveTo(moveTo.x, moveTo.y);
      if (Array.isArray(lineTo))
        for (let i = 0; i < lineTo.length; i++)
          ctx.lineTo(lineTo[i].x, lineTo[i].y);
      else ctx.lineTo(lineTo.x, lineTo.y);

      // ctx.closePath();
      // ctx.fill();
      ctx.stroke();
    }
  };

  const handleStoredLine = () => {
    if (canvas && ctx && storedBallPoint.length > 0) {
      pathTo(storedBallPoint[0], storedBallPoint, 'red', 'blue', 2);
      setStoredBallPoint([]);
    }
  };

  const drawLiness = (l?: UndoSteps) => {
    if (ctx && canvas) {
      ctx?.clearRect(0, 0, canvas?.width, canvas?.height);
      drawPitch(ctx, canvas?.width, canvas?.height);
      Object.values(l ?? lines).forEach((line) => {
        if (line && line.length > 0) {
          ctx.beginPath();
          ctx.moveTo(line[0].offsetX, line[0].offsetY);
          line.forEach((point) => {
            ctx.lineTo(point.offsetX, point.offsetY);
          });
          ctx.stroke();
        }
      });
    }
  };

  const redoLastOperation = () => {
    if (redo > 0) {
      const data = redoStep[redo];

      const updatedRedoStep = { ...redoStep, [redo]: [] };
      setRedo((prev) => prev - 1);
      setRedoStep(updatedRedoStep);

      setUndo((prev) => prev + 1);
      setUndoSteps((prevUndoSteps) => ({
        ...prevUndoSteps,
        [undo + 1]: [...data],
      }));

      setLines((prevLines) => ({
        ...prevLines,
        [redo]: data,
      }));

      drawLiness({ ...lines, [redo]: data });
    }
  };

  const undoLastOperation = () => {
    if (undo > 0) {
      const data = undoSteps[undo];

      const updatedUndoSteps = { ...undoSteps, [undo]: [] };
      setUndo((prev) => prev - 1);
      setUndoSteps(updatedUndoSteps);

      setRedo((prev) => prev + 1);
      setRedoStep((prevRedoSteps) => ({
        ...prevRedoSteps,
        [redo + 1]: [...data],
      }));

      const updatedLines = { ...lines };
      delete updatedLines[undo];
      setLines(updatedLines);
      drawLiness({ ...updatedLines });
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    handleReset();
  }, [canvas, ctx]);

  useEffect(() => {
    const handleResize = () => {
      setCanvasSize({
        width: window.innerWidth - PADDING,
        height: window.innerHeight - PADDING * 2,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const actionBtns = [
    { title: 'Undo', onClick: undoLastOperation, disabled: undo === 0 },
    { title: 'Redo', onClick: redoLastOperation, disabled: redo === 0 },
    {
      title: 'Animation ball',
      onClick: animateLine,
      disabled: !(teamOptions.boardOption === SelectOptions.BALLPASS),
    },
    {
      title: 'Draw path',
      onClick: handleStoredLine,
      disabled: !(teamOptions.boardOption === SelectOptions.BALLPASS),
    },
    { title: 'Clear', onClick: clearCanvas },
    { title: 'Reset', onClick: handleReset },
    ...btns,
  ];

  return (
    <div>
      <BoardActions
        btns={actionBtns}
        eraserSize={eraserSize}
        teamOptions={teamOptions}
        handleEraserSize={handleEraserSize}
        handleSelectedOption={handleSelectedOption}
      />

      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        data-testid={`WrapperPlayers`}
        // onMouseOut={handleMouseUp}
        style={{
          border: '1px solid black',
          cursor:
            teamOptions.boardOption === SelectOptions.ERASER
              ? 'none'
              : 'default',
        }}
      />
      {/* Custom Cursor */}
      {teamOptions.boardOption === SelectOptions.ERASER && (
        <div
          style={{
            position: 'absolute',
            top: `${cursorPosition.y}px`,
            left: `${cursorPosition.x}px`,
            width: `${10 * eraserSize}px`,
            height: `${10 * eraserSize}px`,
            background: `url('https://cdn-icons-png.flaticon.com/128/2015/2015051.png')`,
            backgroundSize: 'cover',
            pointerEvents: 'none',
            transform: 'translate(-50%, -50%)',
            zIndex: 5,
          }}
        />
      )}
    </div>
  );
};

export default TacticalBoard;

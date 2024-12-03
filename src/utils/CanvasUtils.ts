import { Point } from '../component/tacticalBoard/interface';

const drawPitch = (
  ctx: CanvasRenderingContext2D,
  canvasWidth: number,
  canvasHeight: number
) => {
  // Outer lines
  ctx.beginPath();
  ctx.rect(0, 0, canvasWidth, canvasHeight);
  ctx.fillStyle = '#060';
  ctx.fill();
  ctx.lineWidth = 1;
  ctx.strokeStyle = '#FFF';
  ctx.stroke();
  ctx.closePath();

  ctx.fillStyle = '#FFF';

  // Mid line
  ctx.beginPath();
  ctx.moveTo(canvasWidth / 2, 0);
  ctx.lineTo(canvasWidth / 2, canvasHeight);
  ctx.stroke();
  ctx.closePath();

  // Mid circle
  ctx.beginPath();
  ctx.arc(canvasWidth / 2, canvasHeight / 2, 73, 0, 2 * Math.PI, false);
  ctx.stroke();
  ctx.closePath();

  // Mid point
  ctx.beginPath();
  ctx.arc(canvasWidth / 2, canvasHeight / 2, 2, 0, 2 * Math.PI, false);
  ctx.fill();
  ctx.closePath();

  // Home penalty box
  ctx.beginPath();
  ctx.rect(0, (canvasHeight - 322) / 2, 132, 322);
  ctx.stroke();
  ctx.closePath();

  // Home goal box
  ctx.beginPath();
  ctx.rect(0, (canvasHeight - 146) / 2, 44, 146);
  ctx.stroke();
  ctx.closePath();

  // Home goal
  ctx.beginPath();
  ctx.moveTo(1, canvasHeight / 2 - 22);
  ctx.lineTo(1, canvasHeight / 2 + 22);
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.closePath();
  ctx.lineWidth = 1;

  // Home penalty point
  ctx.beginPath();
  ctx.arc(88, canvasHeight / 2, 1, 0, 2 * Math.PI, true);
  ctx.fill();
  ctx.closePath();

  // Home half circle
  ctx.beginPath();
  ctx.arc(88, canvasHeight / 2, 73, 0.29 * Math.PI, 1.71 * Math.PI, true);
  ctx.stroke();
  ctx.closePath();

  // Away penalty box
  ctx.beginPath();
  ctx.rect(canvasWidth - 132, (canvasHeight - 322) / 2, 132, 322);
  ctx.stroke();
  ctx.closePath();

  // Away goal box
  ctx.beginPath();
  ctx.rect(canvasWidth - 44, (canvasHeight - 146) / 2, 44, 146);
  ctx.stroke();
  ctx.closePath();

  // Away goal
  ctx.beginPath();
  ctx.moveTo(canvasWidth - 1, canvasHeight / 2 - 22);
  ctx.lineTo(canvasWidth - 1, canvasHeight / 2 + 22);
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.closePath();
  ctx.lineWidth = 1;

  // Away penalty point
  ctx.beginPath();
  ctx.arc(canvasWidth - 88, canvasHeight / 2, 1, 0, 2 * Math.PI, true);
  ctx.fill();
  ctx.closePath();

  // Away half circle
  ctx.beginPath();
  ctx.arc(
    canvasWidth - 88,
    canvasHeight / 2,
    73,
    0.71 * Math.PI,
    1.29 * Math.PI,
    false
  );
  ctx.stroke();
  ctx.closePath();

  // Home L corner
  ctx.beginPath();
  ctx.arc(0, 0, 8, 0, 0.5 * Math.PI, false);
  ctx.stroke();
  ctx.closePath();

  // Home R corner
  ctx.beginPath();
  ctx.arc(0, canvasHeight, 8, 0, 2 * Math.PI, true);
  ctx.stroke();
  ctx.closePath();

  // Away R corner
  ctx.beginPath();
  ctx.arc(canvasWidth, 0, 8, 0.5 * Math.PI, 1 * Math.PI, false);
  ctx.stroke();
  ctx.closePath();

  // Away L corner
  ctx.beginPath();
  ctx.arc(canvasWidth, canvasHeight, 8, 1 * Math.PI, 1.5 * Math.PI, false);
  ctx.stroke();
  ctx.closePath();
};

const MAX_HISTORY_SIZE = 5;
const STROKE_STYLE = '#FFF';
const FILL_STYLE = '#060';
const LINE_WIDTH = 1;

const isLineIntersectingWithEraser = (
  line: Point[],
  x: number,
  y: number,
  size: number
): boolean => {
  return line.some(
    (point) => distanceToPoint(point, { offsetX: x, offsetY: y }) < size
  );
};

const distanceToPoint = (
  point1: Point,
  point2: { offsetX: number; offsetY: number }
): number => {
  return Math.sqrt(
    Math.pow(point1.offsetX - point2.offsetX, 2) +
      Math.pow(point1.offsetY - point2.offsetY, 2)
  );
};

export {
  drawPitch,
  isLineIntersectingWithEraser,
  MAX_HISTORY_SIZE,
  STROKE_STYLE,
  FILL_STYLE,
  LINE_WIDTH,
};

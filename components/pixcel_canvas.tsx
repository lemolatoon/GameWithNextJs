import { FunctionComponent, useEffect, useState } from "react";
import Image from "next/image";
import { PixcelType, PixcelColor } from "../tetris/core";

export class Pixcels {
  pixcel: [[PixcelType]];
}

export const GameCanvas: FunctionComponent = () => {
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [pixcel, setPixcel] = useState<Pixcels>();
  // 24 * 10 array
  const [context, setContext] = useState<CanvasRenderingContext2D>(null);

  const boardBlockX = 10;
  const boardBlockY = 24;

  const width = 600;
  const height = 600;

  const blockSize: number = 20;
  const marginX = 5;
  const marginY = 10;

  const startX = 30;
  const startY = 30;
  const boardStartX = startX + marginX;
  const boardStartY = startY + marginY;

  const backgroundWidth = boardBlockX * blockSize + marginX * 2;
  const backgroundHeight = boardBlockY * blockSize + marginY * 2;
  const boardWidth = boardBlockX * blockSize;
  const boardHeight = boardBlockY * blockSize;

  // init
  useEffect(() => {
    const canvas: HTMLCanvasElement = document.getElementById(
      "canvas"
    ) as HTMLCanvasElement;
    setContext(canvas.getContext("2d"));
    canvas.width = width;
    canvas.height = height;
  }, []);

  useEffect(() => {
    // background---
    if (context != null) {
      context.fillStyle = "#2f4f4f";
      context.fillRect(0, 0, width, height);
    }

    if (context != null) {
      context.fillStyle = "gray";
      context.fillRect(startX, startY, backgroundWidth, backgroundHeight);
    }
    // -------------

    // write line
    if (context != null) {
      const blockImageData = context.getImageData(
        boardStartX,
        boardStartY,
        boardWidth,
        boardHeight
      );
      const pixcel = blockImageData.data;
      for (let i = 0; i < boardWidth; i++) {
        for (let j = 0; j < boardHeight; j++) {
          for (let k = 0; k < 4; k++) {
            const white = [0xff, 0xff, 0xff, 0xff];
            const rate = 1 / 20;
            const xCondition =
              Math.abs(((i + 1) % blockSize) - blockSize) <= blockSize * rate ||
              Math.abs(((i + 1) % blockSize) - blockSize) >=
                blockSize * (1 - rate);
            const yCondition =
              Math.abs(((j + 1) % blockSize) - blockSize) <= blockSize * rate ||
              Math.abs(((j + 1) % blockSize) - blockSize) >=
                blockSize * (1 - rate);
            if (xCondition || yCondition) {
              pixcel[(i * boardHeight + j) * 4 + k] = white[k];
            }
          }
        }
      }
      context.putImageData(blockImageData, boardStartX, boardStartY);
    }
  });
  return (
    <>
      <canvas width={width} height={height} id="canvas"></canvas>
    </>
  );
};

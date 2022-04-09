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
  });

  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    // background---
    const baseContext = canvas.getContext("2d");
    if (baseContext != null) {
      baseContext.fillStyle = "#2f4f4f";
      baseContext.fillRect(0, 0, width, height);
    }

    const underlyingContext = canvas.getContext("2d");
    if (underlyingContext != null) {
      underlyingContext.fillStyle = "gray";
      underlyingContext.fillRect(
        startX,
        startY,
        backgroundWidth,
        backgroundHeight
      );
    }
    // -------------

    // write line
    const blockContext = canvas.getContext("2d");
    const blockImageData = blockContext.getImageData(
      boardStartX,
      boardStartY,
      boardWidth,
      boardHeight
    );
    if (blockContext != null) {
      const pixcel = blockImageData.data;
      for (let i = 0; i < boardWidth; i++) {
        for (let j = 0; j < boardHeight; j++) {
          for (let k = 0; k < 4; k++) {
            const white = [0xff, 0xff, 0xff, 0xff];
            const rate = 0.01;
            const xCondition =
              Math.abs((i % blockSize) - blockSize) < blockSize * rate ||
              Math.abs((i % blockSize) - blockSize) > blockSize * (1 - rate);
            const yCondition =
              Math.abs((j % blockSize) - blockSize) < blockSize * rate ||
              Math.abs((j % blockSize) - blockSize) > blockSize * (1 - rate);
            if (xCondition || yCondition) {
              pixcel[(i * boardHeight + j) * 4 + k] = white[k];
            }
          }
        }
      }
    }
    blockContext.putImageData(blockImageData, boardStartX, boardStartY);

    setImageURL(canvas.toDataURL("image/png"));
  });
  return (
    <>
      {(() => {
        if (imageURL != null) {
          return <Image src={imageURL} width={width} height={height}></Image>;
        } else {
          return <h1>now imageURL is null</h1>;
        }
      })()}
    </>
  );
};

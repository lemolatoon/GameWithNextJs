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

  const width = 600;
  const height = 600;

  const blockSize: number = 15;

  const boardInfo = {
    blockSize: blockSize,
    start_x: 30 as number,
    start_y: 30 as number,
    width: (10 + 20) * blockSize,
    height: (24 + 10) * blockSize,
  } as const;

  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const baseContext = canvas.getContext("2d");
    if (baseContext != null) {
      baseContext.fillStyle = "#2f4f4f";
      baseContext.fillRect(0, 0, width, height);
    }

    const underlyingContext = canvas.getContext("2d");
    if (underlyingContext != null) {
      underlyingContext.fillStyle = "gray";
      underlyingContext.fillRect(
        boardInfo.start_x,
        boardInfo.start_y,
        boardInfo.width,
        boardInfo.height
      );
    }

    const blockContext = canvas.getContext("2d");
    const blockImageData = blockContext.getImageData(
      0,
      0,
      boardInfo.width,
      boardInfo.height
    );
    if (blockContext != null) {
      const pixcel = blockImageData.data;
      for (let i = 0; i < boardInfo.width; i++) {
        for (let j = 0; j < boardInfo.height; j++) {
          for (let k = 0; k < 4; k++) {
            pixcel[(i * boardInfo.height + j) * 4 + k] = PixcelColor.I_COLOR[k];
          }
        }
      }
    }
    blockContext.putImageData(
      blockImageData,
      boardInfo.start_x,
      boardInfo.start_y
    );

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

import { FunctionComponent, useEffect, useState } from "react";
import Image from "next/image";
import { PixcelType } from "../tetris/core";

export class Pixcels {
  pixcel: [[PixcelType]];
}

export const GameCanvas: FunctionComponent = () => {
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [pixcel, setPixcel] = useState<Pixcels>();
  // 24 * 10 array

  const width = 1200;
  const height = 600;

  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const baseContext = canvas.getContext("2d");
    if (baseContext != null) {
      baseContext.fillStyle = "gray";
      baseContext.fillRect(0, 0, width, height);
    }

    const underlyingContext = canvas.getContext("2d");
    if (underlyingContext != null) {
      underlyingContext.fillStyle = "#2f4f4f";
      underlyingContext.fillRect(100, 100, 240 + 200, 100 + 200);
    }

    setImageURL(canvas.toDataURL("image/png"));
  }, []);
  return (
    <>
      <h1>
        This is GameCanvas<br></br>
        {imageURL}
      </h1>
      {() => {
        if (imageURL != null) {
          return <Image src={imageURL} width={width} height={height}></Image>;
        } else {
          return <h1>now imageURL is null</h1>;
        }
      }}
    </>
  );
};

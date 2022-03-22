import { FunctionComponent, useEffect, useState } from "react";
import Image from "next/image";

export const Canvas: FunctionComponent = () => {
  const [color, setColor] = useState<number>(0);

  const onClickColor = () => {
    setColor(color + 1);
    console.log(`color=${getColorCode(color + 1)}`);
  };

  return (
    <>
      <button onClick={onClickColor}>Change Color</button>
      <h2>This is Canvas</h2>
      <CustomCanvas color={getColorCode(color)}></CustomCanvas>
    </>
  );
};

function getColorCode(index: number): string {
  const kind = 6;
  const i = index % kind;
  if (i == 0) {
    return "yellow";
  } else if (i == 1) {
    return "#fff";
  } else if (i == 2) {
    return "blue";
  } else if (i == 3) {
    return "green";
  } else if (i == 4) {
    return "red";
  } else if (i == 5) {
    return "gray";
  }
  throw new Error("unreachable code");
}

type Props = {
  color: string;
};

const CustomCanvas: FunctionComponent<Props> = (props) => {
  const [imageURL, setImageURL] = useState<string>();
  const [shouldRefresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    console.log("useEffect! from canvas.tsx");
    const canv = document.createElement("canvas");
    canv.width = 1200;
    canv.height = 1200;

    const baseCtx = canv.getContext("2d");
    if (baseCtx != null) {
      baseCtx.fillStyle = props.color;
      baseCtx.fillRect(0, 0, 1200, 1200);
    }

    const textCtx = canv.getContext("2d");
    if (textCtx != null) {
      textCtx.fillStyle = "gray";
      textCtx.font = "50px 'MS　ゴシック'";
      textCtx.textAlign = "left";
      textCtx.textBaseline = "top";
      textCtx.fillText(`color=${props.color}`, 120, 200, 1200);
    }

    console.log(`imageURL is now set, color=${props.color}`);
    setImageURL(canv.toDataURL("image/png"));
  }, [shouldRefresh]);

  const onClickRefresh = () => {
    setRefresh(!shouldRefresh);
  };
  return (
    <>
      <button onClick={onClickRefresh}>Reset</button>
      <Image src={imageURL}></Image>
    </>
  );
};

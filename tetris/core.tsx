const MinoType = {
  I: 0,
  O: 1,
  T: 2,
  J: 3,
  L: 4,
  S: 5,
  Z: 6,
} as const;

const PixcelColor = {
  I_COLOR: [0x7f, 0xff, 0xd4, 0xff],
  O_COLOR: [0xff, 0xff, 0x00, 0xff],
  T_COLOR: [0x99, 0x32, 0xcc, 0xff],
  J_COLOR: [0x00, 0x00, 0xcd, 0xff],
  L_COLOR: [0xff, 0x8c, 0x00, 0xff],
  S_COLOR: [0x00, 0xff, 0x7f, 0xff],
  Z_COLOR: [0xff, 0x63, 0x47, 0xff],
  NONE: [0x80, 0x80, 0x80, 0x80],
} as const;

const PixcelType = {
  I: 0,
  O: 1,
  T: 2,
  J: 3,
  L: 4,
  S: 5,
  Z: 6,
  NONE: 7,
} as const;

export type MinoType = typeof MinoType[keyof typeof MinoType];
export type PixcelType = typeof PixcelType[keyof typeof PixcelType];
export type PixcelColor = typeof PixcelColor[keyof typeof PixcelColor];

function PixcelType2Color(pixcel_type: PixcelType): PixcelColor {
  switch (pixcel_type) {
    case PixcelType.I:
      return PixcelColor.I_COLOR;
    case PixcelType.O:
      return PixcelColor.O_COLOR;
    case PixcelType.T:
      return PixcelColor.T_COLOR;
    case PixcelType.J:
      return PixcelColor.J_COLOR;
    case PixcelType.L:
      return PixcelColor.L_COLOR;
    case PixcelType.S:
      return PixcelColor.S_COLOR;
    case PixcelType.Z:
      return PixcelColor.Z_COLOR;
    case PixcelType.NONE:
      return PixcelColor.NONE;
    default:
      throw new Error(
        `Unreachable Code: the argument of function \`PixcelType2Color\`, pixcel_type: ${pixcel_type} might not be PixcelType`
      );
  }
}

function MinoType2Color(mino_type: MinoType): PixcelColor {
  switch (mino_type) {
    case MinoType.I:
      return PixcelColor.I_COLOR;
    case MinoType.O:
      return PixcelColor.O_COLOR;
    case MinoType.T:
      return PixcelColor.T_COLOR;
    case MinoType.J:
      return PixcelColor.J_COLOR;
    case MinoType.L:
      return PixcelColor.L_COLOR;
    case MinoType.S:
      return PixcelColor.S_COLOR;
    case MinoType.Z:
      return PixcelColor.Z_COLOR;
    default:
      throw new Error(
        `Unreachable Code: the argument of function \`MinoType2Color\`, mino_type: ${mino_type} might not be MinoType`
      );
  }
}

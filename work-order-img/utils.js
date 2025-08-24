export const ImageUrlsMap = {
  1: "qrcode.png", // 二维码
  2: "progd_img_6x3.jpeg", // 6*3
  3: "progd_img_10x3.png", // 10*3
  4: "progd_img_10x5.png", // 10*5,
  5: "progd_img_15×3.png", // 15*3,
  20: "barcode5×1.png", // 条形码
};

export const MMToPX = (mm, dpi) => {
  return parseFloat(((mm / 25.4) * dpi).toFixed(2));
};

// 字符串转矩阵
export const matrixToArray = (str) => {
  const m = str
    .replace(/^matrix\(|\)$/g, "")
    .split(",")
    .map(Number);
  return [
    [m[0], m[2], m[4]],
    [m[1], m[3], m[5]],
    [0, 0, 1],
  ];
  // return m;
};

// 矩阵相乘
export const matrixMultiply = (m1, m2) => {
  // m1, m2 都是 [a, b, c, d, tx, ty] 格式
  const [a1, b1, c1, d1, tx1, ty1] = m1;
  const [a2, b2, c2, d2, tx2, ty2] = m2;

  return [
    a1 * a2 + c1 * b2, // a
    b1 * a2 + d1 * b2, // b
    a1 * c2 + c1 * d2, // c
    b1 * c2 + d1 * d2, // d
    a1 * tx2 + c1 * ty2 + tx1, // tx
    b1 * tx2 + d1 * ty2 + ty1, // ty
  ];
};

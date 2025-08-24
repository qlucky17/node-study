import fs from "fs";
import { Readable } from "stream";
import { createCanvas, loadImage } from "canvas";
import * as mathjs from "mathjs";
import { matrixToArray, ImageUrlsMap, MMToPX } from "./utils.js";
import { data } from "./data.js";

const canvasInfo = data.canvas_infos[0];
const settings = JSON.parse(canvasInfo.production_code_params);
console.log("setting = ", settings);

const getCanvasSize = (dpi = 90) => {
  return {
    width: MMToPX(canvasInfo.actual_width, dpi),
    height: MMToPX(canvasInfo.actual_height, dpi),
  };
};

const create = async () => {
  const canvasSize = getCanvasSize();
  console.log("canvasSize = ", canvasSize);
  const canvas = createCanvas(canvasSize.width, canvasSize.height);
  const ctx = canvas.getContext("2d");
  ctx.save();
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvasSize.width, canvasSize.height);
  ctx.restore();
  for (let i = 0; i < settings.length; i++) {
    await addElement(ctx, settings[i]);
  }
  // const base64 = canvas.toDataURL("image/png");
  // const stream = Readable.from([base64]);
  // const out = fs.createWriteStream(process.cwd() + "/output.txt");
  // stream.pipe(out);

  const stream = canvas.createPNGStream();
  const out = fs.createWriteStream(process.cwd() + "/output.png");
  stream.pipe(out);
};

const addElement = async (ctx, setting) => {
  const flipImage = await getFlipImage(setting);
  const image = await loadImage(flipImage);
  ctx.save();
  const { gTransform, transform, mirrorType, width, height } = JSON.parse(
    setting.detail
  );
  const matrix = mathjs.multiply(
    mathjs.matrix(matrixToArray(gTransform)),
    mathjs.matrix(matrixToArray(transform))
  );
  const a = matrix.get([0, 0]);
  const b = matrix.get([1, 0]);
  const c = matrix.get([0, 1]);
  const d = matrix.get([1, 1]);
  const e = matrix.get([0, 2]);
  const f = matrix.get([1, 2]);
  ctx.transform(a, b, c, d, e, f);

  // const matrix = matrixMultiply(
  //   matrixToArray(gTransform),
  //   matrixToArray(transform)
  // );
  // ctx.transform(...matrix);
  ctx.drawImage(image, 0, 0, width, height);
  ctx.restore();
};

const getFlipImage = async (setting) => {
  const { mirrorType, width, height } = JSON.parse(setting.detail);
  const image = await loadImage("./images/" + ImageUrlsMap[setting.type]);
  const canvas = createCanvas(image.width, image.height);
  const ctx = canvas.getContext("2d");
  if (mirrorType == "type1") {
    ctx.translate(image.width, 0);
    ctx.scale(-1, 1);
  } else if (mirrorType == "type2") {
    ctx.translate(0, image.height);
    ctx.scale(1, -1);
  }
  ctx.drawImage(image, 0, 0);
  return canvas.toDataURL();
};

create();

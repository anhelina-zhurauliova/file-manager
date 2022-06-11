import { join } from "path";
import { createWriteStream } from "fs";

import {
  handleFailedOperation,
  logCurrentDirectory,
} from "../../utils/logs.js";

export const add = async (fileName, currentDirectory) => {
  const filePath = join(currentDirectory, fileName);
  const writableStream = createWriteStream(filePath);

  writableStream.on("error", () => {
    handleFailedOperation();
  });

  logCurrentDirectory(currentDirectory);
};

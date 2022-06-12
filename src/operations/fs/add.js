import { join } from "path";
import { createWriteStream } from "fs";

import {
  handleFailedOperation,
  logCurrentDirectory,
} from "../../utils/logs.js";

export const add = async (args, currentDirectory) => {
  if (args.length !== 1) {
    handleFailedOperation();
  } else {
    const [fileName] = args;
    const filePath = join(currentDirectory, fileName);
    const writableStream = createWriteStream(filePath);

    writableStream.on("error", () => {
      handleFailedOperation();
    });

    logCurrentDirectory(currentDirectory);
  }
};

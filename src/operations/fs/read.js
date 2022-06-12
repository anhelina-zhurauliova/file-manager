import { createReadStream } from "fs";

import {
  handleFailedOperation,
  logCurrentDirectory,
} from "../../utils/logs.js";
import { getAbsolutePath } from "../../utils//path.js";

export const read = async (args, currentDirectory) => {
  if (args.length !== 1) {
    handleFailedOperation();
  } else {
    const [pathToFile] = args;
    const absolutePath = getAbsolutePath(pathToFile, currentDirectory);
    const readableStream = createReadStream(absolutePath, { encoding: "utf8" });
    let data = "";

    readableStream.on("error", () => {
      handleFailedOperation();
    });

    readableStream.on("data", (chunk) => {
      data += chunk;
    });

    readableStream.on("end", () => {
      process.stdout.write(data + "\n");
      logCurrentDirectory(currentDirectory);
    });
  }
};

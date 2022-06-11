import { createReadStream, createWriteStream, existsSync } from "fs";
import { createBrotliCompress } from "zlib";
import { join, basename } from "path";

import {
  handleFailedOperation,
  logCurrentDirectory,
} from "../../utils/logs.js";
import { getAbsolutePath } from "../../utils/path.js";

export const compress = (file, destination, currentDirectory) => {
  let isErrored = false;

  const sourcePath = getAbsolutePath(file, currentDirectory);
  const destinationDirectory = getAbsolutePath(destination, currentDirectory);
  const destinationPath = join(
    destinationDirectory,
    `${basename(sourcePath)}.br`
  );

  const handleErrors = () => {
    if (!isErrored) {
      isErrored = true;
      handleFailedOperation();
    }
  };

  if (!existsSync(destinationPath)) {
    const readStream = createReadStream(sourcePath);
    const writeStream = createWriteStream(destinationPath);
    const compress = createBrotliCompress();
    const stream = readStream
      .on("error", handleErrors)
      .pipe(compress)
      .on("error", handleErrors)
      .pipe(writeStream)
      .on("error", handleErrors);

    stream.on("finish", () => {
      logCurrentDirectory(currentDirectory);
    });
  } else {
    handleFailedOperation();
  }
};

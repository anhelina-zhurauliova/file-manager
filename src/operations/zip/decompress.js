import { createReadStream, createWriteStream, existsSync } from "fs";
import { createBrotliDecompress } from "zlib";
import { join, basename, extname } from "path";

import {
  handleFailedOperation,
  logCurrentDirectory,
} from "../../utils/logs.js";
import { getAbsolutePath } from "../../utils/path.js";

export const decompress = (args, currentDirectory) => {
  if (args.length !== 2) {
    handleFailedOperation();
  } else {
    let isErrored = false;

    const [file, destination] = args;
    const sourcePath = getAbsolutePath(file, currentDirectory);
    const fileExt = extname(sourcePath);
    const destinationDirectory = getAbsolutePath(destination, currentDirectory);
    const destinationPath = join(
      destinationDirectory,
      basename(sourcePath).replace(fileExt, "")
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
      const decompress = createBrotliDecompress();
      const stream = readStream
        .on("error", handleErrors)
        .pipe(decompress)
        .on("error", handleErrors)
        .pipe(writeStream)
        .on("error", handleErrors);

      stream.on("finish", () => {
        logCurrentDirectory(currentDirectory);
      });
    } else {
      handleFailedOperation();
    }
  }
};

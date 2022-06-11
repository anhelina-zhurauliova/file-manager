import { createReadStream, createWriteStream, existsSync } from "fs";
import { basename, join } from "path";

import { getAbsolutePath } from "../../utils/path.js";
import {
  handleFailedOperation,
  logCurrentDirectory,
} from "../../utils/logs.js";
import { remove } from "./remove.js";

export const copy = (file, directory, currentDirectory, shouldRemoveSource) => {
  const sourcePath = getAbsolutePath(file, currentDirectory);
  const destinationDirectory = getAbsolutePath(directory, currentDirectory);
  const destinationPath = join(destinationDirectory, basename(sourcePath));

  if (existsSync(destinationPath)) {
    handleFailedOperation();
  } else {
    let isErrored = false;

    const readable = createReadStream(sourcePath, {
      encoding: "utf8",
    });
    const writable = createWriteStream(destinationPath);

    const handleStreamError = () => {
      if (!isErrored) {
        isErrored = true;
        handleFailedOperation();
      }
    };

    readable.on("error", handleStreamError);
    writable.on("error", handleStreamError);
    readable.on("end", () => {
      shouldRemoveSource
        ? remove(sourcePath, currentDirectory)
        : logCurrentDirectory(currentDirectory);
    });

    readable.pipe(writable);
  }
};

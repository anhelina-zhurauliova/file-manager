import { rm } from "fs/promises";

import {
  handleFailedOperation,
  logCurrentDirectory,
} from "../../utils/logs.js";
import { getAbsolutePath } from "../../utils/path.js";

export const remove = async (pathToFile, currentDirectory) => {
  const absolutePath = getAbsolutePath(pathToFile, currentDirectory);

  try {
    await rm(absolutePath);

    logCurrentDirectory(currentDirectory);
  } catch (err) {
    handleFailedOperation();
  }
};

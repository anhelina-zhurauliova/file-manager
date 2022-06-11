import { existsSync } from "fs";
import { getAbsolutePath } from "../../utils/path.js";
import {
  handleFailedOperation,
  logCurrentDirectory,
} from "../../utils/logs.js";

export const cd = (path, currentDirectory) => {
  const absolutePath = getAbsolutePath(path, currentDirectory);

  if (existsSync(absolutePath)) {
    logCurrentDirectory(absolutePath);
  } else {
    handleFailedOperation();
  }

  return absolutePath;
};

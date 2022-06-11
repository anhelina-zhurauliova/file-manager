import { join, dirname } from "path";
import { rename as fs_rename } from "fs/promises";

import {
  handleFailedOperation,
  logCurrentDirectory,
} from "../../utils/logs.js";
import { getAbsolutePath } from "../../utils/path.js";

export const rename = async (pathToFile, newName, currentDirectory) => {
  const absolutePath = getAbsolutePath(pathToFile, currentDirectory);
  const directory = dirname(absolutePath);
  const pathToNewFile = join(directory, newName);

  try {
    await fs_rename(absolutePath, pathToNewFile);
    logCurrentDirectory(currentDirectory);
  } catch (err) {
    handleFailedOperation();
  }
};

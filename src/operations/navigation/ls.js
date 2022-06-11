import { readdir } from "fs/promises";
import {
  handleFailedOperation,
  logCurrentDirectory,
} from "../../utils/logs.js";
import { getAbsolutePath } from "../../utils/path.js";

export const ls = async (currentUserDirectory) => {
  const absolutePath = getAbsolutePath(currentUserDirectory);

  try {
    const files = await readdir(absolutePath);
    console.log(files);
    logCurrentDirectory(currentUserDirectory);
  } catch (e) {
    console.error(e);
    handleFailedOperation();
  }
};

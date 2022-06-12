import { readdir } from "fs/promises";
import {
  handleFailedOperation,
  logCurrentDirectory,
} from "../../utils/logs.js";
import { getAbsolutePath } from "../../utils/path.js";

export const ls = async (args, currentUserDirectory) => {
  try {
    if (args.length) {
      throw new Error();
    } else {
      const absolutePath = getAbsolutePath(currentUserDirectory);

      const files = await readdir(absolutePath);
      console.log(files);
      logCurrentDirectory(currentUserDirectory);
    }
  } catch (e) {
    handleFailedOperation();
  }
};

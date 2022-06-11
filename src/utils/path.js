import { resolve, isAbsolute } from "path";

export const getAbsolutePath = (path, currentDirectory) => {
  if (isAbsolute(path)) {
    return path;
  } else {
    return resolve(currentDirectory, path.replace(/['"]+/g, ""));
  }
};

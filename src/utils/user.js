export const getUserNameFromCliArg = (arg) => {
  const [property, username] = arg.split("=");

  if (property === "--username" && username) {
    return username;
  } else {
    return null;
  }
};

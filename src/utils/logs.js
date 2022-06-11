export const greetUser = (username) =>
  process.stdin.write(`Welcome to the File Manager, ${username}!\n`);

export const handleProgramExit = (username) =>
  process.stdin.write(`Thank you for using File Manager, ${username}!\n`);

export const handleInvalidInput = () => process.stdin.write("Invalid input \n");

export const logCurrentDirectory = (currentDirectory) =>
  process.stdin.write(`You are currently in ${currentDirectory}\n`);

export const handleFailedOperation = () =>
  process.stdin.write("Operation failed \n");

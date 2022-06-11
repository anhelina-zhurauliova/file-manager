import readline from "readline";
import os from "os";

import {
  ls,
  add,
  read,
  remove,
  rename,
  cd,
  copy,
  hash,
  compress,
  decompress,
} from "./operations/index.js";
import { getUserNameFromCliArg } from "./utils/user.js";
import {
  greetUser,
  handleProgramExit,
  handleInvalidInput,
  logCurrentDirectory,
  handleFailedOperation,
} from "./utils/logs.js";
import { parseInput } from "./utils/args.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const fileManager = async () => {
  const args = process.argv.slice(2);
  const username = args.length && getUserNameFromCliArg(args[0]);
  let currentUserDirectory = os.homedir();

  if (username) {
    greetUser(username);
    logCurrentDirectory(currentUserDirectory);
  }

  rl.on("line", async (input) => {
    const [operation, ...args] = input && parseInput(input);

    try {
      switch (operation) {
        case "up":
          if (args.length) {
            handleFailedOperation();
          } else {
            currentUserDirectory = cd("..", currentUserDirectory);
          }

          break;

        case "cd":
          if (args.length !== 1) {
            handleFailedOperation();
          } else {
            currentUserDirectory = cd(args[0], currentUserDirectory);
          }

          break;

        case "ls":
          if (args.length) {
            handleFailedOperation();
          } else {
            ls(currentUserDirectory);
          }

          break;

        case "add":
          if (args.length !== 1) {
            handleFailedOperation();
          } else {
            add(args[0], currentUserDirectory);
          }

          break;

        case "cat":
          if (args.length !== 1) {
            handleFailedOperation();
          } else {
            read(args[0], currentUserDirectory);
          }

          break;

        case "rm":
          if (args.length !== 1) {
            handleFailedOperation();
          } else {
            remove(args[0], currentUserDirectory);
          }

          break;

        case "rn":
          if (args.length !== 2) {
            handleFailedOperation();
          } else {
            rename(args[0], args[1], currentUserDirectory);
          }

          break;

        case "cp":
          {
            if (args.length !== 2) {
              handleFailedOperation();
            } else {
              copy(args[0], args[1], currentUserDirectory, false);
            }
          }

          break;

        case "mv":
          if (args.length !== 2) {
            handleFailedOperation();
          } else {
            copy(args[0], args[1], currentUserDirectory, true);
          }

          break;

        case "hash":
          if (args.length !== 1) {
            handleFailedOperation();
          } else {
            hash(args[0], currentUserDirectory);
          }

          break;

        case "compress":
          if (args.length !== 2) {
            handleFailedOperation();
          } else {
            compress(args[0], args[1], currentUserDirectory);
          }

          break;

        case "decompress":
          if (args.length !== 2) {
            handleFailedOperation();
          } else {
            decompress(args[0], args[1], currentUserDirectory);
          }

        case ".exit":
          if (args.length > 0) {
            handleFailedOperation();
          } else {
            rl.close();
          }

          break;

        default:
          handleInvalidInput();
      }
    } catch (e) {
      console.error(e);
    }
  });

  rl.on("close", () => {
    handleProgramExit(username);
  });
};

fileManager();

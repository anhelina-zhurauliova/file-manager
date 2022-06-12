# File manager

## App start

`npm run start -- --username=your_username`

Note:

- Username should be passed, otherwise program won't start
- You will see `Invalid input` if unknown command was entered and `Operation failed` if command cannot be executed due to invalid params
- You can work with paths like these: `my file.txt`, `/Users/User/my folder`, if you will wrap them in double quotes
  ```
  cat "my file.txt", compress "my file.txt" "./my folder"
  ```

## Operations

Note: `path_to_directory`, `path_to_file`, `path_to_new_directory` can be relative or absolute.

- Navigation & working directory (nwd)

  - Go upper from current directory (when you are in the root folder this operation shouldn't change working directory)

  ```bash
  up
  ```

  - Go to dedicated folder from current directory

  ```bash
  cd path_to_directory
  ```

  - List all files and folder in current directory and print it to console

  ```bash
  ls
  ```

- Basic operations with files

  - Read file and print it's content in console:

  ```bash
  cat path_to_file
  ```

  - Create empty file in current working directory:

  ```bash
  add new_file_name
  ```

  - Rename file:

  ```bash
  rn path_to_file new_filename
  ```

  - Copy file:

    Note: file will be rewritten if it already exists in the destination folder

  ```bash
  cp path_to_file path_to_new_directory
  ```

  - Move file (same as copy but initial file is deleted):

    Note: file will be rewritten if it already exists in the destination folder

  ```bash
  mv path_to_file path_to_new_directory
  ```

  - Delete file:

  ```bash
  rm path_to_file
  ```

- Operating system info (prints following information in console)

  - Get EOL (default system End-Of-Line)

  ```bash
  os --EOL
  ```

  - Get host machine CPUs info (overall amount of CPUS plus model and clock rate (in GHz) for each of them)

  ```bash
  os --cpus
  ```

  - Get home directory:

  ```bash
  os --homedir
  ```

  - Get current _system user name_ (Do not confuse with the username that is set when the application starts)

  ```bash
  os --username
  ```

  - Get CPU architecture for which Node.js binary has compiled

  ```bash
  os --architecture
  ```

- Hash calculation

  - Calculate hash for file and print it into console

  ```bash
  hash path_to_file
  ```

- Compress and decompress operations

Note:

1. `path_to_file` should include file extension, `path_to_destination` is the path to directory
2. file will be rewritten if it already exists in the destination folder

-- Compress file (using Brotli algorithm)

```bash
compress path_to_file path_to_destination
```

- Decompress file (using Brotli algorithm)

```bash
decompress path_to_file path_to_destination
```

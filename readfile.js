/*  Node.js Exercise - Read a File

Functional requirements:
  1.  Prompt the User for a file name
  2.  Read the contents of the file
  3.  Convert the text to all caps
  4.  Print the text
  5.  Trigger an error condition by running the program on a non-existent file

Assumptions:
  1.  file1.txt contains the text: Hello, I am file 1

Example output on successful read:
  $ node cap_file.js
  filename: file1.txt
  HELLO, I AM FILE 1.

Example output for error on non-existent file:
  $ node cap_file.js
  filename: blah.txt
  ENOENT: no such file or directory, open 'blah.txt'

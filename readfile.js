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
*/

// Prep for User Input
var readline = require('readline');
var r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Requirement #1 - Prompt the User for a file name
r1.question("filename: ", function(filename) {
  // Requirement #2 - Read the contents of the file
  var fs = require('fs');
  fs.readFile(filename, function (error, buffer) {
    r1.close();
    if (error) {
      // Requirement #5
      console.error(error.message);
      return
    }
    // Requirement #3 - Convert the text to all caps
    var file_contents = buffer.toString();
    var uppercase_contents = file_contents.toUpperCase();
    // Requirement #4 - Print the text
    console.log(uppercase_contents);
  });
});

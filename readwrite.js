/*  Node.js Exercise - Read a File, Write it's contents to a File

Functional requirements:
  1.  Prompt the User for an input file name
  2.  Prompt the User for an output file name
  3.  Read the contents of the input file
  4.  Convert the text from the input file to all caps
  5.  Write the all caps text to the output file.  As a result, output.txt should now contain the text HELLO, I AM FILE 1.
  6.  Trigger an error condition by running the program on a non-existent input file, ensure that the error is properly displayed.
  7.  Trigger an error by running the program with an output file in a non-existant directory, such as thisdirdoesntexist/output.txt, ensure that the error is properly displayed.

Assumptions:
  1.  file1.txt contains the text: Hello, I am file 1

  Example:
    $ node cap_file_2.js
    Input file: file1.txt
    Output file: output.txt
    Wrote to file output.txt

*/

// Prep for User Input
var readline = require('readline');
var r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Requirement #1 - Prompt the User for an input file name
r1.question("Input file name: ", function(inputfile) {
  // Requirement #3 - Read the contents of the input file
  var fs = require('fs');
  fs.readFile(inputfile, function (error, buffer) {
    r1.close();
    if (error) {
      // Requirement #6 - Trigger an error condition by running the program on a non-existent input file, ensure that the error is properly displayed.
      console.error(error.message);
      return;
    }

    // Requirement #4 - Convert the text from the input file to all caps
    var input_data = buffer.toString();
    var uppercase_data = input_data.toUpperCase();

    // Requirement #2 - Prompt the User for an output file name
    r1.question("Output file name: ", function(outputfile) {
      // Requirement #5 - Write the all caps text to the output file.  As a result, output.txt should now contain the text HELLO, I AM FILE 1.
      fs.writeFile(outputfile, uppercase_data, function (error) {
        r1.close();
        if (error) {
          // Requirement #7 - Trigger an error by running the program with an output file in a non-existant directory, such as thisdirdoesntexist/output.txt, ensure that the error is properly displayed.
          console.error(error.message);
          return;
        }
        // Write confirmation message
        console.log("Wrote to file ", outputfile);
      });
    });
  });
});

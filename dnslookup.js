/*  Node.js Exercise - DNS Lookup

Functional requirements:
  1.  Prompt the User for a domain name
  2.  Look up the IP address for the domain name
  3.  Print the IP address
  4.  Trigger an error condition by providing an invalid domain.  See that the error gets displayed.

Example output:
  Domain name:  yahoo.com
  IP Address: 98.139.183.24

Hint:  Use require('dns') and dns.lookup.

*/

// Prep for User Input
var readline = require('readline');
var r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
// Requirement #1 - Prompt the User for an IP address
r1.question("Domain name: ", function(dnslookup) {
  // Requirement #2 - Look up the IP address for the domain name
  var dns = require('dns');
  var ipaddress = dns.lookup(dnslookup, function (error, address) {
    if (error) {
      // Requirement #4 - Display error
      console.error(error.message);
      return
    }
    // Requirement #3 - Print the IP address
    console.log(address);
  });
  // Always do this close statement...
  r1.close();
});

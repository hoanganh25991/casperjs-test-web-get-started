// http://nodejs.org/api.html#_child_processes
var sys = require('util');
var exec = require('child_process').exec;
// var child;
// executes `pwd`
// child = exec("pwd", function (error, stdout, stderr) {
// 	// sys.print('stdout: ' + stdout);
// 	// sys.print('stderr: ' + stderr);
// 	if (error !== null) {
// 		console.log('exec error: ' + error);
// 	}
// });

// or more concisely
// var sys = require('util')
// var exec = require('child_process').exec;
function puts(error, stdout, stderr) {
	// sys.puts(stdout);
	console.log(stdout);
}
exec("ls -la", puts);
#!/usr/bin/env node

let program = require('commander');
let lib     = require("../lib/lib");

/**
 * -a c2addon
 * -f folder
 * -z zip
 * -d destination*
 */

program.version('0.0.1')
	   .description('Convert a C2 addon to a C3 one')
	   .option('-a, --addon [addon]', 'Use .c2addon file as input')
	   .option('-f, --folder [addon]', 'Use addon folder as input')
	   .option('-z, --zip [addon]', 'Use zip file as source')
	   .option('-d, --destination [path]', 'Where to export converted addon', '.')
	   .option('-p, --pack', 'Whether to pack the addon to a .c3addon or not')
	   /*
		.on('--help', function(){
		console.log('  Examples:');
		console.log('');
		console.log('    $ custom-help --help');
		console.log('    $ custom-help -h');
		console.log('');
		})
		*/
	   .parse(process.argv);

program._name = "c2toc3";

process.stdout.write("Converting");
if (typeof (program["addon"]) === "string") {
	console.log(" .c2addon " + program["addon"] + " to " + program["destination"]);

} else if (typeof (program["folder"]) === "string") {
	console.log(" folder " + program["folder"] + " to " + program["destination"]);
	lib.convert(program["folder"], program["destination"]);

} else if (typeof (program["zip"]) === "string") {
	console.log(" zip " + program["zip"] + " to " + program["destination"]);
}
else {
	program.help();
}

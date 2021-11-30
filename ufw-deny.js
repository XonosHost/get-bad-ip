const fs = require('fs'),
    readline = require('readline');

const file = process.argv[2];

var lineReader = readline.createInterface({
    input: fs.createReadStream(file)
});

if(!fs.existsSync(`./ufw/${file}`)) {
    fs.writeFile(`./ufw/${file}`, "\n", function(err) {
        if(err) {
            console.log(`Could not create temporary IP storage file. ${err}`);
            process.exit(1);
        }
    });
}

lineReader.on('line', function (line) {
    fs.appendFile(`./ufw/${file}`, `ufw deny from ${line}/32\n`, function(err) {
        if(err) {
            console.log(err);
            process.exit(1);
        }
    });
})
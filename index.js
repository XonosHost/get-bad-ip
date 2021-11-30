const Tail = require('tail').Tail;
const fs = require('fs');

recordedips = []

config = {
    booterName: "freebooter.xonos", // A unique name for the attack (used for logging + file names)
    logDirectory: "/var/log/nginx/access.log"
}

const tail = new Tail('/var/log/nginx/access.log');

if(!fs.existsSync(`./logs/${config.booterName}.txt`)){
    fs.writeFile(`./logs/${config.booterName}.txt`, "\n", function(err) {
        if(err) {
            console.log(`Could not create temporary IP storage file. ${err}`);
            process.exit(1);
        }
    });
}



tail.on("line", function(data){
    ipAddr = data.split(" ")[0];
    if(!recordedips.includes(ipAddr)){
        recordedips.push(ipAddr);
        fs.appendFile(`./logs/${config.booterName}.txt`, `${ipAddr}\n`, function(err) {
            if(err) {
                console.log(err);
                process.exit(1);
            }
            console.log(`${ipAddr} detected.`);
        });
    }
})
import EventEmitter, { once } from "events";

import fs from "fs";
once
const inputFilePath = "data/File_old.txt";
const outputFilePath = "data/File_new.txt";

const readStream = fs.createReadStream(inputFilePath, {
    encoding: "utf-8",
    highWaterMark: 100
});
const writeStream = fs.createWriteStream(outputFilePath, {
    highWaterMark:10,
    encoding: "utf-8"
});

readStream.on("data", (chunk) => {
    console.log("*** the data is :"+ "\n")
    console.log(chunk);


        const waitDrain = !writeStream.write(chunk)
        console.log(waitDrain);
        
        if(waitDrain){
            console.log("<<<wait a little bit>>>");
        }

})

readStream.on("end", () =>{
    console.log("*** Finished!!!")
    writeStream.end();
})


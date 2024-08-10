import fs from "fs";


const main = async () => {

    const readStream = fs.createReadStream('./data/File_old.txt', {
        encoding: 'utf8',
        highWaterMark: 100
    });
    
    const writeStream = fs.createWriteStream('./data/File_new.txt');
    
    readStream.on("data", (buffer) => {
        console.log("*** the data is :")
        console.log(buffer);
    
        writeStream.write(buffer)
    })
    
    readStream.on("end", () =>{
        console.log('the stream ended');
    
        writeStream.end();
    })


    // readStream.pipe(
    //     writeStream
    // )
    
    // readStream.on("end", () => {
    //     console.log("Stream ended!!!")
    // });
    
    // writeStream.on("finish", () => {
    //     console.log("Stream finished!!!")
    // })
}

main();

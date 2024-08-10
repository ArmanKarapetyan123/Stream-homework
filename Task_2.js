import fs from 'fs';

import {Transform} from "stream";
const readStream = fs.createReadStream("./input.json", "utf-8");
const writeStream = fs.createWriteStream("./output.json", "utf-8");


const handleJSON = new Transform({
    async transform(chunk ,encoding, callback ){
       const jsonObject = JSON.parse(chunk.toString());
       console.log(jsonObject)
          Object.keys(jsonObject).forEach((key) => {
            jsonObject[key].forEach(obj => {
              obj.timestamp = new Date().toDateString();
              console.log(obj)
            });

       })
       this.push(JSON.stringify(jsonObject));
       callback();
    }
})


readStream.pipe(handleJSON).pipe(writeStream);


writeStream.on('finish', () => {
  console.log('Finished');
});

writeStream.on('error', (err) => {
  console.error('Error  is ---', err);
});
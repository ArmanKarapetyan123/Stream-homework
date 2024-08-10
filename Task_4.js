import http from "http";
import fs from "fs";

const filePath = "./megaFile.txt";
//or
// const filePath = "./6-Second-Video-13.mov"

http.createServer((req, res) => {

    if(req.method === "GET"){
        fs.stat(filePath, (err, stats) => {
            if(err){
                console.log(err);
                res.writeHead(404, {'Content-Type':'text/plain'});
                res.end('Not Found');
                return
            }
            res.writeHead(200, {
                'Content-Type': 'application/octet-stream',
                'Content-Disposition': 'attachment; filename=largefile.txt',
                //or
                //'Content-Disposition': 'attachment; filename=largefile.mov',
                'Content-Length': stats.size,
            }) 

            const readStream = fs.createReadStream(filePath, {
                encoding: "utf-8",
                highWaterMark: 100
            })

            readStream.pipe(res);

            readStream.on('end', () => {
                res.end();
              });
       })
    }else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
      }

    // console.log(req.url);
    // console.log(req.methods);
    // console.log(req.headers)

}).listen(8080, function(){ console.log("http://localhost:8080")});

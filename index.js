
import http from 'http';
import fs from 'fs';
import path from 'path';
import url from 'url';

const _dirname = path.dirname(url.fileURLToPath(import.meta.url));

// Path to the large file you want to stream
const filePath = path.join(_dirname, 'megaFile.txt'); // Replace with your actual file

// Create the HTTP server
const server = http.createServer((req, res) => {
  // Check if the requested URL is for the large file
  if (req.url === '/megaFile.txt') {
    // Get the file size for the headers
    fs.stat(filePath, (err, stats) => {
      if (err) {
        console.error('File not found', err);
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('File not found');
        return;
      }

      const fileSize = stats.size;
      const range = req.headers.range;

      if (range) {
        // Parse the range header
        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

        if (start >= fileSize || end >= fileSize) {
          res.writeHead(416, {
            'Content-Range': `bytes */${fileSize}`,
          });
          return res.end();
        }

        const chunkSize = (end - start) + 1;
        const fileStream = fs.createReadStream(filePath, { start, end });

        res.writeHead(206, {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunkSize,
          'Content-Type': 'video/mp4', // Adjust according to your file type
        });

        fileStream.pipe(res);
      } else {
        res.writeHead(200, {
          'Content-Length': fileSize,
          'Content-Type': 'video/mp4', // Adjust according to your file type
        });
        fs.createReadStream(filePath).pipe(res);
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

// Start the server
server.listen(8080, () => {
  console.log('Server is listening on http://localhost:8080');
});
// example app: we need to read a large text file from the file system and then send it to the client

const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
    // Solution 1
    // fs.readFile('test-file.txt', (err, data) => { // this works in development, but in production our app would crash reading big files
    //     if (err) console.log(err);
    //     res.end(data);
    // })

    // Solution 2: Streams
    // this solution has a problm too: it overwhelms the response stream, which can't handle all this incoming data so fast
    // called BACK PRESSURE: the response cannot send the data narly as fast as it can receive it
    // const readable = fs.createReadStream('test-file.txt');
    // readable.on('data', chunk => {
    //     res.write(chunk);
    // })
    // readable.on('end', () => res.end());
    // readable.on('error', err => {
    //     console.log(err);
    //     res.statusCode = 500;
    //     res.end("File not found!");
    // })

    // Solution 3: use the pipe operator
    // pipe operator is available on all readable streams, allow us to pipe the output of a readable stream right into the input of a writable stream
    // it will automaticalaly handle the speed of the data coming in and out
    const readable = fs.createReadStream('test-file.txt');
    // readableSource.pipe(writeableDestination)
    readable.pipe(res);
});

server.listen(8000, '127.0.0.1', () => {
    console.log("listening...");
})
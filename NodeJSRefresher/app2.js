// Won't re-execute on code changes so you need to restart the server
//  Better way will be made later

const http = require ('http');

// Node creates the server while PHP does not
const server = http.createServer((req, res) => {
    console.log ('INCOMING REQUEST');
    console.log(req.method, req.url);

    // Force headers to ignore h1 below
    res.setHeader('Content-Type', 'text/plain')

    // sending back a response
    //  This says it's done and you can send back data
    res.end('<h1>Success!</h1>');
});

// Opens a server in the localhost port 5000
// Ongoing listener until manually turned off, able to handle mutiple requests
server.listen(5000);
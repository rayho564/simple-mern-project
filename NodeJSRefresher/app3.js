const http = require("http");

const server = http.createServer((req, res) => {
  console.log("INCOMING REQUEST");
  console.log(req.method, req.url);

  if (req.method === "POST") {
    let body = '';

    req.on('end', () => {
        const userName = body.split('=')[1];
        res.end('<h1>' + userName +'</h1>');
    });
    
    // listen on data changes
    req.on('data', (chunk) => {
        body += chunk;
    });
  } else {
    res.setHeader("Content-Type", "text/html");

    // when pressing the button to submit, appends the parameters as query and send a Post request
    res.end(
      '<form method="POST"><input type="text" name="username"><button type="submit">Create User</button></form>'
    );
  }
});

server.listen(5000);

// Globally available in NodeJS
//   Grab filesystem module
const fs = require('fs');

const userName = 'Max';

//console.log(userName);

// Only launches in the browser. This API is not available in Node
//alert(userName);

fs.writeFile('user-data.txt', 'Name: ' + userName, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('WROTE FILE');
});
const https = require('https');
var http = require('http');
exports.memberUser = (url) =>
    new Promise((resolve, reject) => {


http.get(url, (resp) => {
  let data = '';
 
  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;

    
  });
 
  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    // console.log(JSON.parse(data).explanation);
    console.log(data);
     resolve({ status: 200, message: JSON.parse(data) });
  });
 
}).on("error", (err) => {
     reject({ status: 401, message: "Error:" });

});

         
        
    

 });
const http = require('http');
const fs = require('fs');
 
const port = 8080;
const host = '127.0.0.1';
 
const server = http.createServer((request,response)=>{
  console.log(request.url);
  response.writeHead(200,{'Content-Type':'text/html'});
  response.write('<h1>Hello World</h1>');
  response.write(`Request URL : ${request.url}`);
  response.end();
})
 
server.listen(port,host,()=>{
  console.log('ready');
})
const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const setupFilePath = (path) => {
    const filePath = path.join(__dirname, '../html', 'form.html');
    return filePath;
};

const readHtmlContent = () => {
    const filePath = setupFilePath(path);
    return new Promise((resolve, reject) => {
       const content = await fs.readFile(filePath, 'utf8');
       return content;
    });
};

const writeToFile = (path, meesage)=>{
    return fs.writeFileSync(filePath, message);
}

const server = http.createServer((req, res) => {
    const requestUrl = req.url;
    const requestMethod = req.method;
    if(req.url === '/'){
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.write(readHtmlContent());
        return res.end();
    }
    if (req.url === '/submitted' && req.method === 'POST') {
        const data = [];
        req.on('data', function(chunk){
            data.push(chunk);
            console.log(data);
        })
        req.on('end', function(){
            const parsedBodyData = Buffer.concat(data).toString();
            const mesage = parsedBodyData.split('=')[1];
            const filePath = path.join(__dirname, '../html', 'text.txt');
            writeToFile(filePath, mesage);
        });
        res.writeHead(200, {
            'Content-Type':'text/html'
        });
        return res.end();
    }
});

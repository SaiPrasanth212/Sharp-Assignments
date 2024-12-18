const http = require('http');
const fs = require('fs');
const querystring = require('querystring');

const handleRequest = (req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        fs.readFile('messages.txt', 'utf8', (err, data) => {
            if (err) {
                data = '';
            }
            const messages = data.split('\n').filter(Boolean).reverse().join('<br>');
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`
                <!DOCTYPE html>
                <html>
                <body>
                    <div id="messages">${messages}</div>
                    <form action="/submit" method="post">
                        <label for="message">Message:</label><br>
                        <input type="text" id="message" name="message"><br>
                        <input type="submit" value="Submit">
                    </form>
                </body>
                </html>
            `);
        });
    } else if (req.method === 'POST' && req.url === '/submit') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const parsedBody = querystring.parse(body);
            fs.appendFile('messages.txt', parsedBody.message + '\n', (err) => {
                if (err) throw err;
                res.writeHead(302, { 'Location': '/' });
                res.end();
            });
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
};

const server = http.createServer(handleRequest);

server.listen(8080, () => {
    console.log('Server running at http://localhost:8080/');
});

module.exports = server;

const server = require('./server2');

server.listen(2147, () => {
    console.log('Server running at http://localhost:2147/');
});

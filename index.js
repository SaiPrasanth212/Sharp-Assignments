const server = require('./server1.js');

server.listen(8080, () => {
    console.log('Server running at http://localhost:8080/');
});

const express = require('express');
const app = express();
const server = require('http').createServer(app);

app.use(express.static('public'));

const port = process.env.PORT || 5000;

require('./socket')(server);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

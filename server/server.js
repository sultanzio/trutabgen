const path = require('path');
const express = require('express');
const compression = require('compression')
const app = express();
const publicPath = path.join(__dirname, '..', 'dist');
const helmet = require('helmet');

app.use(helmet());
app.use(compression());

app.use(express.static(publicPath));

app.get('*', (req, res) => {
	res.sendFile(path.join(publicPath, 'index.html'));
});

const port = 3001;
app.listen(port, () => {
	console.log('Server is up!');
});

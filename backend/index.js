const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const databaseConnection = require('./db');
require('dotenv').config();
databaseConnection();

const app = express();
const port = process.env.PORT;

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
const jsonParser = bodyParser.json({ limit: '10mb' });
app.use(jsonParser);
require('dotenv').config();
app.use('/api', require('./routes/auth'));
app.use('/api', require('./routes/users'));
app.use('/api', require('./routes/pastpapers'));


app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);

});

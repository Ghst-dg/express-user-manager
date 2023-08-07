const express = require('express');
const app = express();

app.use(express.json());

const userController = require('./controllers/userController');
const authController = require('./controllers/authController');
const dataController = require('./controllers/dataController');

app.use('/api/register', userController);
app.use('/api/token', authController);
app.use('/api/data', dataController);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

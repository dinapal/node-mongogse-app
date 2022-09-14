const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }));
app.use(require('./middlewares/middleware'));

app.use('/', require('./routes/routes'));

app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'Health is working properly'
    })
})





app.listen(PORT, console.log(`server listening on ${PORT}`));
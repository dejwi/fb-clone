const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('error', err => console.log(err));

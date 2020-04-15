// Initialize and configure app
const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
require('./Routers').init(app);

// Connect to database and start listening for requests
const mongoose = require('mongoose');
mongoose.connect(
    process.env.MONGODB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (!err)
            app.listen(process.env.PORT || 2020, () => console.log("Application is live."));
        else {
            console.error("An error occurred while attempting to establish a connection to the database.");
            console.error(err);
        }
    }
);
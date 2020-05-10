// Initialize and configure app
const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
require('./Routers').init(app);
// Error handler
app.use((err, req, res, next) => {
    res.sendStatus(500);
    console.error(err);
});

// Connect to database and start listening for requests
const mongoose = require('mongoose');
mongoose.connect(
    process.env.MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    },
    (err) => {
        if (err)
            console.error(err);
        else
            app.listen(process.env.PORT || 2020, () => console.log("Application is live."));
    }
);
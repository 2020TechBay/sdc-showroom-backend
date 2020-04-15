module.exports.init = (app) => {
    app.use('/auth', require('./AuthRouter'));
    app.use('/customer', require('./CustomerRouter'));
    app.use('/officer', require('./OfficerRouter'));
    app.use('/products', require('./ProductsRouter'));
};
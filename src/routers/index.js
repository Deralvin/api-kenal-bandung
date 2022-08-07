const Router = require("express").Router();
const wisataRouter= require('./wisata');
const cafeRouter= require('./cafe');
Router.use('/wisata', wisataRouter);
Router.use('/cafe', cafeRouter);
module.exports=Router;
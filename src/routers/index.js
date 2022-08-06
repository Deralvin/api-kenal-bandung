const Router = require("express").Router();
const wisataRouter= require('./wisata');
Router.use('/wisata', wisataRouter);
module.exports=Router;
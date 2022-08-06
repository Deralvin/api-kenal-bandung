const Router = require("express").Router();
const handlers = require('../controllers/wisata');
Router.get('/',handlers.getListWisata);
module.exports=Router;
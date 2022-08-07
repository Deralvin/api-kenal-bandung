const Router = require("express").Router();
const { Route } = require("express");
const handlers = require('../controllers/wisata');
Router.get('/',handlers.getListWisata);
Router.get("/worker",handlers.getWorkerIntoDb)

module.exports=Router;
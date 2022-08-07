const Router = require("express").Router();
const { Route } = require("express");
const handlers = require('../controllers/cafe');

Router.get("/worker",handlers.getWorkerIntoDb)
Router.get("/",handlers.getListCafe)

module.exports=Router;
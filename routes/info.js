const infoRouter = require("express").Router();
const { getInfo } = require("../controllers/personController");

infoRouter.get("/", getInfo);

module.exports = infoRouter;

const personRouter = require("express").Router();
const {
  getAllPersons,
  getPerson,
  createPerson,
  updatePerson,
  deletePerson,
} = require("../controllers/personController");

personRouter.get("/", getAllPersons);

personRouter.get("/:id", getPerson);

personRouter.post("/", createPerson);

personRouter.put("/:id", updatePerson);

personRouter.delete("/:id", deletePerson);

module.exports = personRouter;

const personRouter = require("express").Router();
const Person = require("../models/person");
const personController = require("../controllers/personController");

personRouter.get("/", personController.getAllPersons);

personRouter.get("/:id", personController.getPerson);

personRouter.post("/", personController.createPerson);

personRouter.put("/:id", personController.updatePerson);

personRouter.delete("/:id", personController.deletePerson);

personRouter.get("/info", (req, res, next) => {
  Person.countDocuments({})
    .then((persons) => {
      res.send(`
  <p>Phonebook has contact details for ${persons} persons</p>
  <p>${Date(Date.now())}</p>
  `);
    })
    .catch((error) => next(error));
});

module.exports = personRouter;

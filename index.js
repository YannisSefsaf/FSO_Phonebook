require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

const Person = require("./models/person");

const requestLogger = (req, res, next) => {
  console.log("Method:", req.method);
  console.log("Path:  ", req.path);
  console.log("Body:  ", req.body);
  console.log("---");
  next();
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(cors());

morgan.token("req-body", (req) => JSON.stringify(req.body));

app.use(express.json());
app.use(requestLogger);
app.use(morgan(":method :url :status :response-time ms - :req-body"));
app.use(express.static("dist"));

app.get("/api/persons", (req, res, next) => {
  Person.find({})
    .then((persons) => {
      res.json(persons);
    })
    .catch((error) => next(error));
});

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (req, res, next) => {
  const body = req.body;

  if (body.name === "" || body.number === "") {
    return res.status(400).json({ error: "content missing" });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedPerson) => {
      res.json(savedPerson);
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (req, res, next) => {
  const { name, number } = req.body;

  Person.findByIdAndUpdate(
    req.params.id,
    { name, number },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedPerson) => {
      res.json(updatedPerson);
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

app.get("/info", (req, res) => {
  res.send(`
  <p>Phonebook has contact details for ${persons.length} persons</p>
  <p>${Date(Date.now())}</p>
  `);
});

// handler of request with unknown endpoint
app.use(unknownEndpoint);

// this has to be the last loaded middleware.
app.use(errorHandler);

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

/* app.use(morgan("tiny")); */

/* let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
]; 

app.get("/", (req, res) => {
  res.send("<h1>Welcome to Phonebook Exercise</h1>");
}); */

/* app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  person ? res.json(person) : res.status(404).end();
}); */

/* app.post("/api/persons", (req, res) => {
  // app.use(express.json()) allows to access req.body
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "Enter both name and number please",
    });
  }

  if (persons.some((person) => person.name === body.name)) {
    return res.status(400).json({
      error: "Name must be unique",
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: persons.length > 0 ? persons.length + 1 : 0,
  };

  persons = persons.concat(person);

  res.json(person);
}); */

/* app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  // replace persons array with filtered version of it excluding id to be deleted
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});
 */

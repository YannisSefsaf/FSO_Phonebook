const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(cors());

morgan.token("req-body", (req) => JSON.stringify(req.body));

app.use(express.json());
/* app.use(morgan("tiny")); */
app.use(morgan(":method :url :status :response-time ms - :req-body"));
app.use(express.static("dist"));

let persons = [
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

/* app.get("/", (req, res) => {
  res.send("<h1>Welcome to Phonebook Exercise</h1>");
}); */

/* app.get("/api/persons", (req, res) => {
  // response: render persons array as JSON
  res.json(persons);
}); */

/* app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  person ? res.json(person) : res.status(404).end();
}); */

/* app.post("/api/persons", (request, response) => {
  // app.use(express.json()) allows to access request.body
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "Enter both name and number please",
    });
  }

  if (persons.some((person) => person.name === body.name)) {
    return response.status(400).json({
      error: "Name must be unique",
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: persons.length > 0 ? persons.length + 1 : 0,
  };

  persons = persons.concat(person);

  response.json(person);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  // replace persons array with filtered version of it excluding id to be deleted
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

app.get("/info", (req, res) => {
  res.send(`
  <p>Phonebook has contact details for ${persons.length} persons</p>
  <p>${Date(Date.now())}</p>
  `);
}); */

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

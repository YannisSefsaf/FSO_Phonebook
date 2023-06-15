const mongoose = require("mongoose");

require("dotenv").config();

const url = process.env.MONGODB_URI;

/* if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
} */

/* const password = process.argv[2]; */

mongoose.set("strictQuery", false);
mongoose.connect(url);

const PersonSchema = new mongoose.Schema({
  name: String,
  number: String,
});

PersonSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

/* Person.find({}).then((persons) => {
  if (!process.argv[3] && !process.argv[4]) {
    console.log(persons);
    mongoose.connection.close();
  } else {
    let newName = process.argv[3];
    let newNumber = process.argv[4];

    const person = new Person({
      name: newName,
      number: newNumber,
    });

    person.save().then((result) => {
      console.log(`added ${newName} number ${newNumber} to phonebook`);
      mongoose.connection.close();
    });
  }
}); */

module.exports = mongoose.model("Person", PersonSchema);

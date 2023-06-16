const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const personRouter = require("./routes/person");
const infoRouter = require("./routes/info");
const {
  unknownEndpoint,
  errorHandler,
  requestLogger,
} = require("./utils/middleware");
const { info } = require("./utils/logger");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

/* logger.info("connecting to", config.MONGODB_URI); */

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    info("connected to MongoDB");
  })
  .catch((error) => {
    info("error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(requestLogger);

app.use("/api/persons", personRouter);
app.use("/info", infoRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;

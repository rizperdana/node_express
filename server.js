const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./app/models");

const app = express();
var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
// parse request of content-type - application/json
app.use(express.json());
// parse request of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


// setup db
if (process.env.ENVIRONMENT == "production") {
  db.sequelize.sync()
    .then(() => {
      console.log("Synched DB");
    })
    .catch((err) => {
      console.log("Failed to sync db, caused: " + err.message);
    });
} else if (process.env.ENVIRONMENT == "development") {
  db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
  })
};
  
// test route
app.get("/", (req, res) => {
  res.json({
    message: "Server is healthy"
  })
})

// include other route as well
require("./app/routes/user.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

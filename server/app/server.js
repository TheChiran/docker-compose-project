const express = require("express");
const cors = require("cors");
require('dotenv').config();

const { Sequelize, DataTypes } = require("sequelize");

const {
  DB_ROOT_PASSWORD,
  DB_DATABASE,
  DB_HOST,
  DB_USER,
  API_CONTAINER_PORT: API_PORT
} = process.env;

const sequelize = new Sequelize(DB_DATABASE, DB_USER
  , DB_ROOT_PASSWORD, {
  host: DB_HOST,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
// Test the connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); // { force: true } -> use only when, we want new dataset or create new table each time
    console.log("Database connected succefully");
    serverUp();
  } catch (error) {
    //ensure you created the database
    //check database credentials
    console.error("Unable to connect to the database:", error);
  }
}
testConnection();

const Student = sequelize.define("Student", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

function serverUp() {
  const app = express();

  app.use(cors("*"));

  // parse requests of content-type - application/json
  app.use(express.json());

  // parse requests of content-type - application/x-www-form-urlencoded
  app.use(express.urlencoded({ extended: true }));

  app.get("/", (req, res) => {
    res.json({ message: "Welcome devops course. Batch: 4" });
  });

  app.get("/api/greetings", (req, res) => {
    res.json({
      status: 200,
      data: {
        message: "Your seeing this, because your great!"
      }
    });
  });

  app.get("/api/students", async (req, res) => {

    const students = await Student.findAll({});

    res.json({
      status: 200,
      data: {
        students
      }
    })
  });

  app.post("/api/students", async (req, res) => {
    const { name } = req.body;

    const student = await Student.create({
      name
    });

    await student.save();
    res.json({
      status: 200,
      data: {
        student
      }
    })
  });

  app.delete("/api/students/:id", async (req, res) => {
    const { id } = req.params;

    const student = await Student.destroy({
      where: {
        id
      }
    });

    res.json({
      status: 200,
      data: {
        student
      }
    })
  });

  // set port, listen for requests
  const PORT = API_PORT || 3001;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}

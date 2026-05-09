require("dotenv").config();

const express = require("express");
const cors = require("cors");

const AppDataSource = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

const userRoutes = require("./routes/userRoutes");

app.use("/", userRoutes);

AppDataSource.initialize()
.then(() => {

    console.log("Database Connected");

    app.listen(process.env.PORT, () => {
        console.log(`Server Running On Port ${process.env.PORT}`);
    });

})
.catch((err) => {
    console.log(err);
});
const express       =       require("express");
const bodyParser    =       require("body-parser");
const cors          =       require("cors");
const mongoose      =       require("mongoose");
const path          =       require("path");
const bcryptjs      =       require("bcryptjs");
const config        =       require("./config/database");

const users         =       require("./routes/users");

const app   = express();

const port  = 3000;

//Connessione al database
mongoose.connect(config.database);

mongoose.connection.on("connect", () =>{
    console.log("Connessione Effettuata");
})

mongoose.connection.on("error", (err) =>{
    console.log("Errore di connessione:" + err);
})

//Middleware CORS
app.use(cors());

//Middleware BodyParser
app.use(bodyParser.json());

//Routes Users
app.use(users);

//utilizzo di un elemento statico
app.use(express.static(path.join(__dirname + "/public")));

app.get("/", (req, res) => {
    res.send("Ciao mondo!");
});

app.listen(port, ()=>{
    console.log("Server connesso");
})
const express = require('express');
const bodyParser=require("body-parser");
const cors = require('cors');
const palworldRouter = require('./v1/routes/palworldRoutes')

const app = express();

app.use(cors());
const PORT = process.env.PORT || 3000 

app.use(bodyParser.json());
app.use('/api/v1/pals',palworldRouter);
app.listen(PORT, () => console.log(`BACKEND FUNCIONANDO EN EL PUERTO ${PORT}!`));